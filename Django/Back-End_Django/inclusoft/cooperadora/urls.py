
from django.urls import path
from cooperadora.views import  CooperadoraView,CooperadoraEditar,CooperadoraAgregarDinero

urlpatterns = [
    #Ruta Cooperadora
    path('cooperadora', CooperadoraView),
    path('cooperadora/<int:pk>', CooperadoraEditar),
    path('cooperadora/agregar/<int:pk>', CooperadoraAgregarDinero),
    
]