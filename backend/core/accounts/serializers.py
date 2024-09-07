from rest_framework import serializers

from .models import User


class SignUpSerializer(serializers.Serializer):
    first_name = serializers.CharField(write_only=True, max_length=255)
    house_number = serializers.CharField(write_only=True, max_length=255)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True, min_length=4)

    def validate_email(self, email):
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already exists")
        return email
