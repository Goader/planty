from django.urls import path

from .views import (
    PlantsView,
    EventsView,
    InstructionsView,
    InstructionView,
    PopularInstructionsView,
    ShareInstructionView
)

urlpatterns = [
    path('plants/', PlantsView.as_view(), name='PlantsView'),
    path('events/', EventsView.as_view(), name='EventsView'),
    path('instructions/', InstructionsView.as_view(), name='InstructionsView'),
    path('instructions/<uuid:id>/', InstructionView.as_view(), name='InstructionView'),
    path('instructions/popular/', PopularInstructionsView.as_view(), name='PopularInstructionsView'),
    path('instructions/<uuid:id>/share/', ShareInstructionView.as_view(), name='ShareInstructionView')
]
