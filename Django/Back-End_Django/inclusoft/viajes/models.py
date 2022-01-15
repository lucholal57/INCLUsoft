from django.db import models
from alumno.models import Alumno
from personal.models import Personal

# Create your models here.
class Viaje(models.Model):
    destino = models.CharField(max_length=100)
    fecha_viaje = models.DateField()
    gastos = models.CharField(max_length=50)
    #Relacion manytoMany
    alumno = models.ManyToManyField(Alumno)
    personal = models.ManyToManyField(Personal)
    # METODO STR PARA MOSTRAR LOS STRING EN DJANGO ADMIN
    def __str__(self):
        return f'Viajes : {self.destino} : {self.fecha_viaje} : {self.gastos} '
