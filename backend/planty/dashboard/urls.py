from django.urls import path

from .views import PlantsView, EventsView, MyInstructionsView, SuggestedInstructionsView

urlpatterns = [
    path('plants/', PlantsView.as_view(), name='PlantsView'),
    path('events/', EventsView.as_view(), name='EventsView'),
    path('dashboard/instructions/', MyInstructionsView.as_view(), name='MyInstructionsView'),
    path('dashboard/instructions/seggested', SuggestedInstructionsView.as_view(), name='SuggestedInstructionsView'),
    path('dashboard/instructions/select', SuggestedInstructionsView.as_view(), name='SuggestedInstructionsView')
]
