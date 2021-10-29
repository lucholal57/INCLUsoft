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
        
class Materiales_TallerTallerSerializer(serializers.ModelSerializer):
    """
        Serializador de materiales con el taller en conjuntoi por eso figuran dos veces la palabra traller
    """
    taller = TallerSerializer(read_only=True)
    class Meta:
        model = Materiales_Taller
        fields = '__all__'
        depth = 2
        
class Materiales_TallerSerializer(serializers.ModelSerializer):
    """
        Serializer de material del taller
    """
    class Meta:
        model = Materiales_Taller
        fields = '__all__'
        
class Ventas_TallerTallerSerializer(serializers.ModelSerializer):
    """
        Serializador de ventas taller con taller por eso el nombre repetido
    """
    taller = TallerSerializer(read_only=True)
    class Meta:
        model = Ventas_Taller
        fields = '__all__'
        depth = 2
        
class Ventas_TallerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas_Taller
        fields = '__all__'
        
class Produccion_TallerTallererSerializer(serializers.ModelSerializer):
    """
        Serializador de producccion taller con taller
    """
    taller = TallerSerializer(read_only=True)
    class Meta:
        model = Produccion_Taller
        fields = '__all__'
        depth = 2
        
class Produccion_TallerSerializer(serializers.ModelSerializer):
    """
        Serializador produccion taller
    """
    class Meta:
        model = Produccion_Taller
        fields = '__all__'
        
class Compras_TallerTallerSerializer(serializers.ModelSerializer):
    """
        Serializador de compras taller con taller
    """
    taller = TallerSerializer(read_only=True)
    class Meta:
        model = Compras_Taller
        fields = '__all__'
        depth = 2
        
class Compras_TallerSerializer(serializers.ModelSerializer):
    """
        Serializador de compras taller
    """
    class Meta:
        model = Compras_Taller
        fields = '__all__'
        
class Inventario_TallerTallerSerializer(serializers.ModelSerializer):
    """
        Serializador de inventario taller con taller
    """
    taller = TallerSerializer(read_only=True)
    class Meta:
        model = Inventario_Taller
        fields = '__all__'
        depth = 2
        
class Inventario_TallerSerializer(serializers.ModelSerializer):
    """
        Serilizador de inventario taller
    """
    class Meta:
        model = Inventario_Taller
        fields = '__all__'
        
    