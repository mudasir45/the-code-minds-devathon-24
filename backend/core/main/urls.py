from django.urls import path
from .views import (PaymentRecordListCreateView, PaymentRecordDetailView,
                    NotificationListCreateView, NotificationDetailView,
                    ChatHistoryListCreateView, ChatHistoryDetailView,
                    UtilityBillListCreateView, UtilityBillDetailView,
                    EventListCreateView, EventDetailView,
                    DigitalAnnouncementListCreateView, DigitalAnnouncementDetailView)


urlpatterns = [
    path('paymentrecords/', PaymentRecordListCreateView.as_view(),
         name='paymentrecord-list-create'),
    path('paymentrecords/<str:pk>/', PaymentRecordDetailView.as_view(),
         name='paymentrecord-detail'),

    path('notifications/', NotificationListCreateView.as_view(),
         name='notification-list-create'),
    path('notifications/<str:pk>/', NotificationDetailView.as_view(),
         name='notification-detail'),

    path('chathistory/', ChatHistoryListCreateView.as_view(),
         name='chathistory-list-create'),
    path('chathistory/<str:pk>/', ChatHistoryDetailView.as_view(),
         name='chathistory-detail'),

    path('utilitybills/', UtilityBillListCreateView.as_view(),
         name='utilitybill-list-create'),
    path('utilitybills/<str:pk>/', UtilityBillDetailView.as_view(),
         name='utilitybill-detail'),

    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('events/<str:pk>/', EventDetailView.as_view(), name='event-detail'),

    path('digitalannouncements/', DigitalAnnouncementListCreateView.as_view(),
         name='digitalannouncement-list-create'),
    path('digitalannouncements/<str:pk>/',
         DigitalAnnouncementDetailView.as_view(), name='digitalannouncement-detail'),
]
