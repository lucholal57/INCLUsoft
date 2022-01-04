from django.db import models

# Create your models here.
class Alumno(models.Model):
    nombre_alumno = models.CharField(max_length=50)
    apellido_alumno = models.CharField(max_length=50)
    dni_alumno = models.CharField( max_length=15,null=False)
    telefono_alumno = models.CharField(max_length=15 ,null=True)
    fecha_nacimiento_alumno = models.DateField(null=True)
    lugar_nacimiento_alumno = models.CharField(max_length=50)
    direccion_alumno = models.CharField(max_length=50)

    # DEFINIMOS EL METODO STR PARA MOSTRAR EL MSJ
    def __str__(self):
        return f'Alumno : {self.id} - {self.nombre_alumno}  {self.apellido_alumno} '

class Datos_Adicionales(models.Model):
    jubilacion_si = 'si'
    jubilacion_no = 'no'
    jubilacion_op = [
        (jubilacion_si, 'si'),
        (jubilacion_no, 'no')
    ]
    jubilacion = models.CharField(max_length=2, choices=jubilacion_op, null=True)

    pension_si = 'si'
    pension_no = 'no'
    pension_op = [
        (pension_si, 'si'),
        (pension_no, 'no')
    ]
    pension = models.CharField(max_length=2, choices=pension_op, null=True)

    cobertura_social_si = 'si'
    cobertura_social_no = 'no'
    cobertura_social_op = [
        (cobertura_social_si, 'si'),
        (cobertura_social_no, 'no')
    ]
    cobertura_social = models.CharField(
        max_length=2, choices=cobertura_social_op, null=True)

    certificado_discapacidad_si = 'si'
    certificado_discapacidad_no = 'no'
    certificado_discapacidad_op = [
        (certificado_discapacidad_si, 'si'),
        (certificado_discapacidad_no, 'no')
    ]
    certificado_discapacidad = models.CharField(
        max_length=2, choices=certificado_discapacidad_op, null=True)

    vigencia_certificado = models.DateField(null=True)
    nivel_educacional = models.CharField(max_length=100,null=True)
    grupo_familiar_convivencia = models.CharField(max_length=255,null=True)
    actividades_realiza = models.CharField(max_length=255,null=True)
    trabajo_madre = models.CharField(max_length=100,null=True)
    trabajo_padre = models.CharField(max_length=100,null=True)
    telefono_madre = models.CharField(max_length=20,null=True)
    telefono_padre = models.CharField(max_length=20,null=True)
    #FORENKEY
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE, related_name='alumno')

    def __str__(self):
        return f'Datos Adicionales : {self.jubilacion} : {self.pension} : {self.cobertura_social} : {self.certificado_discapacidad} : {self.vigencia_certificado} : {self.nivel_educacional} : {self.grupo_familiar_convivencia} : {self.actividades_realiza} : {self.trabajo_madre} : {self.trabajo_padre} : {self.telefono_madre} : {self.telefono_padre} '
    
class Asistencia_Alumno(models.Model):
    fecha_asistencia = models.DateField()
    estado_asistencia = models.CharField(max_length=20)
     #FORENKEY
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE, null=True )
    
    def __str__(self):
        return f'Asistencias : {self.fecha_asistencia} : {self.estado_asistencia}'
    
class Antecedente_Medico(models.Model):
    grupo_sanguineo = models.CharField(max_length=20)
    factor_rh = models.CharField(max_length=2)
     #FORENKEY
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE, null=True )
    
    def __str__(self):
        return f'Antecedentes Medicos : {self.grupo_sanguineo} : {self.factor_rh} '
    
class Patologia(models.Model):
    nombre_patologia = models.CharField(max_length=50)
    medicacion = models.CharField(max_length=100)
    observacion = models.CharField(max_length=255)
     #FORENKEY
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE, null=True )
    
    def __str__(self):
        return f'Patologia : {self.nombre_patologia} : {self.medicacion} : {self.observacion} '

class Acta_Compromiso(models.Model):
    dias = models.CharField(max_length=100)
    ingreso = models.TimeField()
    salida = models.TimeField()
    traslado = models.CharField(max_length=100)
    personas_autorizadas_retiro = models.CharField(max_length=100)
    dni_persona_autorizada = models.CharField(max_length=50)
      #FORENKEY
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE, null=True )
    
    def __str__(self):
        return f'Acta Compromiso : {self.dias} : {self.ingreso} : {self.salida} : {self.traslado} : {self.personas_autorizadas_retiro} : {self.dni_persona_autorizada} '
    
class Enfermeria(models.Model):
    observaciones = models.CharField(max_length=255)
    fecha_observacion = models.DateField(null=True)
    #FORENKEY
    alumno = models.ForeignKey(Alumno,on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return f'Observacion Medica : {self.observaciones}'
