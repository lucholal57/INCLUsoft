
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from user_app.serializers import RegistroSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token


from user_app import models

# Create your views here.

@api_view(['POST'])
def LogoutView(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        data.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def RegistroView(request):

    if request.method == 'POST':
        serializer = RegistroSerializer(data=request.data)

        data = {}

        if serializer.is_valid():
            account = serializer.save()
            data['response'] = ' El registro del usuario fue exitoso'
            data['username'] = account.username
            data['email'] = account.email
            token = Token.objects.get(user=account).key
            data['token'] = token
        else:
            data = serializer.errors

        return Response(data, status=status.HTTP_200_OK)
