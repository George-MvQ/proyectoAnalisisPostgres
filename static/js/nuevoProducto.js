
import {evaluacionCamposRequeridos,quitarBordesAdvertenciaForm} from "../js/libreria/funcionalidades.js"; 
import {Mantenimiento, AlertasBotones,crearBotonEliminar } from "./Crud.js";

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
    
    scrollCollapsey:true,
    scrollY: '400px',
    pageLength: 7, //nombre por defecto (cantidad de filas en cada tabla)
    destroy: true, //indicando que sea una tabla destruible
    lengthMenu: [3,7, 5, 10, 15], //para el menuto de contenido de la tabla 
    columnDefs: [{
        className: 'text-white text-center abc',
        targets: [0, 1, 2, 3, 4]//columnas inicia del 0 a n de las que se aplican los cabios
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

window.addEventListener('load', () => {
    agregarFuncionBtnEliminar()
    $('#datosproductos').DataTable(opcionesTabla)
    quitarBordesAdvertenciaForm(form_agregar_marca) 
    
});

btGuardarDato.addEventListener('click', async (e) => {
    e.preventDefault()
    const validacionOk = evaluacionCamposRequeridos(form_agregar_marca) 

    if (validacionOk){ 
        let formAgregar = new FormData(form_agregar_marca);
        const jSonObjetos = mantenimiento.formulariosAObjeto(formAgregar)
        convertirStrNumeric(jSonObjetos)
        console.log(jSonObjetos);
        const respuesta = await mantenimiento.agregarNuevoRegistro('/admon/ingreso-productos/', jSonObjetos)
        console.log('---------')
        console.log(respuesta)
        console.log(respuesta.condicion)
        console.log('---------')
        if (respuesta.condicion === 'ok') {
            // mantenimiento.limpiarInputs('input_form') 
            const fila = filaTabla(respuesta.datos)
            console.log(fila);
            $('#datosproductos').DataTable().row.add($(fila)).draw(false);
            agregarFuncionBtnEliminar()
            alertas.exelente(respuesta.mensaje)
        }
        else {
            alertas.error(respuesta.mensaje)
        }
    } 

 }); 


const agregarFuncionBtnEliminar = () => {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar-producto');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', function () {
            const identificador = this.getAttribute('data-id');
            alertas.eliminar(identificador,eliminarProducto)
            console.log(identificador);
        });
    });
};

//! funcion eliminar tipo collback
const eliminarProducto= async(id)=>{
    const respuesta = await mantenimiento.eliminarDato('/admon/ingreso-productos/',id)
    if (respuesta.condicion === 'ok'){
        mantenimiento.eliminarFilaTabla(id,'datosproductos')
    }
    return respuesta
}




 const convertirStrNumeric= (jSonObjetos)=>{
    jSonObjetos.fk_categoria=parseInt(jSonObjetos.fk_categoria)
    jSonObjetos.fk_marca=parseInt(jSonObjetos.fk_marca)
    jSonObjetos.fk_presentacion= parseInt(jSonObjetos.fk_presentacion)
    jSonObjetos.fk_unidad_medida=parseInt(jSonObjetos.fk_unidad_medida)
     jSonObjetos.tamanio = parseFloat(jSonObjetos.tamanio)
   jSonObjetos.estado=jSonObjetos.estado=='on'?true:false 
 }



const filaTabla = (elementos) => {
    const estado = elementos.estado ? 'Activo' : 'Inactivo';   
    let datos = `
    <tr data-id="${elementos.id_productos}">
        <td>${elementos.id_productos}</td>
        <td  >${elementos.nombre_producto}</td>
        <td>${elementos.descripcion}</td>
        <td>${elementos.fk_categoria}</td>
        <td>${estado}</td>
        <td>
            ${crearBotonEliminar(elementos.id_productos,'btn-eliminar-producto')}
            <a class="btn btn-outline-info" href="/admon/detalles-usuario/${elementos.id_productos}/">Detalles</a>
        </td> 
    </tr>
    `
    return datos
}

 