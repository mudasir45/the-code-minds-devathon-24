from django.urls import path

from .views import *

urlpatterns = [
    path('signup/', SignUpAPIView.as_view(), name="signup"),
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('verify-otp/', OTPVerificationAPIView.as_view(), name='verify-otp'),
    path('send-otp-again/', SendOTPAgainAPIView.as_view(), name='send-otp-again'),
    
    
    path('test-permissions', AdminOrSupportTeamView.as_view(), name="admin-team"),
]
