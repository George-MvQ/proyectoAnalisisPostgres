
import {Mantenimiento, AlertasBotones} from "./Crud.js";

const mantenimiento = new Mantenimiento()
const alertas = new AlertasBotones() 

//esta funcion se encarga de obtener y agregar los datos de la fila al formulario 

// esta funcion es la que se encarga de actualizar datos 
btn_actualizar.addEventListener('click',async (e)=>{
    e.preventDefault();
    const datos = obetenerDatosForm()
    console.log(datos);
    alertas.actualizar(datos,actualizarRegistro)
});

const actualizarRegistro = async(datos)=>{
    const id = btn_actualizar.getAttribute('data-id')
    const respuesta = await mantenimiento.actualizarRegistroCompleto(`/admon/modal-actualizacion/${id}/`, datos)
    if (respuesta.condicion === 'ok'){
        console.log('----respuesat del servidor----');
        console.log(respuesta.datos);
        //actualizarFila(respuesta.datos);
        actualizarDom(respuesta.datos);
    }
    return respuesta
}

//esta funcion obtiene todo los datos de la fila a actualizar 
const obetenerDatosForm = ()=>{
    let formActualizar = new FormData(form_actualizar);
    const jSonObjetos = mantenimiento.formulariosAObjeto(formActualizar)
    jSonObjetos.estado = jSonObjetos.estado ==='on'
    jSonObjetos.codigo_barras = jSonObjetos.codigo_barras.toString();
    return jSonObjetos
}

//este apartado actualiza las filas con los nuevos datos 
const actualizarDom = (nuevosDatos) => {
    for(let clave in nuevosDatos){
        let elemento = document.getElementById(`sp_${clave}`);
        console.log(nuevosDatos[clave]);
        elemento.textContent = nuevosDatos[clave];
        console.log(nuevosDatos[clave]);
    }
    
}

