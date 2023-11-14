from django.http import HttpResponseRedirect
from django.urls import reverse

class BloquarRutasMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        if not(request.user.is_authenticated)  and request.path.startswith('/usuario-ventas/'):
            print('entro en la no logeado, hola desde  /usuario-ventas/')
            return HttpResponseRedirect(reverse('logeo'))
        response = self.get_response(request)
        return response
        
