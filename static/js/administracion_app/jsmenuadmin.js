import { Mantenimiento, AlertasBotones, crearBotonEliminar } from "../Crud.js";
import {evaluacionCamposRequeridos,quitarBordesAdvertenciaForm} from "../libreria/funcionalidades.js";

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
                 $(node).attr('id', 'btnAgregdarMarca');
            }
        }
    ],
    scrollCollapse:true,
    scrollY: '400px',
    pageLength: 5, //nombre por defecto (cantidad de filas en cada tabla)
    destroy: true, //indicando que sea una tabla destruible
    lengthMenu: [3, 5, 10, 15], //para el menuto de contenido de la tabla 
    columnDefs: [{
        className: 'text-white text-center',
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
    agregarFuncionBtnEliminar();
    $('#tbDatosUsuarios').DataTable(opcionesTabla);
    quitarBordesAdvertenciaForm(form_empleado)
});

//funcion que agregar accion al boton eliminar 
const agregarFuncionBtnEliminar = () => {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar-usuario');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', function () {
            const identificador = this.getAttribute('data-id');
            alertas.eliminar(identificador,eliminarUsuario)
            console.log(identificador);
        });
    });
};

//funcion eliminar 
const eliminarUsuario= async(id)=>{
        const respuesta = await mantenimiento.eliminarDato('/admon/gestion-usuarios/',id)
        if (respuesta.condicion === 'ok'){
            mantenimiento.eliminarFilaTabla(id,'tbDatosUsuarios')
        }
        return respuesta
}

/*  AGREGAR DATOS  */
btGuardarDato.addEventListener('click', async (e) => {
    e.preventDefault()

    const validacionOk = evaluacionCamposRequeridos(form_usuario)
    if (validacionOk) {
        let formAgregar = new FormData(form_usuario);
        const jSonObjetos = mantenimiento.formulariosAObjeto(formAgregar)
        validarBol(jSonObjetos)
        const respuesta = await mantenimiento.agregarNuevoRegistro('/admon/gestion-usuarios/', jSonObjetos)
        /* console.log('---------')
        console.log(respuesta)
        console.log(respuesta.condicion)
        console.log('---------') */
        if (respuesta.condicion === 'ok') {
            mantenimiento.limpiarInputs('input_form')
            const fila = filaTabla(respuesta.datos)
            $('#tbDatosUsuarios').DataTable().row.add($(fila)).draw(false);
            agregarFuncionBtnEliminar()
            Swal.fire(
                respuesta.mensaje,
                'Preciona clic en el boton!',
                'success'
            )
        }
        else {
            Swal.fire(
                respuesta.mensaje,
                'Datos no guardados, Preciona clic en el boton!',
                'warning'
            )
   
        }
    } 
});

const validarBol = (datos) => {
    datos.is_superuser =  datos.is_superuser =='TRUE'?true:false 
    datos.is_active =  datos.is_active =='TRUE'?true:false 
}

const filaTabla = (elementos) => {
    const estado = elementos.estado ? 'Sí' : 'No';   
    let datos = `
    <tr data-id="${elementos.id}">
        <td>${elementos.id}</td>
        <td  >${elementos.username}</td>
        <td>${elementos.email}</td>
        <td>${estado}</td>
        <td>
            ${crearBotonEliminar(elementos.id,'btn-eliminar-usuario')}
            <a class="btn btn-outline-info" href="/admon/detalles-usuario/${elementos.id}/">Detalles</a>
        </td> 
    </tr>
    `
    return datos
}

/* //eliminar datos de tabla 
const crearBotonEliminar = (identicador,clase) => {
    return `<button class="${clase} btn btn-outline-danger"  data-id="${identicador}">Eliminar</button>`;
};
 */