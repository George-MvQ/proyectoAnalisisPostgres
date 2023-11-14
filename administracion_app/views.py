import io
from django.shortcuts import render,redirect
#from administracion_app.models import *
""" from inicio_app.models import AuthUser """
from django.http import JsonResponse
from .formularios.fomularios_base import *
from django.views import View
from .validaciones import *
import json
from django.contrib.auth.decorators import login_required
from .models import AuthUser, Marcas
from django.http import FileResponse
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import letter

from django.http import HttpResponse
from django.template.loader import get_template
import os
from django.conf import settings


from django.shortcuts import render
from reportlab.lib.utils import ImageReader

from django.template.loader import get_template
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

from .models import Marcas, Proveedores
from xhtml2pdf import pisa
from io import BytesIO
from django.template.loader import get_template

from django.urls import reverse


@login_required
def admon(request):
    return render(request, 'adminuser/inicio/inicio_admin.html')

""" En este apartado nosotro estamos administrando los usuarios de nuestro sistema  """

#
def administrar_usuarios(request):
    validaciones = ValidarUsuarios()
    if request.method == 'GET':
        form = UsuarioForm()
        datos:list = validaciones.obtener_datos()
        return render(request, 'adminuser/administrativo/administrativo.html', datos)

    elif request.method == 'POST':
        dato_obtenido = json.loads(request.body)
        respuesta = validaciones.agregar_usuario(dato_obtenido)
        return JsonResponse(respuesta)

    elif request.method == 'DELETE':
        dato_obtenido = json.loads(request.body)
        respuesta = validaciones.eliminar_usuario(dato_obtenido)
        return JsonResponse(respuesta)


def detalles_usuario(request,id):
    validaciones = ValidarUsuarios()
    if request.method == 'GET':
        datos = validaciones.buscar_usuario(id)
        return render(request,'adminuser/administrativo/detalles_usuario.html',datos)
    if request.method == 'PUT':
        datos = json.loads(request.body)
        respuesta = validaciones.actualizar_datos(datos,id)
        return JsonResponse(respuesta)
 

def opciones(request):
    return render(request, 'adminuser/reabastecimiento/reabastecimiento.html')


def inventariobajo(request):
    return render(request, 'adminuser/controlinventario/inventariobajo.html')

def reporte(request):
    return render(request, 'adminuser/reportes/reportes.html')

# vista para mostrar los datops

#-----------------------------MARCAS------------------------------------------------

def marcas(request):
    validaciones = ValidacionesMarcas()

    if request.method == 'GET':
        respuesta = validaciones.obetener_datos_marcas()
        return render(request, 'adminuser/reabastecimiento/Marcas.html', respuesta)
    
    elif request.method == 'POST':
        dato_obtenido = json.loads(request.body)
        respuesta = validaciones.agregar_marcas(dato_obtenido)
        return JsonResponse(respuesta)

    elif request.method == 'DELETE':
        dato_obtenido = json.loads(request.body)
        respuesta = validaciones.eliminar_marca(dato_obtenido)
        return JsonResponse(respuesta)
    
    elif request.method == 'PUT':
        datosJson = json.loads(request.body)
        respuesta = validaciones.actualizar_datos(datosJson)
        return JsonResponse(respuesta)
   

def obtenerDatos(request):
    # creaando la lista de todas las marcas
    marcas = list(Marcas.objects.values())
    if len(marcas) > 0:
        dato = {
            'mensaje': 'Si funciono',
            'marcas': marcas
        }
    else:

        dato = {'mensaje': 'sin datos'}
    return JsonResponse(dato)


def reporteRea(request):
    return render(request, 'adminuser/reportes/reporteRea.html')



# Esto es una prueba de dashboard Bernar

def dashboard(request):
    return render(request, 'adminuser/administrativo/dashbord.html')


def adminbarra(request):
    return render(request, 'adminuser/administrativo/adminBarra.html')




'''------------------------------------ CATEGORIA ------------------------------------------------'''

def administrar_categoria(request):
    validaciones = MantenimientoCategoria()

    if request.method == 'GET':
        respuesta = validaciones.obtener_categorias()
        return render(request, 'adminuser/reabastecimiento/Categorias.html', respuesta)

    elif request.method == 'POST':
        dato_obtenido = json.loads(request.body)
        respuesta = validaciones.agregar_categorias(dato_obtenido)
        return JsonResponse(respuesta)

    elif request.method == 'DELETE':
        dato_obtenido = json.loads(request.body)
        respuesta = validaciones.eliminar_categoria(dato_obtenido)
        return JsonResponse(respuesta)
    
    elif request.method == 'PUT':
        datosJson = json.loads(request.body)
        respuesta = validaciones.actualizar_datos(datosJson)
        return JsonResponse(respuesta)



