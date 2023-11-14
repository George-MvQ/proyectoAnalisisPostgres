from django.urls import path
from . import views


urlpatterns = [
     path('',views.admon, name='panel_principal'),
     path('gestion-usuarios/',views.administrar_usuarios,name='gestion_usuarios'),
     path('detalles-usuario/<int:id>/',views.detalles_usuario,name='detalles_usuario'),
     path('panel-reabastecimiento/',views.opciones, name='reabastecimiento'),   
     path('reporte/',views.reporte, name='reportes'),
     path('ingreso-marcas/',views.marcas, name='marcas'),
     path('rep-reabastecimiento/',views.reporteRea, name='reporte_reabastecimiento'),
     path('obtener-marcas/',views.obtenerDatos,name='obtener_marcas'),
     #path('obtener-usuario/',views.obtenerUsuarios, name="obtener_usuario"),
     # prueba dashboard
     path('bernar/',views.dashboard,  name='dashboard'),#
    #  path('modifica-marcas/',views.modificar_marcas,name='modificar_marcas'),
     path('proveedores/',views.proveedores, name='proveedores'),
     path('obtener-proveedores/',views.obtenerDatosProveedor, name='obtener_proveedores'),
     path('inventario-bajo/',views.inventariobajo, name='inventariobajo'),
      path('adminbarra/',views.adminbarra,  name='adminbarra'),#

      # Categorias 
      path('categorias/',views.administrar_categoria, name='categorias'),
      path('obtener_categorias/',views.obtenerDatosCategoria,name='obtener_categorias'),
      
      #Compras
      path('compras/',views.registrocompras, name='compras'),
      path('obtener-compras/',views.obtenerDatosCompras,name='obtener_compras'),
      path('agregar-compras/<int:id>/',views.agregar_compras, name='agregar_compras'),
      
      #detalle compras
      path('detalle-compras/<int:id>',views.detallecompras, name='detalle_compras'),
      path('obtener-detalle-compras/',views.obtenerDatosDetalle,name='obtener_detalle_compras'),
     
      #Listado de Pididos
      path('listado-pedidos/',views.listadopedidos, name='listadopedidos'),
      path('obtener-listado/',views.obtenerDatoslistado,name='obtener_pedidos'),
      
      #Ingreso-producto_
      path('ingreso-productos/',views.nuevo_producto, name='productos_nuevos'),
      path('modal-actualizacion/<int:id>/',views.modalactualizacion, name='modal_actualizacion'),

    

      


      # -----------------MODULO DE MOVIMIENTOS------------------------
        path('inventario-productos/',views.inventario_productos, name='inventario_productos'),
        path('historial-ventas/',views.historialventas, name='historial_ventas_admin'),
        path('historial-entradas/',views.historialentradas, name='historial_entradas'),
        
        path('cardex/',views.cardex, name='historial_cardex'),
        path('analisis-grafica/',views.analisisgrafica, name='analisis_grafica'),

        # -----------BALANCE DE CAJA-------------------
        path('agregar-egreso/',views.agregaregreso, name='ingresar_egreso'),
        path('agregar-ingreso/',views.agregaringreso, name='ingresar_ingreso'),
        path('balance-caja/',views.balancecaja, name='balance_caja'),
        path('informe-analisis/',views.informeanalisis, name='informe_analis'),
        
      

        #----------------VENTAS----------------------------
        path('registrar-venta/',views.registrarventa, name='registrar_venta'),
        

          #---------------------------------- EMPLEADO
        path('ingreso-empleado/',views.nuevo_empleado, name='empleado_nuevo'),
        
        #----------------------------DETALLE EMPLEADO-----------------
        path('detalle-empleado/<int:id>/',views.detalle_empleado, name='detalle_empleado'),


        
        # ------------------------- REPORTES GENERALES  ---------------------------
        path('reporte-marcas/',views.reporte_marcas, name='reporte_marcas'),
        path('reporte-proveedores/',views.reporte_proveedores, name='reporte_proveedores'),
        path('reporte-compras/',views.reporte_compras, name='reporte_compras'),
        path('reporte-nuevo-producto/',views.reporte_nuevo_producto, name='reporte_productos'),
        path('reporte-categoria/',views.reporte_categorias, name='reporte_categoria'),
        path('reporte-entradas-producto/',views.reporte_entradas_compras, name='reporte_entradas_compras'),
        path('reporte-salidas-ventas/',views.reporte_salidas_ventas, name='reporte_salidas_ventas'),
        path('reporte-usuarios/',views.reporte_usuarios, name='reporte_usuarios'),
        path('reporte-empleado/',views.reporte_empleado, name='reporte_empleado'),

              
]


