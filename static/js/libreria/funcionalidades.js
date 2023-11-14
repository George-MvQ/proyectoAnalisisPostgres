
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

const evaluacionCamposRequeridos=(id_formulario)=>{
    let validacion = true
    const camposRequeridos = id_formulario.querySelectorAll('[required]')
    camposRequeridos.forEach( function (campo) {
        if (!campo.value){
           const tooltip = mostrarTooltip(campo);
           tooltip.show();
           campo.classList.remove('border-primary');
           campo.classList.add('border-danger');
           validacion = false
        }
        else{
            console.log('todo bien')
        }
    });
    return validacion
}

const quitarBordesAdvertenciaForm = (id_formulario)=>{
    const camposRequeridos = id_formulario.querySelectorAll('[required]')
    camposRequeridos.forEach((input) => {
        input.addEventListener('click',() => {
            input.classList.remove('border-danger');
        });
    })
}

//export {Mantenimiento,AlertasBotones,crearBotonEliminar} 
export  {evaluacionCamposRequeridos,quitarBordesAdvertenciaForm}; 