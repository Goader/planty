from django.urls import path

from .views import PlantsView, EventsView, InstructionsView, SelectInstructionView, ShareInstruction

urlpatterns = [
    path('plants/', PlantsView.as_view(), name='PlantsView'),
    path('events/', EventsView.as_view(), name='EventsView'),
    path('instructions/', InstructionsView.as_view(), name='InstructionsView'),
    path('instructions/select', SelectInstruction.as_view(), name='SelectInstructionView'),
    path('instructions/share', ShareInstruction.as_view(), name='ShareInstructionView')
]
