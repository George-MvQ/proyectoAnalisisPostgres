from .models import *
import json
import sys
import locale
import pytz
from django.utils import timezone
from .formularios import *

from .mantenimiento import MantenimientoGeneral

def obtener_hora_fecha():
    fecha_actual = timezone.now()
    zona_horaria_local = pytz.timezone('America/Guatemala')
    fecha_actual_local = fecha_actual.astimezone(zona_horaria_local)
    fecha_formateada = fecha_actual_local.strftime(' %d de %B de %Y %H:%M')
    return  fecha_formateada


class ValidacionVenta:
    _manteninimiento = MantenimientoGeneral(Inventario)
    def obtener_venta(self) -> dict: 
        form = Ventasform()
        #datos = self._manteninimiento.obtener_datos()
        return {
            #'datos': datos,
            'form': form
        }
    def agregar_detalle_ventas(self, datos):
        venta = self._guardar_registro_venta(datos['venta'])
        print(venta)
        print("PRIMERA PASADA")
        if venta['ok']:
            print("si pasamos")
            print(datos['detalles'])
            respuesta = self._guardar_registro_detalles(datos['detalles'], venta['venta'])
            print(respuesta)
            return respuesta
        else: 
            return {
                "menesaje": "Error al ingresar los datos",
                "condicion": "error"
            
            }
    
    def _guardar_registro_venta(self,venta)->object:
        """ Guardar regitros de ventas """  
        try:
            print("dentro de la funcion venta")
            print(venta)
            venta['fk_empleado1'] = Empleados.objects.get(fk_usuario=venta['fk_empleado1'])
            print(venta)
            nueva_venta = Ventas(**venta)
            nueva_venta.save()
            return {
                "venta": nueva_venta,
                "ok": True,
            }
        except Exception as e:
            print(f"Error {e}")
            return {
                "ok":False
            }
    
    def _guardar_registro_detalles(self,detalles:dict,venta:object):
        """ Guardar regitros en detalle de ventas """    
        try:
            print("---------ABC-----------")
            print(detalles)
            print("--------------------")
            for detalle in detalles:
                print(detalle['id'])
                del detalle['id']
                detalle['fk_venta'] = venta
                detalle['fk_id_producto1']=Productos.objects.get(id_productos = detalle['fk_id_producto1'])
                nuevo_detalle = DetalleVentas(**detalle)
                nuevo_detalle.save()
            return {
                "mensaje": "Datos guardados con exito",
                "condicion": "ok",
                "id_venta":venta.pk
            }
            
        except Exception as e:
            print(f'Error: {e}')
            return {
                "mensaje": "Datos no guardados",
                "condicion": "error"
            }
    @staticmethod
    def obtener_registro_venta(id):
        detalle = DetalleVentas.objects.filter(fk_venta=id)
        return detalle
    
     
            
    """  def generar_datos_pdf(self,datos):
        venta = self._guardar_datos_ventas(datos['venta'])
        if venta['ok']:
            detalles = self._guardar_registro_detalles(datos['detalles'],venta['venta'])
            return {'venta': venta['venta']}
        else:
            return { 'venta': No
            ne} """
        
        
        
         
    
    
class ValidarDatosVentas:
    _mantenimiento = MantenimientoGeneral(Inventario)
    def obtener_datos_inventario(self,id):
        producto = self._mantenimiento.buscar_registros({'fk_producto2':id})
        return {
            'total_stock': producto.total_stock,
            'precio_venta': float(producto.precio_venta)
        }
    
    
            
""" def nueva_venta(request):
    if request.method=='POST':
        form = Ventasform(request.POST)
        if form.is_valid():
            Venta = form.save() 
            form=Ventasform
            return redirect('nueva_venta')
    else:
        form=Ventasform()
    return render(request,'nueva_venta.html',{'form':form})  
"""


class ValidacionDetalleVenta:
    @staticmethod
    def obtener_datos():
        detalle_venta = DetalleVentas.objects.all()
        for registro in detalle_venta:
            registro.sub_total = registro.cantidad_producto * \
                registro.precio_unitario - registro.descuento
        return {'venta_detalle': detalle_venta}

    @staticmethod
    def datos_reporte_salida():
        return Validacionfecha.datos_reporte_modelo(DetalleVentas)

 
class Validacionesinventario:
    def obetener_datos_inventarioMinimo(self) -> dict:
        form =inventarioForm() 
        datos = Inventario.objects.all()
        return {
            'form': form,
            'datos':datos
        }
        

