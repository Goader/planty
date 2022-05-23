from django.urls import path

from .views import PlantsView, EventsView, CustomEventsView

urlpatterns = [
    path('plants/', PlantsView.as_view(), name='PlantsView'),
    path('events/', EventsView.as_view(), name='EventsView'),
    path('events/custom/', CustomEventsView.as_view(), name='CustomEventsView')
]
