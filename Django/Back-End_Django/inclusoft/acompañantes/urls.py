from django.urls import path
from acompañantes.views import AcompañanteListado,AcompañanteBuscarPorId,BusquedaAlumno, BusquedaPersonal

urlpatterns = [
    #Rutas para Acompañantes
    path('acompañante', AcompañanteListado),
    path('acompañante/<int:pk>', AcompañanteBuscarPorId),
    path('acompañante/buscar/alumno/<str:nombre_alumno>', BusquedaAlumno),
    path('acompañante/buscar/personal/<str:nombre_personal>', BusquedaPersonal)
]