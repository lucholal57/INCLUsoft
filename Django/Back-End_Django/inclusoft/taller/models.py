from django.db import models
from alumno.models import Alumno
from personal.models import Personal


# Create your models here.
class Taller(models.Model):
    nombre_taller = models.CharField(max_length=50)
    observaciones = models.CharField(max_length=100)
    dias = models.CharField(max_length=50)
    horarios = models.TimeField()
    #Relacion ManytoMany 
    alumno_id = models.ManyToManyField(Alumno)
    personal_id = models.ManyToManyField(Personal)
# METODO STR PARA MOSTRAR LOS STRING EN DJANGO ADMIN
    def __str__(self):
        return f'Taller : {self.nombre_taller} : {self.observaciones} : {self.dias} : {self.horarios} '

class Informe_Cuatrimestral(models.Model):
    observaciones_cuatrimestrales = models.CharField(max_length=100);
    #ForeignKey
    taller = models.ForeignKey(Taller, on_delete=models.CASCADE)
    # METODO STR PARA MOSTRAR LOS STRING DE DJANGO ADMIN
    def __str__(self):
        return f'Informe Cuatrimestral : {self.observaciones_cuatrimestrales}'
    
class Materiales_Taller(models.Model):
    insumos_disponibles = models.CharField(max_length=100)
    #ForeingKey
    taller = models.ForeignKey(Taller, on_delete=models.CASCADE)
    #METODO STR PARA MOSTRAR LOS STRING
    def __str__(self):
        return f'Materiales Taller : {self.insumos_disponibles}'
    
class Ventas_Taller(models.Model):
    ganancia = models.CharField(max_length=50)
    observacion_ventas = models.CharField(max_length=100);
    #ForeignKey
    taller = models.ForeignKey(Taller, on_delete=models.CASCADE)
    # METODO STR PARA MOSTRAR LOS STRING
    def __str__(self):
        return f'Ventas Taller : {self.ganancia} : {self.observacion_ventas}'
    
class Produccion_Taller(models.Model):
    nombre_produccion = models.CharField(max_length=50)
    fecha_produccion = models.DateField()
    materiales = models.CharField(max_length=50)
    costo_venta = models.CharField(max_length=50)
    #ForeignKey
    taller = models.ForeignKey(Taller, on_delete=models.CASCADE)
    #METODO STR PARA MOSTRAR LOS STRING
    def __str__(self):
        return f'Produccion Taller : {self.nombre_produccion} : {self.fecha_produccion} : {self.materiales } : {self.costo_venta}'
    
class Compras_Taller(models.Model):
    insumos = models.CharField(max_length=50)
    observaciones_compra = models.CharField(max_length=100)
    #ForeignKey
    taller = models.ForeignKey(Taller, on_delete=models.CASCADE)
    #METODO STR PARA MOSTRAR LOS STRING
    def __str__(self):
        return f'Compas Taller {self.insumos } {self.observaciones_compra }'
    
class Inventario_Taller(models.Model):
    materiales_fin_ciclo = models.CharField(max_length=50, null=True)
    #ForeignKey
    taller = models.ForeignKey(Taller, on_delete=models.CASCADE)
    # METODO STR PARA MOSTRAR LOS STRING
    def __str__(self):
        return f'Inventario Taller : {self.materiales_fin_ciclo}'
    
