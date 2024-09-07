from django.urls import path
from .views import (PaymentRecordListCreateView, PaymentRecordDetailView,
                    NotificationListCreateView, NotificationDetailView,
                    ChatHistoryListCreateView, ChatHistoryDetailView,
                    UtilityBillListCreateView, UtilityBillDetailView,
                    EventListCreateView, EventDetailView,
                    DigitalAnnouncementListCreateView, DigitalAnnouncementDetailView)


urlpatterns = [
    path('payments/', PaymentRecordListCreateView.as_view(),
         name='paymentrecord-list-create'),
    path('payments/<str:pk>/', PaymentRecordDetailView.as_view(),
         name='paymentrecord-detail'),

    path('notifications/', NotificationListCreateView.as_view(),
         name='notification-list-create'),
    path('notifications/<str:pk>/', NotificationDetailView.as_view(),
         name='notification-detail'),

    path('chathistory/', ChatHistoryListCreateView.as_view(),
         name='chathistory-list-create'),
    path('chathistory/<str:pk>/', ChatHistoryDetailView.as_view(),
         name='chathistory-detail'),

    path('bills/', UtilityBillListCreateView.as_view(),
         name='bill-list-create'),
    path('utilitybills/<str:pk>/', UtilityBillDetailView.as_view(),
         name='utilitybill-detail'),

    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('events/<str:pk>/', EventDetailView.as_view(), name='event-detail'),

    path('announcements/', DigitalAnnouncementListCreateView.as_view(),
         name='digitalannouncement-list-create'),
    path('announcements/<str:pk>/',
         DigitalAnnouncementDetailView.as_view(), name='digitalannouncement-detail'),
]
