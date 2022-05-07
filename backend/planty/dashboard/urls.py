from django.urls import path

from .views import PlantsView, EventsView, MyInstructionsView

urlpatterns = [
    path('plants/', PlantsView.as_view(), name='PlantsView'),
    path('events/', EventsView.as_view(), name='EventsView'),
    path('my_instructions/', MyInstructionsView.as_view(), name='MyInstructionsView')
]
