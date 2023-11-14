from django.db import IntegrityError

class  MantenimientoGeneral:
    """docstring for  MantenimientoGeneral."""
    def __init__(self, modelo):
        self.modelo = modelo

    """buscar un registro"""
    #filtro = {'id':23}
    """ buscas y obtiene un solo registro en espesifico """
    def buscar_registros(self, filtro)-> object:
        """ Este metodo permite buscar un registro en espesifico -> devuelve un objeto """
        print(filtro)
        try:
            return self.modelo.objects.get(**filtro)
        except self.modelo.DoesNotExist:
            print("dato no existe")
            return {'condicion': 'error'}
    
    """-----------------------------------"""
    
    
    
    def dic_buscar_registro(self,filtro)->dict:
        """ este metodo permite obtener datos espesificos en forma de diccionario"""
        try:
            resultado = self.modelo.objects.filter(**filtro).first()
            if resultado is not None:
                return resultado.__dict__
        except Exception as e:
            print(f'error al buscar registro {e}')
            return {'reultado': 'error'}

    """ Listar"""
    
    def obtener_datos(self):
        try:
            lista_datos = list(self.modelo.objects.values())
            return lista_datos
        except Exception as e: 
            print(f"error al obtener datos {e}")
        

    #Este metodo nos permite listar datos especificos
    def obtener_datos_especificos(self, especificos:list):
        lista_datos = list(self.modelo.objects.values_list(*especificos))
        return lista_datos


    """Eliminar"""
    def eliminar_registro(self,identificador:dict):
        """
        identificador: recibe un diccionario donde nosotr devemos de mandar en forma de diciconario 
        como clave: el campo de la tabla
        valor: el identificador
        """
        try:
            registro_eliminar = self.modelo.objects.get(**identificador)
            registro_eliminar.delete()
            return { 'condicion': 'ok','ok':True} 
        except self.modelo.DoesNotExist:
            return {
                'condicion': 'error',
                'mensaje' : 'Dato no encontrado'                
                }
        except IntegrityError as e:
            print(e)
            return {
                'condicion': 'ref_error',
                'mensaje' : 'Dato no eliminado, es necestio que elimine o actualice las referencias en otras tablas, para continuar con la accion'                
                }
            
        except Exception as e:
            print(f' error al eliminar {e}')
            return {'condicion': 'error', 'mensaje':'error fatal dato no borrado'}
    
    
    #$
    def agregar_registro(self, datosJson,nombre_id,lista_val=[]):
        """ 
        Metodo principal para agregar un nuevo registro
        datosJson: diccionario de django (dict)
        lista_val: lista de validaciones (list)
        id: nombre del id que se quiere dar (str)
        """
        respuesta = {}
        
        try:
            campos_unicos = True
            respuesta['datos'] = datosJson 
            print("---------",respuesta) 
            print("-----antes del validacion ----")
            if lista_val:
                campos_val = self._campos_validacion(lista_val,respuesta)
                print("-----antes del if ----")
                campos_unicos = self._validar_campos_unicos(campos_val)
            if campos_unicos:
                self._guardar_registro(respuesta,nombre_id)
            else:
                respuesta['mensaje']='Error el dato ya existe'
                respuesta['condicion']='error'  
                print(respuesta)  
            return respuesta
        except Exception as err:
            print(f'existe un error: {err} ')
            respuesta['mensaje']='Error fatal comuniquese con el Ing. Abi'        
            respuesta['condicion']='error'
            return respuesta
    
    def agregar_registro_baseForm(self,form):
        if form.is_valid():
            try:
                form.save()
                return {
                    'datos': form.cleaned_data,
                    'mensaje':'Datos guardados exitosamente',
                    'condicion':'ok'
                }
            except Exception as e:
                print(f"error al guardar {e}")
                return  {
                    'condicion': 'error',
                  'mensaje' : 'Error al guardar'
                  
                }
        else:
            return {
            'condicion': 'error',
            'mensaje' : 'Datos no validos, por favor vuelva a intentar'
            }

    
    """ actualizar """
    def actualizar_registro(self,datos, filtro)->dict:
        """
        funcion para actuializar un registro 
        datos: son los nuevos datos (dict)
        filtro: es un diccionario donde nos indica el campo y el valor {'campo': valor} (dict) 
        esta funcion retorna un diccionario de datos con los datos 
        actualizados, mensaje y condicion 
        """
        try:
            self.modelo.objects.filter(**filtro).update(**datos)
            nuevos_actualizados={
                'condicion':'ok',
                'mensaje':'Datos actualizados exitosamente',
                'datos':datos
            }
            return nuevos_actualizados
        except Exception as e:
            print(f"Error {e}")
            nuevos_actualizados = {
                'condicion':'error',
                'mensaje':'Error, no se actualizaron los datos'
            }
            return nuevos_actualizados
        
              
    #------------------------------metodos privados----------------------
    
    #validaciones de campos unicos 
    def _validar_campos_unicos(self,validaciones:dict) -> bool:
        existencia = self.modelo.objects.filter(**validaciones).exists()
        return not existencia
    
    def _campos_validacion(self, lista,objetos) -> dict:
        campos_val = {}
        for campos in lista:
            print(f"campo {campos} ->{objetos['datos'][campos]}")
            campos_val[campos] = objetos['datos'][campos] 
        return campos_val
   
    def _guardar_registro(self,objetos:dict, nombre_id):
        try: 
            nuevo_registro= self.modelo(**objetos['datos'])
            nuevo_registro.save()
            print(f"este es con pk {nuevo_registro.pk}")
            objetos['datos'][nombre_id]=nuevo_registro.pk
            objetos['mensaje'] = 'Dato guardado con existo'
            objetos['condicion'] = 'ok'
            objetos['ok'] = True
        except Exception as e:
            print(e)
            objetos['ok'] = False
            objetos['condicion'] = 'error'
            objetos['mensaje'] = 'error al registrar'
