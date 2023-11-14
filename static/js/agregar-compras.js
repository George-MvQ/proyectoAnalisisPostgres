///otros pora agregar productos
import {Mantenimiento, AlertasBotones,crearBotonEliminar } from "./Crud.js";
const mantenimiento = new Mantenimiento()
const alertas = new AlertasBotones()
let totalPago = 0
let totalDescuento = 0
let totalSinDescuento = 0

const opcionesTabla = {
    "dom":' <"opciones_tabla" <"#meter.container botonFormulario" B><"filter" f > <"length" l > > <t> <p>',
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
    pageLength: 3, //nombre por defecto (cantidad de filas en cada tabla)
    destroy: true, //indicando que sea una tabla destruible
    lengthMenu: [3, 5, 10, 15], //para el menuto de contenido de la tabla
    columnDefs: [{
        className: 'text-white text-center',
        targets: [0, 1, 2, 3, 4,5,6,7,8]//columnas inicia del 0 a n de las que se aplican los cabios
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
    $('#datosdetalle').DataTable(opcionesTabla);
/*     quitarBordesAdvertenciaForm(form_compra_producto) */
});


const agregarFuncionBtnEliminar = () => {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar-producto');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', function () {
            const identificador = this.getAttribute('data-id');
            alertas.eliminar(identificador,eliminarProducto)
        });
    });
};


//! funcion eliminar tipo collback
const eliminarProducto= async(id)=>{
    const respuesta = await mantenimiento.eliminarDato(`/admon/agregar-compras/${id}/`,id)
    console.log(respuesta);
    if (respuesta.ok){
        mantenimiento.eliminarFilaTabla(id,'datosdetalle')
        operacionesQuitar(respuesta.datos)
    }
    return respuesta
}

btGuardarDato.addEventListener('click', async (e) => {
    e.preventDefault()
/*     const validacionOk = evaluacionCamposRequeridos(form_compra_producto) */
/*     if (validacionOk) { */
        const id = btGuardarDato.getAttribute('data-id')
        const fk_producto = id_fk_producto.value
        let formAgregar = new FormData(form_compra_producto);
        const jSonObjetos = mantenimiento.formulariosAObjeto(formAgregar)
        const respuesta = await mantenimiento.agregarNuevoRegistro(`/admon/agregar-compras/${id}/`, jSonObjetos)
        if (respuesta.ok) {
            // mantenimiento.limpiarInputs('input_form')
            const fila = filaTabla(respuesta.datos, fk_producto)
            $('#datosdetalle').DataTable().row.add($(fila)).draw(false);
            operacionesAgregar(respuesta.datos)
            agregarFuncionBtnEliminar()
            agregarFuncionBtnActualizar()
            limpiarInputs()
            alertas.exelente(respuesta.mensaje)
        }
        else {
            alertas.error(respuesta.mensaje)
        }
/*     } */
 });

 function limpiarInputs(){
    id_fk_producto.value= "";
    id_descuentos.value= "";
    id_cantidad_compra.value = "";
    id_precio_unitario_compra.value = "";
    id_precio_sugerido_venta.value = ""; 
    id_cantidad_compra.value = "";
    id_no_lote.value = "";
 }



 //ingreso dato 20
const operacionesAgregar=(datos)=>{
    valorCero(datos)
    totalDescuento += datos.descuentos
    totalSinDescuento += datos.cantidad_compra * datos.precio_unitario_compra
    totalPago = totalSinDescuento - totalDescuento
    actualizarInfoTotal()
}

//esta funcion permite validar cuando un dato esta vacio o nulo para poder operar
const valorCero = (datos) =>{
    if (datos.descuentos == null || undefined) datos.descuentos = 0
    if (datos.cantidad_compra == null || undefined) datos.cantidad_compra = 0
    if ( datos.precio_unitario_compra == null || undefined) datos.precio_unitario_compra = 0
}


//
const operacionesQuitar=(datos)=>{
    totalDescuento -= datos.descuentos
    totalSinDescuento -= datos.cantidad_compra * datos.precio_unitario_compra
    totalPago = totalSinDescuento - totalDescuento
    actualizarInfoTotal()
}



const actualizarInfoTotal=()=>{
    hTotal_sin_descuento.textContent = `Total sin descuento: Q ${totalSinDescuento}`
    hTotal_descuento.textContent = `Total descuento: Q ${totalDescuento}`
    hTotal_pagar.textContent = `Total a pagar: Q ${totalPago}`
}

/* const operacion_actualizacion = (datos)=>{
    if (){

    }
} */


