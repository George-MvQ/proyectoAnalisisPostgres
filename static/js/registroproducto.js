import {Mantenimiento, AlertasBotones,crearBotonEliminar } from "./Crud.js";

import { evaluacionCamposRequeridos, quitarBordesAdvertenciaForm } from "./libreria/funcionalidades.js";

const mantenimiento = new Mantenimiento()
const alertas = new AlertasBotones()

const opcionesTabla = {
    "dom":'   <"contenedor_tabla"  <"opciones_tabla" <"#meter.container botonFormulario" B> <"filter" f> <"length" l> ><t><"bottom"p> >',
    // Renderizar el lengthMenu personalizado
    buttons: [
        {
            text: 'Agregar',
            className:'btn btn-primary ',
            init: function (api,node,conf){
                // Agregar los atributos data-bs-toggle y data-bs-target
                $(node).attr('data-bs-toggle', 'modal');
                $(node).attr('data-bs-target', '#staticBackdrop');
                  // Agregar un ID al botón
                 $(node).attr('id', 'btnAgregarDatos');
            }
        }
    ],
    
    scrollCollapse:true,
    scrollY: '400px',
    pageLength: 7, //nombre por defecto (cantidad de filas en cada tabla)
    destroy: true, //indicando que sea una tabla destruible
    lengthMenu: [3, 5, 7, 10, 15], //para el menuto de contenido de la tabla 
    columnDefs: [{
        className: 'text-white text-center',
        targets: [0, 1, 2, 3, 4,5]//columnas inicia del 0 a n de las que se aplican los cabios
    }, {
        orderable: false, //definimos que columnas no queremos que se ordenen  
        targets: [3, 4]
    }, {//buscando en columnas en espesifico
        searchable: false,
        targets: [3, 4]
    },// {width: '50%',targets:[0]} para el ancho entre columnas 

    ],
    language: {
        "sFilter": "<span class='mi-clase-filtro'>Filtro:</span>", // Nombre de clase personalizado para el filtro
        "sLengthMenu": "<span class='mi-clase-longitud'>Mostrar _MENU_ registros por página</span>" // Nombre de clase personalizado para la longitud
   
        ,"decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Entradas",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        }
    }
}

window.addEventListener('load',()=>{
    agregarFuncionBtnEliminar()
    $('#datoscompra').DataTable(opcionesTabla)
    quitarBordesAdvertenciaForm(form_agregar_compra)
})

const agregarFuncionBtnEliminar = () => {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar-compra');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', function () {
            const identificador = this.getAttribute('data-id');
            alertas.eliminar(identificador,eliminarCompra)
            console.log(identificador);
        });
    });
};

//! funcion eliminar tipo collback
const eliminarCompra= async(id)=>{
    const respuesta = await mantenimiento.eliminarDato('/admon/compras/',id)
    if (respuesta.condicion === 'ok'){
        mantenimiento.eliminarFilaTabla(id,'datoscompra')
    }
    return respuesta
}

btGuardarCompra.addEventListener('click', async (e) => {
    e.preventDefault()
    const validacionOk = evaluacionCamposRequeridos(form_agregar_compra)
    if (validacionOk) {
        
        let formAgregar = new FormData(form_agregar_compra);
        const jSonObjetos = mantenimiento.formulariosAObjeto(formAgregar)
        convertirStrNumeric(jSonObjetos)
        console.log(jSonObjetos);
        const respuesta = await mantenimiento.agregarNuevoRegistro('/admon/compras/', jSonObjetos)
        console.log('---------')
        console.log(respuesta)
        console.log(respuesta.condicion)
        console.log('---------')
        if (respuesta.condicion === 'ok') {
            // mantenimiento.limpiarInputs('input_form') 
            const fila = filaTabla(respuesta.datos)
            console.log(fila);
            $('#datoscompra').DataTable().row.add($(fila)).draw(false);
            agregarFuncionBtnEliminar()
            alertas.exelente(respuesta.mensaje)
        }
        else {
            alertas.error(respuesta.mensaje)
        }
    }

 }); 


 const convertirStrNumeric= (jSonObjetos)=>{
    jSonObjetos.fk_proveedor=parseInt(jSonObjetos.fk_proveedor)
    jSonObjetos.fk_empleado=parseInt(jSonObjetos.fk_empleado)
    jSonObjetos.fk_metodo_pago= parseInt(jSonObjetos.fk_metodo_pago)
    // jSonObjetos.estado=jSonObjetos.estado=='on'?true:false 
 }

 const filaTabla = (elementos) => {
    const estado = elementos.estado ? 'Activo' : 'Inactivo';   
    let datos = `
    <tr data-id="${elementos.id_compra}">
        <td>${elementos.id_compra}</td>
        <td  >${elementos.fecha_compra}</td>
        <td>${elementos.fk_proveedor}</td>
        <td>${elementos.fk_empleado}</td>
        <td>${elementos.fk_metodo_pago}</td>
        <td>
            ${crearBotonEliminar(elementos.id_compra,'btn-eliminar-compra')}
            <a class="btn btn-outline-info" href="/admon/detalle-compras/${elementos.id_compra}">Detalles</a>
            <a class="btn btn-outline-warning" href="/admon/detalle-compras/${elementos.id_compra}" >Agregar</a>
        </td> 
    </tr>
    `
    return datos
}
