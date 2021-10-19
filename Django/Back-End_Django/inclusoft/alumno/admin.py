from django.contrib import admin
from .models import Alumno, Acta_Compromiso, Antecedente_Medico, Asistencia_Alumno, Datos_Adicionales, Enfermeria, Patologia

admin.site.register(Alumno)
admin.site.register(Datos_Adicionales)
admin.site.register(Asistencia_Alumno)
admin.site.register(Antecedente_Medico)
admin.site.register(Patologia)
admin.site.register(Acta_Compromiso)
admin.site.register(Enfermeria)