const filaTabla = (elementos,fk_prod) => {
    const estado = elementos.estado ? 'Activo' : 'Inactivo';
    let datos = `
    <tr data-id="${elementos.id_detalle_compra}">
        <td>${elementos.id_detalle_compra}</td>
        <td>${elementos.no_lote}</td>
        <td data-id = "${fk_prod}"> ${elementos.fk_producto}</td>
        <td>Q ${elementos.descuentos}</td>
        <td>${elementos.cantidad_compra}</td>
        <td>Q ${elementos.precio_unitario_compra}</td>
        <td>Q ${elementos.precio_sugerido_venta}</td>
        <td>Q ${elementos.cantidad_compra * elementos.precio_unitario_compra - elementos.descuentos}</td>
        <td>
            ${crearBotonEliminar(elementos.id_detalle_compra,'btn-eliminar-producto')}
            <button class="btn-formActualizar btn btn-outline-info" data-id="${elementos.id_detalle_compra}" data-bs-toggle="modal" data-bs-target="#modal_actualizar">Actualizar</button>
        </td>
    </tr>
    `
    return datos
}


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


// esta funcion es la que se encarga de actualizar datos 
btn_actualizar.addEventListener('click',async ()=>{
    const datos = obetenerDatosForm()
    console.log('------------------ACTUALIZAR ----------------');
    console.log(datos);
    alertas.actualizar(datos,actualizarRegistro)
});

const actualizarRegistro = async(datos)=>{
    const id_prod = form_actualizar.getAttribute('data-id')
    const respuesta = await mantenimiento.actualizarRegistroCompleto(`/admon/agregar-compras/${id_prod}/`, datos)
    if (respuesta.condicion === 'ok'){
        actualizarInformacion(respuesta.datos)
        actualizarFila(respuesta.datos)
        actualizarInfoTotal()
    }
    return respuesta 
}

//esta funcion obtiene todo los datos de la fila a actualizar 
const obetenerDatosForm = ()=>{
    const id = btn_actualizar.getAttribute('data-id')
    let formActualizar = new FormData(form_actualizar);
    const jSonObjetos = mantenimiento.formulariosAObjeto(formActualizar)
    jSonObjetos.identificador = parseInt(id)
    return jSonObjetos
}



//este apartado actualiza las filas con los nuevos datos 
const actualizarFila = (nuevosDatos) => {
    const fila = obtenerFila(nuevosDatos.id_detalle_compra);
    fila[2].setAttribute("data-id",nuevosDatos.fk_producto)
    fila[2].textContent = nuevosDatos.nombre_producto;
    fila[3].textContent = `Q ${nuevosDatos.descuentos }`//
    fila[4].textContent = nuevosDatos.cantidad_compra
    fila[5].textContent = `Q ${ nuevosDatos.precio_unitario_compra}`//
    fila[6].textContent = `Q ${ nuevosDatos.precio_sugerido_venta}`//
    fila[1].textContent = nuevosDatos.no_lote
    fila[7].textContent = `Q ${ nuevosDatos.precio_unitario_compra*nuevosDatos.cantidad_compra-nuevosDatos.descuentos}`
}

const obtenerFila = (id) => {
    const table = document.getElementById("datosdetalle");
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
const agregarDatosForm = (id) => {
    const filas = obtenerFila(id)
    act_producto.value = filas[2].getAttribute("data-id");
    act_descuento.value = filas[3].textContent.substring(1).trim()
    act_cant_compra.value = filas[4].textContent
    act_pr_uni_compra.value = filas[5].textContent.substring(1).trim()
    act_pr_sg_venta.value = filas[6].textContent.substring(1).trim()
    act_n_lote.value = filas[1].textContent
    btn_actualizar.setAttribute('data-id', parseInt(id))
}

const camposPrevios = (id) => {
    const filas = obtenerFila(id);
    return {
        descuento: parseFloat(filas[3].textContent.substring(1).trim()),
        cantidadCompra: parseInt(filas[4].textContent),
        precioUnitario : parseFloat(filas[5].textContent.substring(1).trim()),

    }
} 

const actualizarInformacion = (nuevosDatos)=>{
    const datosPrevios = camposPrevios(nuevosDatos.id_detalle_compra)
    const previoTotalsinDescuentos = datosPrevios.precioUnitario*datosPrevios.cantidadCompra
    const nuevoTotalsinDescuentos = nuevosDatos.precio_unitario_compra*nuevosDatos.cantidad_compra
    if (datosPrevios.descuento!= nuevosDatos.descuentos){
        //si se agrega un mayor descuento (+descuento)
        (nuevosDatos.descuentos>datosPrevios.descuento)?
        totalDescuento += (nuevosDatos.descuentos - datosPrevios.descuento):
        totalDescuento -= (datosPrevios.descuento - nuevosDatos.descuentos)
    }
    ((nuevoTotalsinDescuentos) > (previoTotalsinDescuentos))?
        totalSinDescuento += (nuevoTotalsinDescuentos - previoTotalsinDescuentos):
        totalSinDescuento -= ( previoTotalsinDescuentos - nuevoTotalsinDescuentos)
    
    totalPago = totalSinDescuento - totalDescuento
}