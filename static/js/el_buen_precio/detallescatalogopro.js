
  // Función para cargar los detalles del producto en el modal
  function cargarDetalleProducto(idProducto) {
    // Realiza una solicitud AJAX o carga los datos del producto según tu backend
    // En este ejemplo, usaremos datos de muestra
    var producto = {
      nombre_producto: "Nombre del Producto",
      descripcion: "Descripción del Producto",
      codigo_barras: "Código de Barras",
      tamanio: "Tamaño del Producto",
      imagen: "URL de la Imagen",
      estado: "Activo" // Cambiar a "Inactivo" si es necesario
    };

    // Actualiza el contenido del modal con los datos del producto
    document.getElementById("nombreProducto").textContent = "Nombre: " + producto.nombre_producto;
    document.getElementById("descripcion").textContent = "Descripción: " + producto.descripcion;
    document.getElementById("codigoBarras").textContent = "Código de Barras: " + producto.codigo_barras;
    document.getElementById("tamanio").textContent = "Tamaño: " + producto.tamanio;
    document.getElementById("imagen").innerHTML = "<img src='" + producto.imagen + "' alt='Imagen del Producto' />";
    document.getElementById("estado").textContent = "Estado: " + producto.estado;
  }

  // Evento que se dispara cuando se muestra el modal
  $('#detalleProductoModal').on('show.bs.modal', function (event) {
    // Puedes obtener el ID del producto que se debe cargar desde tu HTML
    // Supongamos que tienes un atributo de datos en el botón que activa el modal
    var button = $(event.relatedTarget);
    var idProducto = button.data('id-producto');
    cargarDetalleProducto(idProducto);
  });


