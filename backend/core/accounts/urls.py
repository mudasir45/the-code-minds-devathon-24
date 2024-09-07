from django.urls import path

from .views import (LoginView, OTPVerificationAPIView, SendOTPAgainAPIView,
                    SignUpAPIView)

urlpatterns = [
    path('signup/', SignUpAPIView.as_view(), name="signup"),
    path('login/', LoginView.as_view(), name="login"),
    path('verify-otp/', OTPVerificationAPIView.as_view(), name='verify-otp'),
    path('send-otp/', SendOTPAgainAPIView.as_view(), name='send-otp'),
]