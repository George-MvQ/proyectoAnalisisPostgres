import lenguajeDataTable from '../libreria/variables.js'
import { Mantenimiento } from '../Crud.js'

const mantenimiento = Mantenimiento()
const opcionesTablaIngreso = {
    "dom":'lt',    
    scrollCollapse:true,
    scrollY: '400px',
    destroy: true, //indicando que sea una tabla destruible 
    columnDefs: [{
        className: 'text-white text-center abc',
        targets: [0, 1, 2]//columnas inicia del 0 a n de las que se aplican los cabios
    }, {
        orderable: false, //definimos que columnas no queremos que se ordenen  
        targets: [1, 2]
    }, {//buscando en columnas en espesifico
        searchable: false,
        targets: [1, 2]
    },// {width: '50%',targets:[0]} para el ancho entre columnas 

    ],
    language: lenguajeDataTable,
}

const opcionesTablaGastos = {
    "dom":'t',    
    scrollCollapse:true,
    scrollY: '400px',
    destroy: true, //indicando que sea una tabla destruible
     //para el menuto de contenido de la tabla 
    columnDefs: [{
        className: 'text-white text-center abc',
        targets: [0, 1, 2]//columnas inicia del 0 a n de las que se aplican los cabios
    }, {
        orderable: false, //definimos que columnas no queremos que se ordenen  
        targets: [1]
    }, {//buscando en columnas en espesifico
        searchable: false,
        targets: [1]
    },// {width: '50%',targets:[0]} para el ancho entre columnas 

    ],
    language: lenguajeDataTable,
}





const opcionesTablaTotal = {
    "dom":'lt',    
    scrollCollapse:true,
    scrollY: '400px',
    pageLength: 7, //nombre por defecto (cantidad de filas en cada tabla)
    destroy: true, //indicando que sea una tabla destruible
    lengthMenu: [3,7, 5, 10, 15], //para el menuto de contenido de la tabla 
    columnDefs: [{
        className: 'text-white text-center abc',
        targets: [ 0,1,2,]//columnas inicia del 0 a n de las que se aplican los cabios
    }, {
        orderable: false, //definimos que columnas no queremos que se ordenen  
        targets: [0, 1, 2]
    } // {width: '50%',targets:[0]} para el ancho entre columnas 

    ],
    language: lenguajeDataTable,
}



window.addEventListener('load',()=>{
    $('#datosIngresos').DataTable(opcionesTablaIngreso)
    $('#datosGastos').DataTable(opcionesTablaGastos)
    $('#datosResumen').DataTable(opcionesTablaTotal)  
})

/* input_mes.addEventListener('change',async()=>{
    const datos = {
        'year': input_year.value,
        'month':input_mes.value,
    }
    if(!datos.year==null){
    const respuesta = mantenimiento
}
}); */