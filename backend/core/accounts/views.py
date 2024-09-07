import uuid

from accounts.models import User
from django.contrib.auth import authenticate
from django.core.cache import cache
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .permissions import IsAdminOrSupportTeam
from .serializers import SignUpSerializer
from .utils import generate_otp, send_otp_email, store_otp_in_cache


class SignUpAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            # Temporarily store user details in cache with a token
            token = str(uuid.uuid4())  # Generate a unique token
            cache.set(token, serializer.validated_data,
                      timeout=300)  # Store for 5 minutes

            # Generate OTP and send it
            otp = generate_otp()
            send_otp_email(serializer.validated_data['email'], otp)
            store_otp_in_cache(serializer.validated_data['email'], otp, 300)

            return Response({
                'message': 'OTP sent to your email. Please verify within 5 minutes.',
                'token': token  # Return token to associate with OTP verification
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(email=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)

            return Response({
                'message': 'Login successful',
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


class OTPVerificationAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        token = request.data.get('token')
        otp_provided = request.data.get('otp')

        # Retrieve cached signup data using the token
        signup_data = cache.get(token)
        if signup_data is None:
            return Response({'error': 'Invalid or expired token. Please sign up again.'}, status=status.HTTP_400_BAD_REQUEST)

        email = signup_data['email']
        cached_otp = cache.get(f'otp_{email}')
        if cached_otp is None:
            return Response({'error': 'OTP expired. Please request a new one.'}, status=status.HTTP_400_BAD_REQUEST)

        if cached_otp != otp_provided:
            return Response({'error': 'Invalid OTP. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)

        # If OTP is correct, create the user
        user = User(
            first_name=signup_data['first_name'],
            house_number=signup_data['house_number'],
            email=signup_data['email'],
        )
        user.set_password(signup_data['password'])
        user.save()

        user.email_verified = True
        user.save()

        cache.delete(f'otp_{email}')
        cache.delete(token)

        refresh = RefreshToken.for_user(user)
        response = Response({
            'message': 'SignUp Successful',
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
        }, status=status.HTTP_200_OK)

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
        token = request.data.get('token')

        # Check if signup data is still cached
        signup_data = cache.get(token)
        if signup_data is None:
            return Response({'error': 'Invalid or expired token. Please sign up again.'}, status=status.HTTP_400_BAD_REQUEST)

        # Resend OTP
        otp = generate_otp()
        send_otp_email(signup_data['email'], otp)
        store_otp_in_cache(signup_data['email'], otp, 300)

        return Response({
            'message': 'New OTP sent to your email. Please verify within 5 minutes.'
        }, status=status.HTTP_200_OK)


class AdminOrSupportTeamView(APIView):
    permission_classes = [IsAdminOrSupportTeam, IsAuthenticated]

    def get(self, request):
        return Response({"message": "Welcome Admin or Support Team!"})
