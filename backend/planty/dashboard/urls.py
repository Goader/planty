from django.urls import path

from .views import (
    PlantsView,
    PlantView,
    InstructionsView,
    InstructionView,
    PopularInstructionsView,
    ShareInstructionView,
    EventsView,
    CustomEventsView
)

urlpatterns = [
    path('plants/<uuid:id>', PlantView.as_view(), name='PlantView'),
    path('plants/', PlantsView.as_view(), name='PlantsView'),
    path('events/', EventsView.as_view(), name='EventsView'),
    path('events/custom/', CustomEventsView.as_view(), name='CustomEventsView'),
    path('instructions/', InstructionsView.as_view(), name='InstructionsView'),
    path('instructions/<uuid:id>/', InstructionView.as_view(), name='InstructionView'),
    path('instructions/popular/', PopularInstructionsView.as_view(), name='PopularInstructionsView'),
    path('instructions/<uuid:id>/share/', ShareInstructionView.as_view(), name='ShareInstructionView')
]
