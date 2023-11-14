

        // const menuBtn = document.getElementById('menu-btn');
        // const menu = document.getElementById('menu');

        // menuBtn.addEventListener('click', () => {
        //     menu.classList.toggle('open');
        // });

const dropdownItems = document.querySelectorAll('.dropdown');

dropdownItems.forEach(item => {
    const link = item.querySelector('a');
    const content = item.querySelector('.dropdown-content');
            
        link.addEventListener('click', (e) => {
            e.preventDefault();
            content.classList.toggle('active');
        });
});

console.log('si te esta funcionando');


// document.addEventListener("DOMContentLoaded", function () {
//     // Obtén referencias a los elementos del DOM
//     const mostrarIframe = document.getElementById("mostrarIframe");
//     const miIframe = document.getElementById("MostrarPagina2");

//      // Variable para controlar el estado del iframe
//      let iframeVisible = false; 

//     // Agrega un controlador de eventos para mostrar el iframe al hacer clic
//     mostrarIframe.addEventListener("click", function (event) {
//         event.preventDefault(); // Evita que el enlace recargue la página

//         if (iframeVisible) {
//             miIframe.style.display = "none"; // Oculta el iframe
//         } else {
//             miIframe.style.display = "block"; // Muestra el iframe
//         }
        
//         // Invierte el estado del iframe
//         iframeVisible = !iframeVisible;
//     });
//     miIframe.style.display = "none";
// });

