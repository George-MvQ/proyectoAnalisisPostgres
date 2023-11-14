

class Mantenimiento {

    #datosError = {
        mensaje: "Error fatal",
        condicion: 'Error'
    }

    

    constructor() {
        this.patronDecimal = /^\d+(\.\d+)?$/;
        this.patronEntero = /^\d+$/;
    }

    
    async obtenerDatosUrl(url_obtener) {
        try {
            const respuesta = await fetch(url_obtener);
            if (respuesta.ok) { 
                const datos = await respuesta.json()
                return datos
            }
            
        } catch (error) {
            console.error(error)
            return this.#datosError
        }
    }

    async agregarDatos(url_agregar, formulario) {       
        try { 
            console.log('-------------fdfdfdf--------');
            console.log(formulario);
            const respuesta = await fetch(url_agregar, {
                method: 'POST',
                body: formulario,
                headers: { 'X-CSRFToken': this.getCookie('csrftoken') }
            })

            if (respuesta.ok) {
                const datos = await respuesta.json()
                return datos
            }else{
                console.log('error suave');
                return this.#datosError
            }
        } 
        catch (error) {
            return this.#datosError
        }
    };

//usar esto para agreagar datos 
    async agregarNuevoRegistro(url_agregar, datos_objeto) {
        try {
            let crfToken;
            if ('csrfmiddlewaretoken' in datos_objeto){
                crfToken = datos_objeto.csrfmiddlewaretoken
                delete datos_objeto.csrfmiddlewaretoken
            }else crfToken = this.getCookie('csrftoken')

            const respuesta = await fetch(url_agregar, {
                method: 'POST',
                body: JSON.stringify(datos_objeto),
                headers: { 'X-CSRFToken': crfToken }
            })

            if (respuesta.ok) {
                const datos = await respuesta.json()
                return datos
            }
            else{
                console.log('error suave');
                return this.#datosError
            }

        } catch (error) {
            console.error(error);
            console.log('error nada');
            return this.#datosError
        }
    };


    async eliminarDato(url_eliminar, id) {
        const identificador = {identificador:id} 
        try {
            const eliminar = await fetch(url_eliminar, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', //espesifica que se envian datos al servido en formato JSon 
                    'X-CSRFToken': this.getCookie('csrftoken')
                },
                body: JSON.stringify(identificador)
            })
            if(eliminar.ok){
                const respuesta = await eliminar.json();
                return respuesta
            }
            else{
                return this.#datosError
            }
        } catch (error) {
            console.error(error)
            console.log('error duro');
            return this.#datosError
            
        }
    } 

    async actualizarRegistroCompleto(url_actualizar, datos) {
        
      try{
        let crfToken;
        console.log(datos)
        if ('csrfmiddlewaretoken' in datos){
            console.log(datos.csrfmiddlewaretoken);
            crfToken = datos.csrfmiddlewaretoken
            delete datos.csrfmiddlewaretoken
            console.log(datos.csrfmiddlewaretoken);
            }  else crfToken = this.getCookie('csrftoken')
            console.log(datos)
            const actualizar = await fetch(url_actualizar,{
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json', //espesifica que se envian datos al servido en formato JSon
                    'X-CSRFToken': crfToken
                },
                body: JSON.stringify(datos)
            })
            if(actualizar.ok){
                const respuesta = await actualizar.json();
                console.log('--------------------------------');
                console.log(respuesta);
                return respuesta
            }
            else{
                return this.#datosError
            }
        }
        catch(error){
            console.error(error)
            return this.#datosError
        }

    }

    limpiarInputs(claseEtiqueta){
        const inputs_forms = document.getElementsByClassName(claseEtiqueta)
        Array.from(inputs_forms).forEach((entradas) => {
            entradas.value = '';
        })
    }

    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    eliminarFilaTabla = (identificador,idTabla) => {
        // Utiliza el ID de la marca para encontrar la fila correspondiente y eliminarla
        const filaAEliminar = $(`#${idTabla} tr[data-id='${identificador}']`);
        $(`#${idTabla}`).DataTable().row(filaAEliminar).remove().draw(false);
    };

    formulariosAObjeto(formulario) {
        const objeto = {}
        formulario.forEach((value, key) => {
            if (!isNaN(value)){
                if(this.patronEntero.test(value)) objeto[key] = parseInt(value);
                else if(this.patronDecimal.test(value)) objeto[key] = parseFloat(value)
            } else objeto[key] = value
        })
        return objeto;
    }
}



class AlertasBotones {

    eliminar(id,callback,titulo='registro'){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'bg-danger',
              cancelButton: 'bg-success',
              toast: true
            },
            buttonsStyling: true,
           
          })
          
          swalWithBootstrapButtons.fire({
            title: `¿Estás seguro quieres eliminar este ${titulo}?`,
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
                const respuesta = await callback(id)
                if (respuesta.condicion==='ok'){
                    console.log(respuesta.mensaje);
                    swalWithBootstrapButtons.fire(
                        `El  ${titulo} se ha eliminado!`,
                        respuesta.mensaje,
                        'success'
                        )
                }
                else if(respuesta.condicion==='ref_error'){
                    swalWithBootstrapButtons.fire(
                        `El  ${titulo} no se a eliminado!`,
                        respuesta.mensaje,
                        'warning'
                        )
                }
                else{
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        respuesta.mensaje,
                        'error'
                      )
                } 
               
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'Esta accion se ha cancelado, por un error fatal',
                'error'
              )
            }
        })
    }


//--------------------ALERTA DE ACTUALIZACION--------------------------------

    actualizar(datos,callback,titulo='registro'){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'bg-danger',
              cancelButton: 'bg-success',
              toast: true
            },
            buttonsStyling: true,
           
          })
          
          swalWithBootstrapButtons.fire({
            title: `¿Estás seguro quieres Actualizar este ${titulo}?`,
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
                const respuesta = await callback(datos)
                if (respuesta.condicion==='ok'){
                    console.log(respuesta.mensaje);
                    swalWithBootstrapButtons.fire(
                        `El  ${titulo} se a actualizado exitosamente!`,
                        respuesta.mensaje,
                        'success'
                        )
                }
                else if(respuesta.condicion==='ref_error'){
                    swalWithBootstrapButtons.fire(
                        `El  ${titulo} no se ha actualizado!`,
                        respuesta.mensaje,
                        'warning'
                        )
                }
                else{
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        respuesta.mensaje,
                        'error'
                      )
                } 
               
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'Esta accion se ha cancelado, por un error fatal',
                'error'
              )
            }
        })
    }

    todoBien (encavezado,mensaje){
        Swal.fire(
            encavezado,
            mensaje,
            'success'
          )
    }

    exelente(mensaje) {
        Swal.fire(
            mensaje,
            'Preciona clic en el boton!',
            'success'       
        )
    }
    error(mensaje) {
        Swal.fire(
            mensaje,
            'Datos no guardados, Preciona clic en el boton!',
            'warning'
        )
        
    }


}

/* sweet alert de gestion de usuario */


const crearBotonEliminar = (identicador,clase) => {
    return `<button class="${clase} btn btn-outline-danger"  data-id="${identicador}">Eliminar</button>`;
};




/* import tippy from 'tippy.js'; */



//export {Mantenimiento,AlertasBotones,crearBotonEliminar} 



export {Mantenimiento,AlertasBotones,crearBotonEliminar} 