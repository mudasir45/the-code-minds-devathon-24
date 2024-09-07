from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import PaymentRecord, Notification, ChatHistory, UtilityBill, Event, DigitalAnnouncement
from .serializers import (PaymentRecordSerializer, NotificationSerializer, ChatHistorySerializer,
                          UtilityBillSerializer, EventSerializer, DigitalAnnouncementSerializer)

# PaymentRecord Views


class PaymentRecordListCreateView(APIView):
    def get(self, request):
        records = PaymentRecord.objects.all()
        serializer = PaymentRecordSerializer(records, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PaymentRecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PaymentRecordDetailView(APIView):
    def get(self, request, pk):
        record = get_object_or_404(PaymentRecord, pk=pk)
        serializer = PaymentRecordSerializer(record)
        return Response(serializer.data)

    def put(self, request, pk):
        record = get_object_or_404(PaymentRecord, pk=pk)
        serializer = PaymentRecordSerializer(record, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        record = get_object_or_404(PaymentRecord, pk=pk)
        record.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Notification Views


class NotificationListCreateView(APIView):
    def get(self, request):
        notifications = Notification.objects.all()
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NotificationDetailView(APIView):
    def get(self, request, pk):
        notification = get_object_or_404(Notification, pk=pk)
        serializer = NotificationSerializer(notification)
        return Response(serializer.data)

    def put(self, request, pk):
        notification = get_object_or_404(Notification, pk=pk)
        serializer = NotificationSerializer(notification, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        notification = get_object_or_404(Notification, pk=pk)
        notification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ChatHistory Views


class ChatHistoryListCreateView(APIView):
    def get(self, request):
        chat_history = ChatHistory.objects.all()
        serializer = ChatHistorySerializer(chat_history, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ChatHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatHistoryDetailView(APIView):
    def get(self, request, pk):
        chat = get_object_or_404(ChatHistory, pk=pk)
        serializer = ChatHistorySerializer(chat)
        return Response(serializer.data)

    def put(self, request, pk):
        chat = get_object_or_404(ChatHistory, pk=pk)
        serializer = ChatHistorySerializer(chat, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        chat = get_object_or_404(ChatHistory, pk=pk)
        chat.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# UtilityBill Views


class UtilityBillListCreateView(APIView):
    def get(self, request):
        bills = UtilityBill.objects.all()
        serializer = UtilityBillSerializer(bills, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UtilityBillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UtilityBillDetailView(APIView):
    def get(self, request, pk):
        bill = get_object_or_404(UtilityBill, pk=pk)
        serializer = UtilityBillSerializer(bill)
        return Response(serializer.data)

    def put(self, request, pk):
        bill = get_object_or_404(UtilityBill, pk=pk)
        serializer = UtilityBillSerializer(bill, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        bill = get_object_or_404(UtilityBill, pk=pk)
        bill.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Event Views


class EventListCreateView(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventDetailView(APIView):
    def get(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def put(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# DigitalAnnouncement Views


class DigitalAnnouncementListCreateView(APIView):
    def get(self, request):
        announcements = DigitalAnnouncement.objects.all()
        serializer = DigitalAnnouncementSerializer(announcements, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DigitalAnnouncementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DigitalAnnouncementDetailView(APIView):
    def get(self, request, pk):
        announcement = get_object_or_404(DigitalAnnouncement, pk=pk)
        serializer = DigitalAnnouncementSerializer(announcement)
        return Response(serializer.data)

    def put(self, request, pk):
        announcement = get_object_or_404(DigitalAnnouncement, pk=pk)
        serializer = DigitalAnnouncementSerializer(
            announcement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        announcement = get_object_or_404(DigitalAnnouncement, pk=pk)
        announcement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
