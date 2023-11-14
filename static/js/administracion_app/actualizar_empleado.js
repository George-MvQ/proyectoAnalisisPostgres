import { Mantenimiento, AlertasBotones } from "../Crud.js";

const mantenimiento = new Mantenimiento()
const alertas = new AlertasBotones()


btn_actualizar.addEventListener('click', async (e) => {
    e.preventDefault();
    const datos = obtenerDatosForm()
    console.log(datos);
    alertas.actualizar(datos, actualizarRegistro)
});


    const actualizarRegistro = async (datos) => {
        const id = btn_actualizar.getAttribute('data-id')
        const respuesta = await mantenimiento.actualizarRegistroCompleto(`/admon/detalle-empleado/${id}/`, datos)
        if (respuesta.condicion === 'ok') {
            console.log('----respuesat del servidor----');
            console.log(respuesta.datos);
            //actualizarFila(respuesta.datos);
            actualizarDom(respuesta.datos);
        }
        return respuesta
    }

    const obtenerDatosForm = () => {
        let formActualizar = new FormData(form_actualizar);
        const jSonObjetos = mantenimiento.formulariosAObjeto(formActualizar)

        return jSonObjetos
    }


    //! AQUI ME ESTA DANDO ERROR CREO

    //este apartado actualiza las filas con los nuevos datos 
    const actualizarDom = (nuevosDatos) => {
        for (let clave in nuevosDatos) {
            let elemento = document.getElementById(`sp_${clave}`);
            console.log(nuevosDatos[clave]);
            elemento.textContent = nuevosDatos[clave];
            console.log(nuevosDatos[clave]);
        }

    }

