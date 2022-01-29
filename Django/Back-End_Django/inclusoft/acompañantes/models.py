from django.db import models
from alumno.models import Alumno
from personal.models import Personal


# Create your models here.
class Acompañante(models.Model):
    observaciones_acompanante = models.CharField(max_length=300)
    # ForeignKey
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    personal = models.ForeignKey(Personal, on_delete=models.CASCADE)

    # METODO STR PARA MOSTRAR LOS STRING EN DJANGO ADMIN
    def __str__(self):
        return f'Acompañante : {self.id} : {self.observaciones_acompanante} '
