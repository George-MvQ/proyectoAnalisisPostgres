import lenguajeDataTable from './libreria/variables.js'

const opcionesTabla = {

    scrollCollapse:true,
    scrollY: '400px',
    pageLength: 7, //nombre por defecto (cantidad de filas en cada tabla)
    destroy: true, //indicando que sea una tabla destruible
    lengthMenu: [3, 5, 7,10, 15], //para el menuto de contenido de la tabla
    columnDefs: [
        {
            type: 'date',
            targets: [1] // Suponiendo que la columna de fecha está en la posición 5 (ajusta esto según tus datos)
        },
        {
        className: 'text-white text-center ',
        targets: [0, 1, 2, 3, 4,5,6,]//columnas inicia del 0 a n de las que se aplican los cabios
    }, {
        orderable: false, //definimos que columnas no queremos que se ordenen
        targets: [3, 4]
    }, {//buscando en columnas en espesifico
        searchable: false,
        targets: [3, 4]
    },// {width: '50%',targets:[0]} para el ancho entre columnas

    ],
    language: lenguajeDataTable
}

window.addEventListener('load', () => {
    $('#datosVentas').DataTable(opcionesTabla);
});


$(document).ready(function() {

    var tabla = $('#datosVentas').DataTable(opcionesTabla);
  
    $('#fechaFiltro').on('input', function() {
  
      // Obtener valor del input
      const fecha = this.value; 
  
      // Filtrar sólo la columna de fecha
      tabla.column(2)  
         .search(fecha) 
         .draw();
        
         console.log(fecha)   
  
    });
    
  });

const btnLimpiar = document.querySelector('button');
btnLimpiar.addEventListener('click', function() {
    // Borrar contenido del input
    $('#fechaFiltro').val('');

    // Limpiar filtro de tabla en todas las columnas
    $('#datosVentas').DataTable().search('').columns().search('').draw();
});
