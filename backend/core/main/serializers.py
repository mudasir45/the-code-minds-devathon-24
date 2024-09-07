from rest_framework import serializers
from .models import PaymentRecord, Notification, ChatHistory, UtilityBill, Event, DigitalAnnouncement


class PaymentRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentRecord
        fields = ['id', 'payer', 'amount', 'payment_type', 'payment_date']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'shared_by', 'shared_to',
                  'message', 'is_read', 'timestamp']


class ChatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHistory
        fields = ['id', 'sender', 'receiver', 'message', 'timestamp']


class UtilityBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = UtilityBill
        fields = ['id', 'user', 'bill_type',
                  'amount_due', 'due_date', 'bill_status']


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'posted_by', 'title',
                  'description', 'start_time', 'end_time']


class DigitalAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = DigitalAnnouncement
        fields = ['id', 'title', 'content', 'posted_by', 'posted_date']
