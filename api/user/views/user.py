from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from user.serializers.user import CustomUserSerializer, ChangePasswordSerializer
from user.middleware.user import is_authenticated
# from asgiref.sync import sync_to_async


@api_view(['GET'])
@is_authenticated
def loggedUser(request):
    serializer = CustomUserSerializer(request.user, many=False)
    response = {'data': serializer.data}
    return Response(response)

@api_view(['GET', 'POST'])
def userEntry(request):
    if request.method == 'POST':
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    serializer = CustomUserSerializer()
    response = {'data': serializer.data}
    return Response(response)


@api_view(['GET', 'POST'])
def userUpdate(request, pk):
    '''Password is required User should give the same password stored in db'''
    user = User.objects.get(public_id=pk)
    if request.method == 'POST':
        serializer = CustomUserSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            response = {'data': serializer.data}
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    serializer = CustomUserSerializer(user)
    response = {'data': serializer.data}
    return Response(response)

@api_view(['POST'])
def resetPassword(request, pk):
    '''Resetting Password'''
    user = User.objects.get(public_id=pk)
    user.set_password('password123')
    user.save()
    return Response("Password Reset Complete")


@api_view(['POST'])
def passwordUpdate(request, pk):
    '''To Update Password but requires User to give the same password stored in db'''
    user = User.objects.get(public_id=pk)
    serializer = ChangePasswordSerializer(instance=user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        response = {'data': serializer.data}
        return Response(response)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
