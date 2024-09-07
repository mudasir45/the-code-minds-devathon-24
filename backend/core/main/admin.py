from django.contrib import admin
from .models import PaymentRecord, Notification, ChatHistory, UtilityBill, Event, DigitalAnnouncement


class PaymentRecordAdmin(admin.ModelAdmin):
    list_display = ('id', 'payer', 'amount', 'payment_type', 'payment_date')
    search_fields = ('payer__username', 'amount', 'payment_type')


class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'shared_by', 'shared_to',
                    'message', 'is_read', 'timestamp')
    search_fields = ('shared_by__username', 'shared_to__username', 'message')


class ChatHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender', 'receiver', 'message', 'timestamp')
    search_fields = ('sender__username', 'receiver__username', 'message')


class UtilityBillAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'bill_type', 'amount_due', 'due_date')
    search_fields = ('user__username', 'bill_type', 'amount_due')


class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'posted_by', 'title',
                    'description', 'start_time', 'end_time')
    search_fields = ('posted_by__username', 'title', 'description')


class DigitalAnnouncementAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'content', 'posted_by', 'posted_date')
    search_fields = ('title', 'content', 'posted_by__username')


# Register the models with the custom admin classes
admin.site.register(PaymentRecord, PaymentRecordAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(ChatHistory, ChatHistoryAdmin)
admin.site.register(UtilityBill, UtilityBillAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(DigitalAnnouncement, DigitalAnnouncementAdmin)
