from django.contrib import admin
from .models import  Taller, Informe_Cuatrimestral, Materiales_Taller, Ventas_Taller, Produccion_Taller, Compras_Taller, Inventario_Taller  

# Register your models here.
admin.site.register(Taller)
admin.site.register(Informe_Cuatrimestral)
admin.site.register(Materiales_Taller)
admin.site.register(Ventas_Taller)
admin.site.register(Produccion_Taller)
admin.site.register(Compras_Taller)
admin.site.register(Inventario_Taller)

