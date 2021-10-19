from django.contrib import admin
from .models import Personal, Permiso_Salida, Evaluacion_Laboral, Asistencia_Personal, Entrega_Proyecto

# Register your models here.
admin.site.register(Personal)
admin.site.register(Permiso_Salida)
admin.site.register(Evaluacion_Laboral)
admin.site.register(Asistencia_Personal)
admin.site.register(Entrega_Proyecto)