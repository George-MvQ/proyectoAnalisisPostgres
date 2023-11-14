import { Mantenimiento, AlertasBotones, crearBotonEliminar } from "./Crud.js";
import {evaluacionCamposRequeridos,quitarBordesAdvertenciaForm} from "./libreria/funcionalidades.js";
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
                $(node).attr('id', 'btnAgregarDatos');
            }
        }
    ],

    scrollCollapsey: true,
    scrollY: '400px',
    pageLength: 7, //nombre por defecto (cantidad de filas en cada tabla)
    destroy: true, //indicando que sea una tabla destruible
    lengthMenu: [3, 5, 7, 10, 15], //para el menuto de contenido de la tabla 
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
    agregarFuncionBtnEliminar()
    agregarFuncionBtnActualizar()
    $('#datoscategoria').DataTable(opcionesTabla)
    quitarBordesAdvertenciaForm(form_agregar_categoria)
})

const agregarFuncionBtnEliminar = () => {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar-categoria');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', function () {
            const identificador = this.getAttribute('data-id');
            alertas.eliminar(identificador, eliminarCategoria)
            console.log(identificador);
        });
    });
};


//funcion eliminar 
const eliminarCategoria = async (id) => {
    const respuesta = await mantenimiento.eliminarDato('/admon/categorias/', id)
    if (respuesta.condicion === 'ok') {
        mantenimiento.eliminarFilaTabla(id, 'datoscategoria')
    }
    return respuesta
}


/*  AGREGAR DATOS  */
btGuardarCategoria.addEventListener('click', async (e) => {
    e.preventDefault()
    const validacionOk = evaluacionCamposRequeridos(form_agregar_categoria)
    if (validacionOk) {
        let formAgregar = new FormData(form_agregar_categoria);//pasamos como parametro el id del formulario que queremos 

        const jSonObjetos = mantenimiento.formulariosAObjeto(formAgregar)
        console.log(jSonObjetos);
        const respuesta = await mantenimiento.agregarNuevoRegistro('/admon/categorias/', jSonObjetos)
        console.log('---------')
        console.log(respuesta)
        console.log(respuesta.condicion)
        console.log('---------')
        if (respuesta.condicion === 'ok') {
            // mantenimiento.limpiarInputs('input_form')

            const fila = filaTabla(respuesta.datos)
            console.log(fila)
            $('#datoscategoria').DataTable().row.add($(fila)).draw(false);
            agregarFuncionBtnEliminar()

            alertas.exelente(respuesta.mensaje)
        }
        else {
            alertas.error(respuesta.mensaje)
        }
    }
});

const filaTabla = (elementos) => {
    const estado = elementos.estado ? 'Activo' : 'Inactivo';
    let datos = `
    <tr data-id="${elementos.id_categoria}">
        <td>${elementos.id_categoria}</td>
        <td>${elementos.nombre_categoria}</td>
        <td>${elementos.descripcion}</td>
        <td>${estado}</td>
        <td>
            ${crearBotonEliminar(elementos.id_categoria, 'btn-eliminar-categoria')}
            <a class="btn btn-outline-info" href="/admon/detalles-usuario/${elementos.id}/">Actualizar</a>
        </td> 
    </tr>
    `
    return datos
}

// -----------------FUNCIONES PARA ACTUALIZAR

//funcion que agregar el funcionamiento al boton actualizar 
const agregarFuncionBtnActualizar = () => {
    const btn_form_actualizar = document.querySelectorAll('.btn-formActualizar');
    btn_form_actualizar.forEach((boton) => {
        boton.addEventListener('click', function () {
            const identificador = this.getAttribute('data-id');
            agregarDatosForm(identificador)
            console.log(identificador);
        });
    });
};

//esta funcion se encarga de obtener y agregar los datos de la fila al formulario 
const agregarDatosForm = (id) => {
    const filas = obtenerFila(id)
    frm_nom_categoria.value =  filas[1].textContent
    frm_desc.value = filas[2].textContent
    frm_estado.value = filas[3].textContent
    btn_actualizar.setAttribute('data-id', parseInt(id))
}

//esta funcion s encarga de obtener una fila en espesifico 
const obtenerFila = (id) => {
    console.log(id);
    const table = document.getElementById("datoscategoria");
    // Encuentra la fila por su data-id
    const fila = table.querySelector(`tr[data-id="${id}"]`);
    if (fila) {
        const celdas = fila.cells;
        return celdas
    } else {
        console.log("No se encontró una fila con data-id '" + dataId + "'.");
        return null
    }
}

// esta funcion es la que se encarga de actualizar datos 
btn_actualizar.addEventListener('click',async ()=>{
    const datos = obetenerDatosForm()
    alertas.actualizar(datos,actualizarRegistro)
});

const actualizarRegistro = async(datos)=>{
    const respuesta = await mantenimiento.actualizarRegistroCompleto('/admon/categorias/', datos)
    if (respuesta.condicion === 'ok'){
        console.log('----respuesat del servidor----');
        console.log(respuesta.datos);
        actualizarFila(respuesta.datos);
    }
    return respuesta
}

//esta funcion obtiene todo los datos de la fila a actualizar 
const obetenerDatosForm = ()=>{
    const id = btn_actualizar.getAttribute('data-id')
    let formActualizar = new FormData(form_actualizar);
    const jSonObjetos = mantenimiento.formulariosAObjeto(formActualizar)
    jSonObjetos.estado = jSonObjetos.estado ==='Activo'
    jSonObjetos.identificador = parseInt(id)
    return jSonObjetos
}

//este apartado actualiza las filas con los nuevos datos 
const actualizarFila = (nuevosDatos) => {
    const fila = obtenerFila(nuevosDatos.id_categoria);
    fila[1].textContent = nuevosDatos.nombre_categoria;
    fila[2].textContent = nuevosDatos.descripcion;
    fila[3].textContent = nuevosDatos.estado;
}