def obtenerDatosCategoria(request):
    # creaando la lista de todas las marcas
    categorias = list(Categorias.objects.values())
    if len(categorias) > 0:
        dato = {
            'mensaje': 'Si funciono',
            'categoria': categorias
        }
    else:

        dato = {'mensaje': 'sin datos'}
    return JsonResponse(dato)



'''---------------Definiendo las vista de Registro de Productos --------------------'''

def registrocompras(request):
    validaciones = ValidacionesCompra()
    if request.method == 'GET':
        datos = validaciones.obtener_datos_compra()
        return render(request,'adminuser/reabastecimiento/registroproductos.html',datos)
    
    elif request.method == 'DELETE':
        dato_obtenido = json.loads(request.body)
        respuesta = validaciones.eliminar_compra(dato_obtenido)
        return JsonResponse(respuesta)

    elif request.method == 'POST':
        datos = json.loads(request.body)
        respuesta = validaciones.guardar_nueva_compra(datos)
        return JsonResponse(respuesta)


def obtenerDatosCompras(request):
    # creaando la lista de todas las marcas
    compras = list(Compras.objects.values())
    if len(compras) > 0:
        dato = {
            'mensaje': 'Si funciono',
            'compra': compras
        }
    else:

        dato = {'mensaje': 'sin datos'}
    return JsonResponse(dato)


"""ESTE ED LA VISTA PARA COMPRAS"""
#$
def agregar_compras(request,id):
    validacion = ValidacionDetalles()
    if request.method == 'GET':
        datos =  validacion.agregar_detalle_compras(id)
        return render(request, 'adminuser/reabastecimiento/agregar_compras.html',datos)
    if request.method == 'POST':
        datosJs = json.loads(request.body)
        respuesta = validacion.guardar_compras(datosJs,id)
        return JsonResponse(respuesta)
    if request.method == 'DELETE':
        datosJs = json.loads(request.body)
        respuesta = validacion.eliminar_registro(datosJs)
        print('--------RESPUESTA ELIMINACION PARA EL CLIENTE--------')
        print(respuesta)
        return JsonResponse(respuesta)
    if request.method == 'PUT':
        datosJs = json.loads(request.body)
        print(datosJs)
        respuesta = validacion.actualizar_datos(datosJs)
        print(respuesta)
        return JsonResponse(respuesta)
        
        
        
    
        



"""--------------------------- DETALLE COMPRA ----------------------------------------------"""

def detallecompras(request,id):
    if request.method == 'GET':
        return render(request, 'adminuser/reabastecimiento/detalle_compras.html', ValidacionDetalles.obtener_detalle_completo(id))



  
    
    

def obtenerDatosDetalle(request):
    # creaando la lista de todas las marcas
    detallecompras = list(DetalleCompra.objects.values())
    if len(detallecompras) > 0:
        dato = {
            'mensaje': 'Si funciono',
            'compra': detallecompras
        }
    else:

        dato = {'mensaje': 'sin datos'}
    return JsonResponse(dato)



"""----------------------------Nuevo Producto-------------------------------------------"""
def nuevo_producto(request):
    validaciones = ValidacionesProductos()
    if request.method == 'GET':
        datos=validaciones.obtener_datos_producto()
        return render(request,'adminuser/reabastecimiento/nuevoProducto.html',datos)
    
    elif request.method == 'DELETE':
        dato_obtenido = json.loads(request.body)
        respuesta = validaciones.eliminar_producto(dato_obtenido)
        return JsonResponse(respuesta)
    
    elif request.method =='POST':
        datosJson = json.loads(request.body)
        respuesta = validaciones.guardar_nuevo_producto(datosJson)
        return JsonResponse(respuesta)
        


