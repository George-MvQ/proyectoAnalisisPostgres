from django import forms
from administracion_app.models import Proveedores,  Empleados, MetodosPago, Productos, ListadoPedidos, Compras, Productos, DetalleCompra, Inventario, Empleados

#tupla contiene dos elementos 1. valor que se envia 2. texto se se muestra
_opciones:list = [(True, 'Activo'), (False, 'Inactivo')]


class MarcaForm(forms.Form):
    # _proveedores:Proveedores = Proveedores.objects.values_list('id_proveedor','nombre_vendedor')
    nombre_marca = forms.CharField(
        label='Nombre Marca',
        max_length=100,
        widget = forms.TextInput(attrs={'id':'in_nombre'}),
        error_messages={
        'required': 'Este campo es obligatorio. Por favor, ingresa un nombre de marca.',
        },
        required=True
        )
    descripcion = forms.CharField(
        label='Descripción',
        max_length=255,
        widget = forms.TextInput(attrs={'id':'in_descripcion'}),
        required=False,  # Establece el campo como opcional
        )
    estado = forms.ChoiceField(
        label='Estado',
        choices=_opciones
       )


# formulario de Categorias

class CategoriaForm(forms.Form):
    nombre_categoria = forms.CharField(
        label='Nombre Categoria',
        max_length=100,
        widget = forms.TextInput(attrs={'id':'in_nombre'}),
        )
    descripcion = forms.CharField(
        label='Descripción',
        max_length=255,
        widget = forms.TextInput(attrs={'id':'in_descripcion'})
        )
    estado = forms.ChoiceField(
        label='Estado',
        choices=_opciones
       )

# formulario compras

class Comprasform(forms.ModelForm):
    fecha_compra = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    class Meta:
        model = Compras
        fields = '__all__'
        labels = {

            'id_compra' :'Compra',
            'fk_proveedor' : 'Proveedor',
            'fk_empleado'  :'Empleado',
            'fk_metodo_pago': 'Metodo de Pago',
            'observaciones'  : 'Observaciones',

        }




    # _proveedores:Proveedores = Proveedores.objects.values_list('id_proveedor','nombre_vendedor')
    # _empleado:Empleados = Empleados.objects.values_list('id_empleado','primer_nombre')
    # _metodopago:MetodosPago = MetodosPago.objects.values_list('id_metodo_pago','nombre')
    # fechaCompra = forms.DateField(
    #     label='Fecha Compra',
    #     widget=forms.DateInput(attrs={'id': 'in_fecha', 'type': 'date','format': '%d/%m/%Y'}),
    #     input_formats=['%d/%m/%Y'],
    #     )
    # proveedor = forms.ChoiceField(
    #     label='Proveedores',
    #     choices=_proveedores
    #   )
    # empleado = forms.ChoiceField(
    #     label='Empleado',
    #     choices=_empleado
    #   )
    # metodopago = forms.ChoiceField(
    #     label='Metodo de Pago',
    #     choices=_metodopago
    #   )
    # observaciones = forms.CharField(
    #     label='observaciones',
    #     max_length=255,
    #     widget = forms.TextInput(attrs={'id':'in_observaciones'})
    #     )


""" DETALLE COMPRA"""

class DetalleForm(forms.Form):
        _producto:Productos = Productos.objects.values_list('id_productos','nombre_producto')
        producto = forms.ChoiceField(
            label='Nombre Producto',
            choices=_producto
        )
        compras = forms.CharField(
            label='No. Compra',
            max_length=100,
            widget = forms.TextInput(attrs={'id':'in_compras'}),
        )
        descuentos = forms.CharField(
            label='Descuentos',
            max_length=100,
            widget = forms.TextInput(attrs={'id':'in_descuentos'}),
        )
        cantidad = forms.CharField(
            label='Cantidad',
            max_length=100,
            widget = forms.TextInput(attrs={'id':'in_cantidad'}),
        )
        preciounitario = forms.CharField(
            label='Precio Unitario Compra',
            max_length=100,
            widget = forms.TextInput(attrs={'id':'in_preciounitario'}),
        )
        preciosugerido = forms.CharField(
            label='Precio de Venta',
            max_length=100,
            widget = forms.TextInput(attrs={'id':'in_precioventa'}),
        )
        numerolote = forms.CharField(
            label='No lote',
            max_length=100,
            widget = forms.TextInput(attrs={'id':'in_lote'}),
        )

""" ------------------------Formulario para ingresar y actualizar compras-------------------------"""        


