from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

# Create your models here.
class Caja(models.Model):
    id_caja = models.AutoField(db_column='ID_caja', primary_key=True)
    anio = models.CharField(db_column='Anio', max_length=4)
    mes = models.CharField(db_column='Mes', max_length=10)
    total_gastos = models.DecimalField(db_column='Total_gastos', max_digits=19, decimal_places=4)
    total_ingresos = models.DecimalField(db_column='Total_ingresos', max_digits=19, decimal_places=4)
    total_caja = models.DecimalField(db_column='Total_caja', max_digits=19, decimal_places=4)



class Categorias(models.Model):
    id_categoria = models.AutoField(db_column='ID_categoria', primary_key=True)
    nombre_categoria = models.CharField(db_column='Nombre_categoria', max_length=50)
    descripcion = models.CharField(db_column='Descripcion', max_length=100, blank=True, null=True)
    estado = models.BooleanField(db_column='Estado')



    def __str__(self):
        if self.nombre_categoria is not None:
            return self.nombre_categoria
        else:
            return "Sin nombre de categoria"


class Compras(models.Model):
    id_compra = models.BigAutoField(db_column='ID_compra', primary_key=True)
    fecha_compra = models.DateField(db_column='Fecha_compra', blank=True, null=True)
    fk_proveedor = models.ForeignKey('Proveedores', models.DO_NOTHING, db_column='fk_proveedor', blank=True, null=True)
    fk_empleado = models.ForeignKey('Empleados', models.DO_NOTHING, db_column='fk_empleado', blank=True, null=True)
    fk_metodo_pago = models.ForeignKey('MetodosPago', models.DO_NOTHING, db_column='fk_metodo_pago', blank=True, null=True)
    observaciones = models.CharField(db_column='Observaciones', max_length=100, blank=True, null=True)
    total = models.DecimalField(max_digits=18, decimal_places=2, blank=True, null=True)



class DetalleCompra(models.Model):
    id_detalle_compra = models.BigAutoField(db_column='ID_detalle_compra', primary_key=True)
    fk_producto = models.ForeignKey('Productos', models.DO_NOTHING, db_column='fk_producto', blank=True, null=True)
    fk_compra = models.ForeignKey('Compras', models.DO_NOTHING, db_column='fk_compra', blank=True, null=True)
    descuentos = models.DecimalField(db_column='Descuentos', max_digits=18, decimal_places=2, blank=True, null=True)
    cantidad_compra = models.IntegerField(db_column='Cantidad_compra')
    precio_unitario_compra = models.DecimalField(max_digits=18, decimal_places=2)
    precio_sugerido_venta = models.DecimalField(db_column='Precio_sugerido_venta', max_digits=18, decimal_places=2)
    no_lote = models.IntegerField(db_column='No_lote')



class DetalleListadoDePedidos(models.Model):
    id_ls_detalle_producto = models.BigAutoField(db_column='ID_ls_detalle_producto', primary_key=True)
    fk_listado_pedido = models.ForeignKey('ListadoPedidos', models.DO_NOTHING, db_column='fk_listado_pedido')
    fk_producto3 = models.ForeignKey('Productos', models.DO_NOTHING, db_column='fk_Producto3')
    cantidad_a_comprar = models.IntegerField(db_column='Cantidad_a_comprar')



class DetalleVentas(models.Model):
    id_detalle_venta = models.AutoField(db_column='ID_detalle_venta', primary_key=True)
    fk_venta = models.ForeignKey('Ventas', models.DO_NOTHING, db_column='fk_venta', blank=True, null=True)
    fk_id_producto1 = models.ForeignKey('Productos', models.DO_NOTHING, db_column='fk_id_producto1', blank=True, null=True)
    cantidad_producto = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    descuento = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)


class Empleados(models.Model):
    id_empleado = models.AutoField(db_column='ID_empleado', primary_key=True)
    primer_nombre = models.CharField(db_column='Primer_nombre', max_length=50)
    segundo_nombre = models.CharField(db_column='Segundo_nombre', max_length=50)
    otros_nombres = models.TextField(db_column='Otros_nombres', blank=True, null=True)
    primer_apellido = models.CharField(db_column='Primer_apellido', max_length=50)
    segundo_apellido = models.CharField(db_column='Segundo_apellido', max_length=50, blank=True, null=True)
    apellido_casada = models.CharField(db_column='Apellido_casada', max_length=50, blank=True, null=True)
    fk_id_puesto = models.ForeignKey('Puestos', models.DO_NOTHING, db_column='fk_id_puesto', blank=True, null=True)
    fk_usuario = models.ForeignKey('AuthUser', models.DO_NOTHING, db_column='fk_usuario', blank=True, null=True)


    def __str__(self):
        if self.primer_nombre is not None:
            return self.primer_nombre
        else:
            return "Sin Empleados"


class Inventario(models.Model):
    id_inventario = models.AutoField(db_column='ID_inventario', primary_key=True)
    fk_producto2 = models.ForeignKey('Productos', models.DO_NOTHING, db_column='fk_producto2', blank=True, null=True)
    fecha_ultima_salida = models.DateField(blank=True, null=True)
    fecha_ultima_entrada = models.DateField(blank=True, null=True)
    total_stock = models.IntegerField(blank=True, null=True)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.fk_producto2.nombre_producto
    

