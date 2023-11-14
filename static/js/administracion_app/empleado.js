//import lenguajeDataTable from './libreria/variables.js'
import {evaluacionCamposRequeridos,quitarBordesAdvertenciaForm} from "../libreria/funcionalidades.js";
import { Mantenimiento, AlertasBotones, crearBotonEliminar} from "../Crud.js";

const mantenimiento = new Mantenimiento()
const alertas = new AlertasBotones()
const opcionesTabla = {
    "dom": '   <"contenedor_tabla"  <"opciones_tabla" <"#meter.container botonFormulario" B> <"filter" f> <"length" l> ><t><"bottom"p> >',
    // Renderizar el lengthMenu personalizado
    buttons: [
        {
            text: 'Agregar',
            className: 'btn btn-primary ',
            init: function (api, node, conf) {
                // Agregar los atributos data-bs-toggle y data-bs-target
                $(node).attr('data-bs-toggle', 'modal');
                $(node).attr('data-bs-target', '#staticBackdrop');
                // Agregar un ID al botón
                $(node).attr('id', 'btnAgregdarMarca');
            }
        }
    ],
    scrollCollapsey: true,
    scrollY: '400px',
    pageLength: 5, //nombre por defecto (cantidad de filas en cada tabla)
    destroy: true, //indicando que sea una tabla destruible
    lengthMenu: [3, 5, 10, 15], //para el menuto de contenido de la tabla 
    columnDefs: [{
        className: 'text-white text-center',
        targets: [0, 1, 2, 3, 4, 5]//columnas inicia del 0 a n de las que se aplican los cabios
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

        , "decimal": "",
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
    $('#tbDatosEmpleados').DataTable(opcionesTabla);
    quitarBordesAdvertenciaForm(form_empleado)
});



btGuardarDato.addEventListener('click', async (e) => {
    e.preventDefault()
    const validacionOk = evaluacionCamposRequeridos(form_empleado)

    if (validacionOk){
        let formAgregar = new FormData(form_empleado);
        const jSonObjetos = mantenimiento.formulariosAObjeto(formAgregar)
        convertirStrNumeric(jSonObjetos)
        console.log(jSonObjetos);
        const respuesta = await mantenimiento.agregarNuevoRegistro('/admon/ingreso-empleado/', jSonObjetos)
        console.log('---------')
        console.log(respuesta)
        console.log(respuesta.condicion)
        console.log('---------')
        if (respuesta.condicion === 'ok') {
            // mantenimiento.limpiarInputs('input_form') 
            const fila = filaTabla(respuesta.datos)
            console.log(fila);
            $('#tbDatosEmpleados').DataTable().row.add($(fila)).draw(false);
            agregarFuncionBtnEliminar()
            alertas.exelente(respuesta.mensaje)
        }
        else {
            alertas.error(respuesta.mensaje)
        }

    }
});

const agregarFuncionBtnEliminar = () => {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar-empleado');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', function () {
            const identificador = this.getAttribute('data-id');
            alertas.eliminar(identificador, eliminarEmpleado)
            console.log(identificador);
        });
    });
};
//! funcion eliminar tipo collback
const eliminarEmpleado = async (id) => {
    const respuesta = await mantenimiento.eliminarDato('/admon/ingreso-empleado/', id)
    if (respuesta.condicion === 'ok') {
        mantenimiento.eliminarFilaTabla(id, 'tbDatosEmpleados')
    }
    return respuesta
}

const convertirStrNumeric = (jSonObjetos) => {
    jSonObjetos.fk_id_puesto = parseInt(jSonObjetos.fk_id_puesto)
    jSonObjetos.fk_usuario = parseInt(jSonObjetos.fk_usuario)

}

const filaTabla = (elementos) => {

    let datos = `
    <tr data-id="${elementos.id_empleado}">
        <td>${elementos.id_empleado}</td>
        <td>${elementos.primer_nombre}</td>
   
        <td>${elementos.primer_apellido}</td>
      
        <td>${elementos.fk_id_puesto}</td>
        <td>${elementos.fk_usuario}</td>
        
        <td>
            ${crearBotonEliminar(elementos.id_empleado, 'btn-eliminar-empleado')}
            <a class="btn btn-outline-info" href="/admon/detalle-empleado/${elementos.id_empleado}/">Detalles</a>
        </td> 
    </tr>
    `
    return datos
}








































