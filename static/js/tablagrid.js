import Mantenimiento from "./Crud.js";
const mantenimiento = new Mantenimiento()



// new gridjs.Grid({
//     search: true,
//     columns: ["Name", "Email", "Phone Number"],
//     data: [
//       ["John", "john@example.com", "(353) 01 222 3333"],
//       ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
//       ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
//       ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
//       ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
//     ]
//   }).render(document.getElementById("tablaPrueba"));


// window.addEventListener('load', async () => {
    
//   let datos = await mantenimiento.obtenerDatos('/obtener_marcas/')
//     console.log("----------------------");
//     console.log(datos.respuesta.marcas);
//   new gridjs.Grid({
//       search: true,
//       columns: ["id_marcas", "Nombre_marca", "Descripcion", "estado"],
//       data:datos.respuesta.marcas,
//     }).render(document.getElementById("tablaPrueba"));

//     console.log("----------------------");
    
// });

// este si me funciono
// window.addEventListener('load', async () => {

//   let datos = await mantenimiento.obtenerDatos('/obtener_marcas/');

//   datos.respuesta.marcas = datos.respuesta.marcas.map(marc => {
//     marc.estado = marc.estado ? 'Activo' : 'Inactivo';  
//     return marc;
//   });

//   new gridjs.Grid({
//     search: true,
//     columns: [
//       "id_marcas", 
//       "Nombre_marca",
//       "Descripcion", 
//       {
//         name: 'estado',
//         format: val => val ? 'Activo' : 'Inactivo'
//       }
//     ],
//     data: datos.respuesta.marcas  
//   }).render(document.getElementById("tablaPrueba"));

//   console.log("Grid rendered");

// });


// window.addEventListener('load', async () => {

//   let datos = await mantenimiento.obtenerDatos('/obtener_marcas/');

//   datos.respuesta.marcas = datos.respuesta.marcas.map(marc => {
//     marc.estado = marc.estado ? 'Activo' : 'Inactivo';  
//     return marc;
//   });

//   new gridjs.Grid({
//     search: true,
//     pagination: true,
//     columns: [
//       {
//         name: 'ID', // Cambia el nombre de la columna ID
//         value: 'id_marcas', // El accessor debe coincidir con el nombre de tu propiedad en los datos
//       },
     
//       "Nombre_marca",
//       "Descripcion", 
//       {
//         name: 'estado',
//         format: val => val ? 'Activo' : 'Inactivo'
//       },
     
//       {
//         name: 'actions',
//         formatter: (cell, row) => {
//           const deleteButton = document.createElement('button');
//           deleteButton.innerText = 'Eliminar';
//           deleteButton.className = 'btn btn-danger';
//           deleteButton.addEventListener('click', () => {
//             // Aquí puedes agregar la lógica para eliminar la marca.
//             // Supongamos que tienes una función para eliminar llamada eliminarMarca.
//             eliminarMarca(row.cells[0].data); // Pasa el ID de la marca o el dato necesario para eliminarla.
//           });
//           return deleteButton;
//         }
//       }
//     ],
//     data: datos.respuesta.marcas  
//   }).render(document.getElementById("tablaPrueba"));

//   console.log("Grid rendered");
// });


