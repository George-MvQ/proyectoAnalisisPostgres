import { Mantenimiento, AlertasBotones, crearBotonEliminar } from "../Crud.js";
const mantenimiento = new Mantenimiento()
const alertas = new AlertasBotones()
const estado = false
let totalCompra = 0;
let codigoDetalle = 1;
const coleccionDatos = {
    detalles: [],
    venta: {},

}



const opcionesTabla = {
    scrollCollapse: true,
    scrollY: '400px',
    pageLength: 7, //nombre por defecto (cantidad de filas en cada tabla)
    destroy: true, //indicando que sea una tabla destruible
    lengthMenu: [3, 5, 7, 10, 15], //para el menuto de contenido de la tabla
    columnDefs: [{
        className: 'text-white text-center ',
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
        "sLengthMenu": "<span class='mi-clase-longitud'>Mostrar _MENU_ registros por página</span>", // Nombre de clase personalizado para la longitud

        "decimal": "",
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
    obtenerFechaActual('fechaVenta');
    $('#registroVentas').DataTable(opcionesTabla)
})


id_fk_id_producto1.addEventListener('change', async () => {
    const id = id_fk_id_producto1.value;
    const datos = await mantenimiento.obtenerDatosUrl(`/usuario-ventas/obtener-datos-inventario/${id}/`)
    try {
        total_stock.value = datos.total_stock;
        precio_unitario.value = datos.precio_venta
    }
    catch (e) {
        total_stock.value = 0;
        precio_unitario.value = 0
    }


})


//! --------------------- fecha -----------------------------      
function obtenerFechaActual(inputId) {
    let fechaInput = document.getElementById(inputId);

    if (fechaInput) {
        let fechaActual = new Date();
        let dia = fechaActual.getDate().toString().padStart(2, '0');
        let mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        let año = fechaActual.getFullYear();
        let fechaFormateada = `${año}-${mes}-${dia}`;

        fechaInput.value = fechaFormateada;
    } else {
        console.error('El elemento con el ID especificado no se encontró.');
    }
}



// ---------------------  PARA QUE NO SE CIERRE LA VENTANA -----------------------

/* window.addEventListener('beforeunload', function (e) {

    
    // Mensaje que se mostrará al intentar cerrar la página
    let confirmationMessage = '¿Seguro que quieres salir de la página?';
  
    // Establece el mensaje a mostrar
    e.returnValue = confirmationMessage;
 
    // La mayoría de los navegadores modernos ignorarán el mensaje personalizado
    // y mostrarán un mensaje predeterminado por razones de seguridad.
    
    return confirmationMessage;    

}); */

//boton agregar venta
agregarVenta.addEventListener('click', (e) => {
    if (verificarCamposLlenos()) {
        let formAgregar = new FormData(formulario_venta);
        const datosForm = mantenimiento.formulariosAObjeto(formAgregar)
        datosForm.id = codigoDetalle
        coleccionDatos.detalles.push(datosForm)
        agregarDatosTabla(datosForm)
        totalCompra += datosForm.precio_unitario * datosForm.cantidad_producto - datosForm.descuento
        console.log(totalCompra);
        console.log(datosForm.precio_unitario);
        console.log(datosForm.cantidad_producto );
        console.log(datosForm.descuento);
        sp_total_monto_venta.value = totalCompra
        actualizarInputVuelto(parseFloat(sp_efectivo.value))
        codigoDetalle++
        console.log(coleccionDatos);
        limpiarInputs()
    }
})


function verificarCamposLlenos() {
    document.getElementById('descuento').value == "" ?
        document.getElementById('descuento').value = 0 :
        document.getElementById('descuento').value


    let campos = [
        document.getElementById('cantidad_producto').value,
        document.getElementById('precio_unitario').value,
        document.getElementById('descuento').value
    ]

    for (let campo of campos) {
        if (campo === '' || campo == undefined) {
            return false;
        }
    }
    return true;
}



//agregar datos a la tabla
const filaTabla = (elementos) => {
    let nombreProducto = id_fk_id_producto1.options[id_fk_id_producto1.selectedIndex].text;
    let datos = `
    <tr data-id = "${elementos.id}">
        <td >${elementos.id}</td>
        <td>${nombreProducto}</td>
        <td>${elementos.cantidad_producto}</td>
        <td>Q ${elementos.precio_unitario}</td>
        <td>Q ${elementos.descuento}</td>
        <td>Q ${elementos.precio_unitario * elementos.cantidad_producto - elementos.descuento}</td>
        <td>
            ${crearBotonEliminar(elementos.id, 'btn-eliminar-compra')}
        </td>
    </tr>
    `
    return datos
}

const agregarDatosTabla = (datos) => {
    const fila = filaTabla(datos)
    $('#registroVentas').DataTable().row.add($(fila)).draw(false);
    agregarFuncionBtnEliminar()
}


//funcion eliminar 



//


//agregar la funcionalidad al boton creado dinamica mente
const agregarFuncionBtnEliminar = () => {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar-compra');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', function () {
            const identificador = this.getAttribute('data-id');
            //print(form_agregar_marca)
            alertas.eliminar(identificador, eliminarCompra)
            console.log(identificador);


        });
    });
};

