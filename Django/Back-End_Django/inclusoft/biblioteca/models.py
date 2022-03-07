from django.db import models
from alumno.models import Alumno
from personal.models import Personal

# Create your models here.

class Socio(models.Model):
    fecha_de_inscripcion = models.DateField(null=True)
    # ForeignKey
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    

    # METODO STR PARA MOSTRAR LOS STRING EN DJANGO ADMIN
    def __str__(self):
        return f'Socio:{self.alumno}' f'Fecha inscripcion {self.fecha_de_inscripcion} '
    
class Libro(models.Model):
    titulo = models.CharField(max_length=100)
    edades = models.CharField(max_length=3)
    estado = models.CharField(max_length=15)
    
    # METODO STR PARA MOSTRAR LOS STRING EN DJANGO ADMIN
    def __str__(self):
        return f'Libro: {self.titulo} : {self.edades} : {self.estado}'
    
class PrestamoLibro(models.Model):
    fecha_de_prestamo = models.DateField(null=True)
    estado = models.CharField(max_length=10, null=True)
    fecha_de_devolucion = models.DateField(null=True)
    # ForeignKey
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    socio = models.ForeignKey(Socio, on_delete=models.CASCADE)
    
    # METODO STR PARA MOSTRAR LOS STRING EN DJANGO ADMIN
    def __str__(self):
        return f'Prestamo: {self.fecha_de_prestamo} '
    
class DevolucionLibro(models.Model):
    fecha_de_devolucion = models.DateField(null=True)
    # ForeignKey
    prestamo = models.ForeignKey(PrestamoLibro, on_delete=models.CASCADE)
    
    # METODO STR PARA MOSTRAR LOS STRING EN DJANGO ADMIN
    def __str__(self):
        return f'Devolucion: {self.fecha_de_devolucion} '
    
    