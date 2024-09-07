from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from .models import User


class SignUpSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(write_only=True, max_length=255)
    last_name = serializers.CharField(write_only=True, max_length=255)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True, min_length=4)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'house_number', 'password']

    def validate_email(self, email):
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already exists")
        return email

    def create(self, validated_data):
        user = User(
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('first_name'),
            email=validated_data.get('email'),
        )
        user.set_password(validated_data.get('password'))
        user.save()
        return user

