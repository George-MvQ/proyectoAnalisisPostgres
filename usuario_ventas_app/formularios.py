from django import forms
from administracion_app.models import Ventas, Productos, DetalleVentas, Inventario




class Ventasform(forms.ModelForm):
    class Meta:
        model = DetalleVentas
        fields = ['fk_id_producto1']
        labels = {

            'fk_id_producto1' :'Producto'
      
        }

""" inventario """

class inventarioForm(forms.ModelForm):
    # fecha_creacion = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    class Meta:
        model = Inventario
        fields = '__all__'
        labels = {
            # 'fecha_creacion':'Fecha de Creación',
            'fk_producto2': 'Producto',
        }
