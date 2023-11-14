#from django.contrib import admin
from django.urls import path 
from . import views


urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('adm/',views.administrador, name='adm'),
    path('login/',views.logeo, name='logeo'),
    path('cerrar-sesion/',views.logeo, name='logeo'),
    path('pruebas/',views.cerrar_secion, name='cerrar'),
    
]
