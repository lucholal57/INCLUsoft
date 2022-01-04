from django.db import models

# Create your models here.
class Personal(models.Model):
    nombre_personal = models.CharField(max_length=50)
    apellido_personal = models.CharField(max_length=50)
    dni_personal = models.CharField(max_length=15)
    telefono_personal = models.CharField(max_length=15)
    fecha_nacimiento_personal = models.DateField()
    lugar_nacimiento_personal = models.CharField(max_length=50)
    profesion = models.CharField(max_length=50)
    
    # METODO STR PARA MOSTRAR LOS STRING EN DJANGO ADMIN    
    def __str__(self):
        return f'Personal : {self.id} - {self.nombre_personal}  {self.apellido_personal} '

class Permiso_Salida(models.Model):
    fecha_permiso = models.DateField()
    motivo = models.CharField(max_length=255)
    horario_salida = models.TimeField()
    horario_regreso = models.TimeField()
    #ForeignKey
    personal = models.ForeignKey(Personal, on_delete= models.CASCADE)
    #METODO STR PARA MOSTRAR LOS STRING EN DJANGO ADMIN 
    def __str__(self):
        return f'Permiso Salida : {self.fecha_permiso} : {self.motivo} : {self.horario_salida} : {self.horario_regreso}'
    
class Evaluacion_Laboral(models.Model):
    observaciones_laboral = models.CharField(max_length=255)
    #ForeignKey
    personal = models.ForeignKey(Personal, on_delete=models.CASCADE)
    #METODO STR PARA MOSTRAR LOS STRING EN DJANGO ADMIN 
    def __str__(self):
        return f'Evaluacion Laboral : {self.observaciones_laboral}'
    
class Asistencia_Personal(models.Model):
    hora_ingreso = models.TimeField()
    hora_salida = models.TimeField()
    estado = models.CharField(max_length=50)
    #ForeignKey
    personal = models.ForeignKey(Personal, on_delete= models.CASCADE)
    #METODO STR PARA MOSTRAR LOS STRING EN DJANGO ADMIN
    def __str__(self):
        return f'Asistencia : {self.hora_ingreso} : {self.hora_salida} : {self.estado}'
    
class Entrega_Proyecto(models.Model):
    fecha_entrega = models.DateField()
    area = models.CharField(max_length=100)
    observacion = models.CharField(max_length=255)
    #ForeignKey
    personal = models.ForeignKey(Personal, on_delete=models.CASCADE)
    #METODO STR PARA MOSTRAR LOS STRING EN DJANGO ADMIN
    def __str__(self):
        return f'Entrega Proyecto : {self.fecha_entrega} : {self.area} : {self.observacion}'
    