class ListadoPedidos(models.Model):
    id_listado = models.BigAutoField(db_column='ID_listado', primary_key=True)
    fecha_creacion = models.DateField(db_column='Fecha_creacion')
    fk_empleado = models.ForeignKey('Empleados', models.DO_NOTHING, db_column='fk_empleado')
    estado = models.BooleanField(db_column='Estado')



class Marcas(models.Model):
    id_marcas = models.AutoField(db_column='ID_marcas', primary_key=True)
    nombre_marca = models.CharField(unique=True, db_column='Nombre_marca', max_length=80)
    descripcion = models.CharField(db_column='Descripcion', max_length=150, blank=True, null=True)
    estado = models.BooleanField(db_column='Estado')

    def __str__(self):
        if self.nombre_marca is not None:
            return self.nombre_marca
        else:
            return "Sin nombre de marca"


class MetodosPago(models.Model):
    id_metodo_pago = models.AutoField(db_column='ID_metodo_pago', primary_key=True)
    nombre = models.CharField(db_column='Nombre', max_length=50, blank=True, null=True)
    descripcion = models.CharField(db_column='Descripcion', max_length=100, blank=True, null=True)

    def __str__(self):
        if self.nombre is not None:
            return self.nombre
        else:
            return "Sin empleados"

class MovimientoCaja(models.Model):
    id_mov_caja = models.AutoField(db_column='ID_mov_caja', primary_key=True)
    fecha = models.DateField(db_column='Fecha')
    descripcion = models.CharField(db_column='Descripcion', max_length=50)
    observaciones = models.CharField(db_column='Observaciones', max_length=150, blank=True, null=True)
    fk_tipo_movimiento = models.ForeignKey('Movimientos', models.DO_NOTHING, db_column='fk_tipo_movimiento')
    monto_total = models.DecimalField(db_column='Monto_total', max_digits=19, decimal_places=4)

class Movimientos(models.Model):
    id_movimiento = models.AutoField(db_column='ID_movimiento', primary_key=True)
    nombre = models.CharField(db_column='Nombre', max_length=50)

class Presentacion(models.Model):
    id_presentacion = models.AutoField(db_column='ID_presentacion', primary_key=True)
    nombre_presentacion = models.CharField(db_column='Nombre_presentacion', max_length=50)

    def __str__(self):
        if self.nombre_presentacion is not None:
            return self.nombre_presentacion
        else:
            return "Sin nombre de presentación"

class Productos(models.Model):
    id_productos = models.AutoField(db_column='ID_productos', primary_key=True)
    nombre_producto = models.CharField(db_column='Nombre_producto', max_length=50)
    descripcion = models.CharField(db_column='Descripcion', max_length=100, blank=True, null=True)
    codigo_barras = models.CharField(db_column='Codigo_barras', max_length=20, blank=True, null=True)
    tamanio = models.DecimalField(db_column='Tamanio', max_digits=4, decimal_places=2)
    imagen = models.BinaryField(db_column='Imagen')
    fk_presentacion = models.ForeignKey('Presentacion', models.DO_NOTHING, db_column='fk_presentacion')
    fk_unidad_medida = models.ForeignKey('UnidadesMedidas', models.DO_NOTHING, db_column='fk_unidad_medida')
    fk_categoria = models.ForeignKey('Categorias', models.DO_NOTHING, db_column='fk_categoria')
    fk_marca = models.ForeignKey('Marcas', models.DO_NOTHING, db_column='fk_marca')
    estado = models.BooleanField(db_column='Estado')

    def __str__(self):
        return self.nombre_producto

class Proveedores(models.Model):
    id_proveedor = models.AutoField(db_column='ID_proveedor', primary_key=True)
    nombre_proveedor = models.CharField(db_column='Nombre_proveedor', max_length=50, blank=True, null=True)
    telefono = models.CharField(db_column='Telefono', max_length=20, blank=True, null=True)
    estado = models.BooleanField(db_column='Estado', null=True)
    dia_visita = models.CharField(db_column='Dia_visita', max_length=25, blank=True, null=True)
    dia_entrega = models.CharField(db_column='Dia_entrega', max_length=25, blank=True, null=True)
    descripcion = models.CharField(db_column='Descripcion', max_length=100, blank=True, null=True)

    def __str__(self):
        if self.nombre_proveedor is not None:
            return self.nombre_proveedor
        else:
            return "Sin proveedores"

class Puestos(models.Model):
    id_puestos = models.AutoField(db_column='ID_puestos', primary_key=True)
    nombre_puesto = models.CharField(db_column='Nombre_puesto', max_length=25)
    detalles = models.CharField(db_column='Detalles', max_length=50, blank=True, null=True)

    def __str__(self):
        return self.nombre_puesto
    
class UnidadesMedidas(models.Model):
    id_medicion = models.AutoField(db_column='ID_medicion', primary_key=True)
    descripcion = models.CharField(db_column='Descripcion', max_length=20)
    prefijo = models.CharField(max_length=6)

    def __str__(self):
        if self.descripcion is not None:
            return self.descripcion
        else:
            return "Sin descripcion"

class Ventas(models.Model):
    id_venta = models.BigAutoField(db_column='ID_venta', primary_key=True)
    fecha_venta = models.DateField(db_column='fecha_Venta', blank=True, null=True)
    fk_empleado1 = models.ForeignKey('Empleados', models.DO_NOTHING, db_column='fk_empleado1', blank=True, null=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  
class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'