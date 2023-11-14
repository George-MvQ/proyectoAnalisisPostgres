from django.shortcuts import render
from django.http import JsonResponse

from .validaciones import *
# Create your views here.

import json

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


from xhtml2pdf import pisa
from io import BytesIO
from django.template.loader import get_template


#------------------------VENTAS--------------------------------
def registrarventa(request):
    validaciones = ValidacionVenta()
    if request.method == 'GET':
        datos = validaciones.obtener_venta()
        return render(request, 'registrar_venta.html',datos)
    
    if request.method =='POST':
        datos = json.loads(request.body)
        respuesta= validaciones.agregar_detalle_ventas(datos)
        print("Datos finales --------")
        print (datos['venta'])
        return JsonResponse(respuesta)



def api_ventas(request, id):
    validaciones = ValidarDatosVentas()
    if request.method == 'GET':
        datos = validaciones.obtener_datos_inventario(id)
        return JsonResponse(datos)


def productosagotados(request):
    return render(request, 'productos_agotados.html')

def comprobante(request):
    return render(request, 'comprobante.html')




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



def reporte_comprobante(request,id):
    if request.method == 'GET':
        return generar_pdf(ValidacionVenta.obtener_registro_venta(id), 'plantilla_comprobante/comprobante.html')


def historialventas(request):
    if request.method == 'GET':
        return render(request, 'historial-ventas.html', ValidacionDetalleVenta.obtener_datos())



def inventario_minimo(request):
    validaciones = Validacionesinventario()

    if request.method == 'GET':
        respuesta = validaciones.obetener_datos_inventarioMinimo()
        return render(request, 'inventarioMinimo.html', respuesta)

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
# def obtener_datos():
#     detalles_ventas = DetalleVentas.objects.all()
#     ventas = Ventas.objects.all()
#     # Combina los datos o realiza las operaciones necesarias
#     datos_combinados = {
#         'detalles_ventas': detalles_ventas,
#         'ventas': ventas,
#     }
#     return datos_combinados

# def reporte_comprobante(request):
#     datos_combinados = obtener_datos()
#     return generar_pdf(datos_combinados, 'plantilla_comprobante/comprobante.html')