'''------------------------------------ Vista de Proveedores-------------------------------------'''
def proveedores(request):
    validaciones = ValidacionesProveedores()
    if request.method == 'GET':
        datos=validaciones.obtener_datos_proveedores()
        return render(request,'adminuser/reabastecimiento/proveedores.html',datos)
       
    elif request.method == 'POST':
        dato_obtenido=json.loads(request.body)
        respuesta = validaciones.agregar_proveedores(dato_obtenido)
        return JsonResponse(respuesta)

    elif request.method == 'DELETE':
        dato_obtenido=json.loads(request.body)
        respuesta = validaciones.eliminar_proveedor(dato_obtenido)
        return JsonResponse(respuesta)

    elif request.method == 'PUT':
        datosJson = json.loads(request.body)
        respuesta = validaciones.actualizar_datos(datosJson)
        return JsonResponse(respuesta)
    
""" -------------------------"""   

def obtenerDatosProveedor(request):
    # creaando la lista de todas las marcas
    proveedores = list(Proveedores.objects.values())
    if len(proveedores) > 0:
        dato = {
            'mensaje': 'Si funciono',
            'proveedores': proveedores
        }
    else:

        dato = {'mensaje': 'sin datos'}
    return JsonResponse(dato)



''' -------------------------- LISTAD DE PEDIDOS ---------------------------------'''

def listadopedidos(request):
    validaciones = ValidacionListadoProductos()
    if request.method == 'GET':
        datos=validaciones.obtener_listado_producto()
        return render(request,'adminuser/reabastecimiento/listadopedido.html',datos)

    elif request.method == 'DELETE':
        dato_obtenido=json.loads(request.body)
        respuesta = validaciones.eliminar_listado(dato_obtenido)
        return JsonResponse(respuesta)
    
    elif request.method =='POST':
        datosJson = json.loads(request.body)
        respuesta = validaciones.agregar_listado(datosJson)
        return JsonResponse(respuesta)
    


def obtenerDatoslistado(request):
        # creaando la lista de todas las marcas
    listadopedido = list(ListadoPedidos.objects.values())
    if len(listadopedido) > 0:
        dato = {
            'mensaje': 'Si funciono',
            'Listado de Pedido': listadopedido
        }
    else:

        dato = {'mensaje': 'sin datos'}
    return JsonResponse(dato)




#-----------------------VISTAS DE CONTROL DE MOVIMIENTO --------------------------------

def inventario_productos(request):
    validaciones = Validacionesinventario()
    
    if request.method == 'GET':
        respuesta = validaciones.obetener_datos_inventario()
        return render(request, 'adminuser/controlinventario/inventario.html',respuesta)
        
    elif request.method == 'POST':
        dato_obtenido = json.loads(request.body)
        respuesta = validaciones.agregar_inventario(dato_obtenido)
    return JsonResponse(respuesta)

def obtenerDatos(request):
    # creaando la lista de todas las marcas
    inventario = list(inventario.objects.values())
    if len(inventario) > 0:
        dato = {
            'mensaje': 'Si funciono',
            'inventario': inventario
        }
    else:

        dato = {'mensaje': 'sin datos'}
    return JsonResponse(dato)



''' ----------------------------- VISTA EMPLEADO -----------------------------'''
def nuevo_empleado(request):
    validaciones = ValidacionEmpleado()
    if request.method == 'GET':
        datos=validaciones.obtener_empleado()
        return render(request,'adminuser/administrativo/empleado.html',datos)


    elif request.method =='POST':
        datosJson = json.loads(request.body)
        respuesta = validaciones.guardar_nuevo_empleados(datosJson)
        return JsonResponse(respuesta)
    
    elif request.method == 'DELETE':
        dato_obtenido = json.loads(request.body)
        respuesta = validaciones.eliminar_empleado(dato_obtenido)
        return JsonResponse(respuesta)
        



""" -----------------------------DETALLE EMPLEADO--------- """

def detalle_empleado(request,id):
    validacion=ValidacionEmpleado()
    
    if request.method=='GET':
        datos=validacion.ver_empleado(id)
        return render(request, 'adminuser/administrativo/detalle-empleado.html',datos)

    if request.method =='PUT':
        datos = json.loads(request.body)
        respuesta = validacion.actualizar_datos_empleado(datos, id)
        return JsonResponse(respuesta)

    

def historialventas(request):
    if request.method=='GET':
        return render(request, 'adminuser/controlinventario/historialventas.html',ValidacionDetalleVenta.obtener_datos())

def historialentradas(request):
    if request.method == 'GET':
        return render(request, 'adminuser/controlinventario/historialentradas.html',ValidacionDetalles.obtener_datos())


