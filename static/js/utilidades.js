class Mantenimiento {
    constructor() {

    }

    async obtenerDatos(url_obtener) {
        const datos = {
            respuesta: '',
            estado:true
        };
        try {
            const respuesta = await fetch(url_obtener)
            datos.respuesta = await respuesta.json()
        } catch (error) {
            console.error(error)
            datos.estado = false
        }
        return datos
    }

    async agregarDatos(url_agregar, formulario) {
        const datos = {
            respuesta: {},
            estado:true
        };
       
        try { 
            console.log('-------------fdfdfdf--------');
            console.log(formulario);
            const respuesta = await fetch(url_agregar, {
                method: 'POST',
                body: formulario,
                headers: { 'X-CSRFToken': this.getCookie('csrftoken') }
            })

            if (respuesta.ok) {
                datos.respuesta = await respuesta.json()
            }

        } catch (error) {
            console.error(error);
            datos.estado =false
        }
        return datos
    };



    
    async eliminarDato(url_eliminar, id) {
        const identificador = {identificador:id} 
        let datos = {
            mensaje: '',
            estado: true,
        }
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
                datos.mensaje =respuesta.mensaje
            }
        } catch (error) {
            console.error(error)
            datos.mensaje="Error fatal";
            datos.estado = false
        }
        return datos
    }

    async actualizarDato() {

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


}

class AlertasBotones {

    eliminar(id,callback){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'bg-danger',
              cancelButton: 'bg-success',
              toast: true
            },
            buttonsStyling: true,
           
          })
          
          swalWithBootstrapButtons.fire({
            title: '¿Estás seguro quieres eliminar este usuario?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
                const respuesta = await callback(id)
                if (respuesta.estado){
                    console.log(respuesta.mensaje);
                    swalWithBootstrapButtons.fire(
                        'El usuario se eliminado!',
                        respuesta.mensaje,
                        'success')
                }
                else{
                    
                }
               
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'Esta accion se ha cancelado',
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


}

/* sweet alert de gestion de usuario */

class AlertasBotonesss {

    eliminar(id,callback){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'bg-danger',
              cancelButton: 'bg-success',
              toast: true
            },
            buttonsStyling: true,
           
          })
          
          swalWithBootstrapButtons.fire({
            title: '¿Estás seguro quieres modificar los datos?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
                const respuesta = await callback(id)
                if (respuesta.estado){
                    console.log(respuesta.mensaje);
                    swalWithBootstrapButtons.fire(
                        'Los datos de este usuario se ha actualizado!',
                        respuesta.mensaje,
                        'success')
                }
                else{
                    
                }
               
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'Esta accion se ha cancelado',
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


}
class Utilidades{
    
}

export {Mantenimiento,AlertasBotones} 