//esta es la funcion espesifica que realiza la eliminacion 
const eliminarCompra = async (id) => {
    try {
        //con esto obnetenemos el indice del item del array donde consida con el id 
        const indice = coleccionDatos.detalles.findIndex((detalle) => detalle.id == id);
        actualizarInformacion(indice)
        mantenimiento.eliminarFilaTabla(id, 'registroVentas')
        console.log("----------datos eliminacion--------");
        console.log(coleccionDatos.detalles);
        return {
            condicion: 'ok',
            mensaje: 'Compra eliminado correctamente'
        }
    }
    catch {
        return {
            condicion: 'error',
            mensaje: 'Compra no eliminado'
        }
    }
}

const actualizarInputVuelto = (efectivo) => {
    if (efectivo) {
        sp_total_monto_pago.value = efectivo - totalCompra
    }
    else {
        sp_total_monto_pago.value = ""
    }

}

const actualizarInformacion = (indice) => {
    const registro = coleccionDatos.detalles[indice]
    totalCompra -= registro.precio_unitario * registro.cantidad_producto - registro.descuento
    sp_total_monto_venta.value = totalCompra
    actualizarInputVuelto(parseFloat(sp_efectivo.value))
    coleccionDatos.detalles.splice(indice, 1)

}

sp_efectivo.addEventListener("input", (evento) => {
    const cantidad = parseFloat(evento.target.value)
    actualizarInputVuelto(cantidad)
})


guardarVentas.addEventListener('click', async () => {
    const respuesta = await apiGuardarDatos()
    console.log(coleccionDatos)
    if (respuesta.condicion === 'ok') {
        alertas.exelente(`${respuesta.mensaje}`);
    }
})

function limpiarInputs2() {
    id_fk_producto1.value = "";
    cantidad_producto.value = "";
    descuento.value = "";
}

const apiGuardarDatos = async () => {
    coleccionDatos.venta = {
        fecha_venta: fechaVenta.value,
        fk_empleado1: parseInt(empleado.getAttribute('data-id')),
        total: totalCompra
    }
    if (coleccionDatos.detalles.length > 0) {
        const respuesta = await mantenimiento.agregarNuevoRegistro('/usuario-ventas/registrar-venta/', coleccionDatos)
        return respuesta
    }
    return {
        condicion: "error"
    }
}

const limpiarInputs = () => {
    id_fk_id_producto1.value = "";
    total_stock.value = "";
    cantidad_producto.value = "";
    precio_unitario.value = "";
    descuento.value = 0;
    sp_efectivo.value = "";
    sp_total_monto_pago.value = "";
    sp_total_monto_venta.value = "";
}


document.getElementById('limpiarinputs').addEventListener('click', (e) => {
    limpiarInputs();
    coleccionDatos.detalles= []
    coleccionDatos.venta={}
    totalCompra = 0;
    console.log('Esta funcionando');
    // $('#registroVentas').DataTable().clear().draw();

    const table = $('#registroVentas').DataTable();
    if (table.data().any()) {
    table.clear().draw();
    } else {
    console.log('La tabla no tiene datos para limpiar.');
    }
})

/* LIMPIAR INPUTS */

/* guardarVentas.addEventListener('click', async () => {
    coleccionDatos.venta = {
        fecha_venta: fechaVenta.value,
        fk_empleado1: parseInt(empleado.getAttribute('data-id'))
    }
    console.log(coleccionDatos)
    if (coleccionDatos.detalles.length > 0) {
        respuesta = await mantenimiento.agregarNuevoRegistro('/usuario-ventas/registrar-venta/', coleccionDatos)
        if (respuesta.condicion === 'OK') {
            alert('Dato guardado con éxito');

            // Limpiar los campos de entrada
            fechaVenta.value = '';  
            empleado.value = '';    

            // Otros campos de entrada
            id_fk_id_producto1.value = '';
            total_stock.value = '';
            precio_unitario.value = '';
            // Limpia los otros campos de entrada que quieras

            // También puedes borrar los detalles de la tabla si es necesario
            limpiarTabla();

        }
        return
    }
    console.log('No tiene datos')
}) */



//botn para imprimier 
btn_imprimir.addEventListener("click", async () => {
    const respuesta = await apiGuardarDatos()
    if (respuesta.condicion === 'ok') {
        console.log("Este el boton imprimir");
        // let urlReporte = btn_imprimir.getAttribute("href");
        console.log(respuesta.id_venta);
        const url = `/usuario-ventas/recibo-venta/${respuesta.id_venta}/`
        console.log(url);
        // Abre una ventana emergente con la URL del reporte
        const popup = window.open(url, "_blank", "width=1000,height=600");
        let ventanaPrevia = window.open(url, "_blank");
        if (!popup) {
            alert("El navegador bloqueó la pestaña flotante.");
        }



        // Espera a que la ventana previa se cargue antes de imprimir o guardar como PDF
        ventanaPrevia.onload = function () {
            
        };

    }

})


