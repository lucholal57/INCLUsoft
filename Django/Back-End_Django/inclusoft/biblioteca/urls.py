from django.urls import path
from .views import (SocioListado, SocioBuscarPorId,BusquedaSocio,LibroListado,LibroBuscarPorId,BusquedaLibro,PrestamoListado,PrestamoBuscarPorId,BusquedaSocioPrestamo,DevolucionListado,DevolucionBuscarPorId,BusquedaLibroId)

urlpatterns = [
    #Rutas para socios
    path('socio', SocioListado),
    path('socio/<int:pk>',SocioBuscarPorId),
    path('socio/buscar/<str:nombre_alumno>',BusquedaSocio),
    #Rutas Libro
    path('libro',LibroListado),
    path('libro/<int:pk>',LibroBuscarPorId),
    path('libro/<int:pk>',LibroBuscarPorId),
    path('libro_prestado/<int:pk>',BusquedaLibroId),
    #Rutas PRestamos
    path('prestamo',PrestamoListado),
    path('prestamo/<int:pk>',PrestamoBuscarPorId),
    path('prestamo/buscar/<str:nombre_alumno>',BusquedaSocioPrestamo),
    #Rutas devolucion
    path('devolucion',DevolucionListado),
    path('devolucion/<int:pk>',DevolucionBuscarPorId),
    
    
]