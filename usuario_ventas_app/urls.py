from django.urls import path
from . import views

#/usuario-vetas/....
urlpatterns = [
    #path('',views.admon, name='panel_principal'),
   

     path('registrar-venta/',views.registrarventa, name='registrar_venta'),
     path('productos-agotados/',views.productosagotados, name='productos_agotados'),
     path('comprobante/',views.comprobante, name='comprobante'),
     path('obtener-datos-inventario/<int:id>/',views.api_ventas, name='api_inventario'),
     path('historial-ventas/', views.historialventas, name='historial_ventas'),
     path('inventario-minimo/', views.inventario_minimo, name='inventario_minimo'),


    # ---------  ESTA URL SIRVE PARA GENERAR LOS RECIBOS
    path('recibo-venta/<int:id>/',views.reporte_comprobante, name='recibo_venta'),
     
]