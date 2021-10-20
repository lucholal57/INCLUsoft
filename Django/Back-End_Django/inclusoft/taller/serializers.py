from rest_framework import serializers
from .models import (Taller, Informe_Cuatrimestral, Materiales_Taller, Ventas_Taller, Produccion_Taller, Compras_Taller, Inventario_Taller)

# Serializadores

class TallerSerializer(serializers.ModelSerializer):
    """
        Serializador de Taller
    """
    class Meta:
        model = Taller
        fields = '__all__'
        
class Informe_CuatrimestralTallerSerializer(serializers.ModelSerializer):
    """
        Serializador de informe cuatrimestral con talleres
    """
    taller = TallerSerializer(read_only=True)
    class Meta:
        model = Informe_Cuatrimestral
        fields = '__all__'
        depth = 2
        
class Informe_CuatrimestralSerializer(serializers.ModelSerializer):
    """
        Serializador de informes cuatrimestrales
    """
    class Meta:
        model = Informe_Cuatrimestral
        fields = '__all__'
        
