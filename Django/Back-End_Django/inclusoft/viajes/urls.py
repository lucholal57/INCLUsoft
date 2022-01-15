from django.urls import path
from viajes.views import ViajeListado, ViajeBuscarPorId,BuscarViajePorDestino
from . import views

urlpatterns = [
    #Rutas para viajes
    path('viajes', ViajeListado),
    path('viajes/<int:pk>', ViajeBuscarPorId),
    path('viajes/buscar/<str:destino>', BuscarViajePorDestino)
]