class IdFormDetalleCompras():
    fk_producto = 'id_fk_producto'
    descuentos = 'id_descuentos'
    cantidad_compra = 'id_cantidad_compra'
    precio_unitario_compra = 'id_precio_unitario_compra' 
    precio_sugerido_venta = 'id_precio_sugerido_venta'
    no_lote = 'id_no_lote'
       

class DetalleCompraForm(forms.ModelForm):
    class Meta: 
        model = DetalleCompra
        exclude = ['fk_compra']
        labels = {
            'fk_producto':'Producto'
            }
    def __init__(self, *args, **kwargs):
        ids = kwargs.pop('ids_detalles',None)
        super(DetalleCompraForm,self).__init__(*args, **kwargs)
        if ids:
            for nombre_campo, campo_id in vars(ids).items():
                self.fields[nombre_campo].widget.attrs['id'] = campo_id
                



class ProveedoresForm(forms.Form):
        nombre_proveedor = forms.CharField(
        label='Nombre Proveedor',
        max_length=100,
        widget = forms.TextInput(attrs={'id':'in_nombre'}),
        )
        telefono = forms.CharField(
        label='Telefono',
        max_length=20,
        widget = forms.TextInput(attrs={'id':'in_telefono'}),
        )
        dia_visita = forms.DateField(
        label='Dia de visita',
        widget=forms.DateInput(attrs={'id': 'in_fechavi', 'type': 'date','format': '%d/%m/%Y'}),
        input_formats=['%d/%m/%Y'],
        )
        dia_entrega = forms.DateField(
        label='Dia de entrega',
        widget=forms.DateInput(attrs={'id': 'in_fechavi', 'type': 'date','format': '%d/%m/%Y'}),
        input_formats=['%d/%m/%Y'],
        )
        descripcion = forms.CharField(
        label='Descripción',
        max_length=255,
        widget = forms.TextInput(attrs={'id':'in_descripcion'})
        )
        estado = forms.ChoiceField(
        label='Estado',
        choices=_opciones
       )


class UsuarioForm(forms.Form):
    username = forms.CharField(
        label='Nombre de usuario',
        max_length=100,
        widget = forms.TextInput(attrs={
            'id':'in_nombre_usuario',
            'class': 'input_form'
        }),
        required=True
    )

    password = forms.CharField(
        label='Contraseña',
        max_length=100,
        widget = forms.PasswordInput(attrs={
            'id':'in_contra',
            'class': 'input_form'
        }),
        required=True

    )

    email = forms.CharField(
        label='Correo',
        max_length=255,
        widget = forms.EmailInput (attrs={
            'id':'in_correo',
            'class': 'input_form'
            }),
        required=True
        )

    is_active = forms.ChoiceField(
        label='Estado',
        choices=_opciones
       )

    is_superuser = forms.ChoiceField(
        label='super usuario',
        choices=_opciones
       )



class listadoForm(forms.ModelForm):
    fecha_creacion = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    class Meta:
        model = ListadoPedidos
        fields = '__all__'
        labels = {
            # 'fecha_creacion':'Fecha de Creación',
            'fk_empleado':'Empleado',
            'estado':'Estado',
        }

        
class inventarioForm(forms.ModelForm):
    # fecha_creacion = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    class Meta:
        model = Inventario
        fields = '__all__'
        labels = {
            # 'fecha_creacion':'Fecha de Creación',
            'fk_producto2':'Producto',
        }
   

        
        
class NuevoProducto(forms.ModelForm):
    class Meta: 
        model = Productos
        fields = '__all__'
        labels = {
            'nombre_producto':' Nombre del Producto',
            'descripcion':'Descripción del Producto',
            'codigo_producto':'Código del Producto',
            'tamanio':'Tamaño',
            'imagen':'Imagen',
            'fk_presentacion':'Presentación', 
            'fk_unidad_medida' :'Unidada de Medida',
            'fk_categoria':'Categoría',
            'fk_marca':'Marca',
            'estado': 'Estado',
        }
class EmpleadoForm(forms.ModelForm):
    class Meta: 
        model = Empleados
        fields = '__all__'
        labels = {
            'fk_id_puesto':'Puesto',
            'fk_usuario':'Usuario'
        }
    def __init__(self, *args, **kwargs):
        super(EmpleadoForm, self).__init__(*args, **kwargs)
        self.fields['otros_nombres'].widget.attrs.update({'id': 'in_otros_nombres'})

    





""" password = models.CharField(max_length=128, db_collation='Modern_Spanish_CI_AS')
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150, db_collation='Modern_Spanish_CI_AS')
    email = models.CharField(max_length=254, db_collation='Modern_Spanish_CI_AS')
    is_active = models.BooleanField()
"""
