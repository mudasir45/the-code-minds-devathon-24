from accounts.models import User
from django.contrib.auth import authenticate
from django.core.cache import cache
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import SignUpSerializer
from .utils import generate_otp, send_otp_email, store_otp_in_cache


class SignUpAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            otp = generate_otp()
            send_otp_email(user.email, otp)
            store_otp_in_cache(user.email, otp, 60)

            return Response({
                'message': 'OTP sent to your email. Please verify within 30 seconds.',
                'user_id': user.id
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=400)

        user = authenticate(email=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)

            response = Response({
                'message': 'Login successful'
            })

            response.set_cookie(
                key='access_token',
                value=str(refresh.access_token),
                httponly=True,
                secure=True,
                samesite='Strict'
            )
            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite='Strict'
            )

            return response

        return Response({'error': 'Invalid credentials'}, status=400)


class OTPVerificationAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        otp_provided = request.data.get('otp')

        user = get_object_or_404(User, id=user_id)
        cached_otp = cache.get(f'otp_{user.email}')

        if cached_otp is None:
            return Response({'error': 'OTP expired. Please request a new one.'}, status=status.HTTP_400_BAD_REQUEST)

        if cached_otp != otp_provided:
            return Response({'error': 'Invalid OTP. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)

        user.email_verified = True
        user.save()

        refresh = RefreshToken.for_user(user)
        response = Response({
            'message': 'SignUp Successful'
        }, status=status.HTTP_200_OK)

        response.set_cookie(
            key='access_token',
            value=str(refresh.access_token),
            httponly=True,
                secure=True,
            samesite='Strict'
        )
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
                secure=True,
            samesite='Strict'
        )
        return response

class LogoutAPIView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response({
            'message': 'Logout successful'
        }, status=status.HTTP_200_OK)
        
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        
        return response


class SendOTPAgainAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        user = get_object_or_404(User, id=user_id)

        otp = generate_otp()
        send_otp_email(user.email, otp)
        store_otp_in_cache(user.email, otp, 60)

        return Response({'message': 'New OTP sent to your email. Please verify within 30 seconds.'}, status=status.HTTP_200_OK)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    