def cardex(request):
    return render(request, 'adminuser/controlinventario/cardex.html')

def analisisgrafica(request):
    return render(request, 'adminuser/controlinventario/analisisgrafica.html')


    #---------------BALANCE DE CAJA----------------------------
def agregaregreso(request):
    return render(request, 'adminuser/controlinventario/agregaregresos.html')

def agregaringreso(request):
    return render(request, 'adminuser/controlinventario/agregaringreso.html')

#$
def balancecaja(request):
    validacion = ValidacionCaja()
    if request.method == 'GET':
        datos = validacion.obtner_datos_caja()
        return render(request, 'adminuser/controlinventario/balancecaja.html',datos)

def informeanalisis(request):
    return render(request, 'adminuser/controlinventario/informeanalisis.html')

#---------------MODAL ACTUALIZACION NUEVO PRODUCTO----------------------------

def modalactualizacion(request,id):
    validaciones = ValidacionesProductos()
    if request.method == 'GET':
        datos = validaciones.buscar_producto(id)
        return render(request, 'adminuser/reabastecimiento/modalactualizacion.html',datos)
    if request.method == 'PUT':
        datos = json.loads(request.body)
        respuesta = validaciones.actualizar_datos(datos,id)
        return JsonResponse(respuesta)

#------------------------VENTAS--------------------------------
def registrarventa(request):
    return render(request, 'adminuser/controlinventario/registrarventa.html')
    


""" ---------------------------- REPORTES ----------------------------"""

def generar_pdf(datos_modelo, template_name):
    # Carga la plantilla HTML
    template = get_template(template_name)
    context = {'datos': datos_modelo}

    # Renderiza la plantilla HTML con los datos
    html = template.render(context)

    # Crea una respuesta en PDF
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="reporte.pdf"'

    # Define la función para cargar los recursos estáticos
    def fetch_resources(uri, rel):
        static_path = os.path.join(settings.BASE_DIR, 'static')
        path = os.path.join(static_path, uri.replace(settings.STATIC_URL, ""))
        return path

    # Crea el PDF a partir del HTML usando la biblioteca xhtml2pdf
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), result, link_callback=fetch_resources)

    # Comprueba si se generó el PDF correctamente
    if not pdf.err:
        # Establece el contenido del PDF generado en la respuesta HTTP
        response.write(result.getvalue())
        return response
    else:
        return HttpResponse('Error al generar el PDF', content_type='text/plain')



def reporte_marcas(request):
    rep = ValidacionesMarcas.datos_reporte()
    # datos_marcas = Marcas.objects.all()
    return generar_pdf(rep, 'plantillas_reportes/rp_marcas.html')
    
def reporte_compras(request):
    # datos_compras = DetalleCompra.objects.all()
    rep = ValidacionDetalles.datos_reporte()
    return generar_pdf(rep, 'plantillas_reportes/rp_compras.html')

def reporte_nuevo_producto(request):
    rep = ValidacionesProductos.datos_reporte()
    
    return generar_pdf(rep,'plantillas_reportes/rp_nuevo_producto.html')


def reporte_categorias(request):
    rep = MantenimientoCategoria.datos_reporte()
    # datos_categorias = Categorias.objects.all()
    return generar_pdf(rep,'plantillas_reportes/rp_categorias.html')


def reporte_proveedores(request):
    # Establece la configuración regional en español
    rep = ValidacionesProveedores.datos_reporte()
    return generar_pdf(rep, 'plantillas_reportes/rp_proveedores.html')



def reporte_entradas_compras(request):
    # Establece la configuración regional en español
    rep = ValidacionDetalles.datos_reporte_entrada()
    return generar_pdf(rep, 'plantillas_reportes/rp_entradas_compras.html')

def reporte_salidas_ventas(request):
    # Establece la configuración regional en español
    rep = ValidacionDetalleVenta.datos_reporte_salida()
    return generar_pdf(rep, 'plantillas_reportes/rp_salida_ventas.html')

def reporte_usuarios(request):
    # Establece la configuración regional en español
    rep = ValidarUsuarios.datos_reporte_usuario()
    return generar_pdf(rep, 'plantillas_reportes/rp_usuarios.html')

def reporte_empleado(request):
    # Establece la configuración regional en español
    rep = ValidacionEmpleado.datos_reporte_empleado()
    return generar_pdf(rep, 'plantillas_reportes/rp_empleado.html')




