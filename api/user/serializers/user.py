from rest_framework import serializers 
from django.contrib.auth.models import User
import django.contrib.auth.password_validation as validators
from django.core import exceptions

class CustomUserSerializer(serializers.ModelSerializer):
    '''Serializers for User'''
    class Meta:
        model = User
        fields = '__all__'

    def validate(self, data):
         # here data has all the fields which have validated values
         # so we can create a User instance out of it
         user = User(**data)

         # get the password from the data
         password = data.get('password')

         errors = dict() 
         try:
             # validate the password and catch the exception
             validators.validate_password(password=password, user=User)

         # the exception raised here is different than serializers.ValidationError
         except exceptions.ValidationError as e:
             errors['password'] = list(e.messages)

         if errors:
             raise serializers.ValidationError(errors)

         return super(CustomUserSerializer, self).validate(data)


    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        if instance.check_password(validated_data['password']):
           super().update(instance, validated_data)
           instance.set_password(validated_data['password'])
           instance.save()
           return instance
        raise serializers.ValidationError({'password':"password doesn't match"})

class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password', 'password2')

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

             # get the password from the data
        password = data.get('password')

        errors = dict() 
        try:
             # validate the password and catch the exception
             validators.validate_password(password=password, user=User)

         # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
             errors['password'] = list(e.messages)

        if errors:
             raise serializers.ValidationError(errors)

        return super(ChangePasswordSerializer, self).validate(data)
