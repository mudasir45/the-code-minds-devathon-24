import random
import string

from django.conf import settings
from django.core.cache import cache
from django.core.mail import send_mail


def generate_otp(length=4):
    """Generate a 4-digit OTP"""
    return ''.join(random.choices(string.digits, k=length))


def send_otp_email(email, otp):
    """Send OTP to the user's email"""
    subject = "Your OTP Code"
    message = f"Your OTP code is {otp}. It is valid for 60 seconds."
    email_from = settings.DEFAULT_FROM_EMAIL
    send_mail(subject, message, email_from, [email])


def store_otp_in_cache(email, otp, timeout):
    """Store OTP in cache with a 30-second expiry"""
    cache.set(f'otp_{email}', otp, timeout)