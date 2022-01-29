from django.contrib import admin
from .models import Socio,Libro,PrestamoLibro,DevolucionLibro

# Register your models here.
admin.site.register(Socio)
admin.site.register(PrestamoLibro)
admin.site.register(DevolucionLibro)
admin.site.register(Libro)
