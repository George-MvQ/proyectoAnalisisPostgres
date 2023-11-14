from django.http import HttpResponseRedirect
from django.urls import reverse

class BloquarRutasMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        if not(request.user.is_authenticated and request.user.is_superuser) and request.path.startswith('/admon/'):
            print('entro en la no logeado, hola desde  /admon/')
            return HttpResponseRedirect(reverse('logeo'))
        response = self.get_response(request)
        return response
        
