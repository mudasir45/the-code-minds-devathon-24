from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    
    house_number = models.CharField(max_length=10, null=True, blank=True)
    email_verified = models.BooleanField(default=False)
    email = models.EmailField(unique=True)
    
    ADMIN = 'admin'
    SUPPORT_TEAM = 'support_team'
    RESIDENT = 'resident'
    ROLE_CHOICES = [
        (SUPPORT_TEAM, 'support_team'),
        (RESIDENT, 'resident'),
        (ADMIN, 'admin'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=RESIDENT)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

