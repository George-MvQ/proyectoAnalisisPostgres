from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate, logout
from .form_users import LoginForm
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.views.generic.base import View, TemplateView


# Create your views here.


def inicio(request):
    return render(request, 'index.html')


def administrador(request):
    return render(request, 'infoTienda.html')


#simpore deveulve un get
def logeo(request):
    if request.method =='GET':
        print('111')
        form = LoginForm()
        return render(request, 'login.html', {'form': form})

    else: 
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            print(username)
            print(password)
            user = authenticate(request, username=username, password=password)
            print(user is not None)
            if user is not None and user.check_password(password):
                login(request, user)
                #si es superusiario se va al panel de adiministrador 
                if user.is_superuser:
                    return redirect('/admon/')
                #panel de vendedro 
                else:
                   print('2')
                   return redirect('registrar_venta')
            else:
                return redirect('logeo')
        else:
            return redirect('/')



def cerrar_secion(request):
    logout(request)
    return redirect('inicio')
    
"""
    if request.method =='POST':
        return redirect ('inicio')
    else: 
        return render(request, 'login.html')            
"""   


def prueba(request):
    datos = {
        'titulo': 'este es una prueba',
        'contenido':'este es el contenido',
        'form': UserCreationForm
    }
    return render(request, 'pruebas.html', datos)


def error_404(request, exception):
    return render(request,'error404.html',status=404)