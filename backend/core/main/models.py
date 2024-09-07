from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from .utility import generate_random_id


class PaymentRecord(models.Model):
    PAYMENT_TYPES = [
        ('utility_bill', 'Utility Bill'),
        ('other', 'Other'),
    ]
    id = models.CharField(max_length=8, primary_key=True,
                          default=generate_random_id)
    payer = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)
    amount = models.DecimalField(
        max_digits=10, decimal_places=2)
    payment_type = models.CharField(max_length=20, choices=PAYMENT_TYPES)
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.payer} - {self.amount}'


class Notification(models.Model):
    id = models.CharField(max_length=8, primary_key=True,
                          default=generate_random_id)
    shared_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    shared_to = models.ForeignKey(settings.AUTH_USER_MODEL,
                                  on_delete=models.DO_NOTHING, related_name='my_notifications')
    message = models.TextField()  # Notification message
    is_read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)  # Time of notification

    def __str__(self):
        return f'Notification for {self.user.username} - {"Read" if self.is_read else "Unread"}'


class ChatHistory(models.Model):
    id = models.CharField(max_length=8, primary_key=True,
                          default=generate_random_id)
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='received_messages', on_delete=models.CASCADE)
    message = models.TextField()  # Chat message content
    timestamp = models.DateTimeField(auto_now_add=True)  # Time of the message

    def __str__(self):
        return f'Chat from {self.sender.username} to {self.receiver.username}'


class UtilityBill(models.Model):
    BILL_TYPES = [
        ('gas', 'Gas'),
        ('electricity', 'Electricity'),
        ('internet', 'Internet'),
        ('water', 'Water'),
        ('other', 'Other'),
    ]

    BILL_STATUSES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
    ]
    id = models.CharField(max_length=8, primary_key=True,
                          default=generate_random_id)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)  # Bill owner
    bill_type = models.CharField(max_length=50, choices=BILL_TYPES)
    amount_due = models.DecimalField(
        max_digits=10, decimal_places=2)  # Bill amount
    due_date = models.DateField()  # Due date of the bill
    bill_status = models.CharField(
        max_length=20, choices=BILL_STATUSES, default='pending')  # Bill status

    def __str__(self):
        return f'{self.bill_type} - {self.amount_due} (Due: {self.due_date})'


class Event(models.Model):
    id = models.CharField(max_length=8, primary_key=True,
                          default=generate_random_id)
    posted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)  # Event title
    description = models.TextField()  # Event description
    start_time = models.DateTimeField()  # Start time of the event
    end_time = models.DateTimeField()  # End time of the event

    def __str__(self):
        return self.title


class DigitalAnnouncement(models.Model):
    id = models.CharField(max_length=8, primary_key=True,
                          default=generate_random_id)
    title = models.CharField(max_length=200)  # Title of the announcement
    content = models.TextField()  # Content of the announcement
    # User who posted the announcement
    posted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # Date and time when the announcement was posted
    posted_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
