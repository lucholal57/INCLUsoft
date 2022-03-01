
from django.urls import path
from cooperadora.views import  CooperadoraView,CooperadoraEditar

urlpatterns = [
    #Ruta Cooperadora
    path('cooperadora', CooperadoraView),
    path('cooperadora/<int:pk>', CooperadoraEditar),
]