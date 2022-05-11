from django.urls import path

from .views import PlantsView, EventsView, MyInstructionsView

urlpatterns = [
    path('plants/', PlantsView.as_view(), name='PlantsView'),
    path('events/', EventsView.as_view(), name='EventsView'),
    path('dashboard/instructions/', MyInstructionsView.as_view(), name='MyInstructionsView')
]
