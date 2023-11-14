import {Mantenimiento} from "../Crud.js";


const mantenimiento = new Mantenimiento();


btnGuardarCambios.addEventListener('click', async() => {
    const camposRequeridos = formulario_actualizacion.querySelectorAll('[required]')
    let validacionOk = true;
    camposRequeridos.forEach( function (campo) {
        if (!campo.value){
           const tooltip = mostrarTooltip(campo);
           tooltip.show();
           validacionOk = false;
           campo.classList.remove('border-primary');
           campo.classList.add('border-danger');
           

        }
        else{
            console.log('todo bien')
        }
    });
    if (validacionOk){
        const formulario = new FormData(formulario_actualizacion)
        console.log('Guardar Cambios');
        console.log('---------');
        if (validaciones(formulario)) {
            const url = `/admon/modal-actualizacion/<int:id>/${sp_id.textContent}/`
            const datos = obtenerDatosFormulario(formulario)
            console.log('---------------');
            console.log(datos);
            console.log('---------------');
            const respuesta = await mantenimiento.actualizarRegistroCompleto(url,datos);
            console.log(respuesta);
            if (respuesta.condicion =='ok'){
                console.log('------respuesta del servidor---------');
                console.log(respuesta);
                actualizarVistaInformacion(respuesta.datos);
              Swal.fire(
                    respuesta.mensaje,
                    'Preciona el boton!',
                    'success'
                )
            }
            else {  
              Swal.fire(
                    respuesta.mensaje,
                    'Datos no guardados, Preciona el boton!',
                    'warning'
                )
            }
        }
        else {
            console.log('todo mal');
        }
    }
    //respuesta = await mantenimiento.actualizarRegistroCompleto('',formulario);
})


const validaciones = (formulario) => {
    const contra = formulario.get('password')
    console.log(formulario.get('esSuperUsuario'));
    if (contra == null || contra.trim() == ''){
        formulario.delete('password');
        formulario.delete('confirpassword');
        return true;
    }
    else {
        const confirm_contra = formulario.get('confirpassword')
        if (contra == confirm_contra){
            formulario.delete('confirpassword');
            return true;
        }
        else {
            console.log('contraseña no coincide');
            return false;
        }
    }
}

//
const obtenerDatosFormulario = (formulario) => {
    const jsonDatos = {}
    formulario.forEach((value, key) => {jsonDatos[key] = value})
    if ('is_active' in jsonDatos) {
        jsonDatos.is_active = jsonDatos.is_active === 'on';
        console.log(jsonDatos.is_active);
    }
    else{
        jsonDatos.is_active = false
    }  
    if ('is_superuser' in jsonDatos) {
        jsonDatos.is_superuser = jsonDatos.is_superuser === 'on';
        console.log(jsonDatos.is_superuser);
    }
    else{
        jsonDatos.is_superuser = false
    }
    return jsonDatos
}
 
const actualizarVistaInformacion = (datos) => {
    for (let propiedad in datos){
        if (document.getElementById(`sp_${propiedad}`)){
            document.getElementById(`sp_${propiedad}`).textContent = datos[propiedad]
            
        }
    }
}

function mostrarTooltip(campo) {
    const tooltip = tippy(campo, {
      content: "Este campo es requerido", // Personaliza el mensaje
      placement: 'top-end', // Personaliza la ubicación del tooltip
      interactive: true, // Hace que el tooltip sea interactivo
      trigger: 'manual',
      theme: 'material'
       //agregando un tema preferido
    });
  
    return tooltip; // Devuelve el objeto tooltip
  }

const inputUsername = document.getElementById('username');
inputUsername.addEventListener('click',() => {
    inputUsername.classList.remove('border-danger');
})

const inputEmail = document.getElementById('email');
inputEmail.addEventListener('click',() => {
    inputEmail.classList.remove('border-danger');
})