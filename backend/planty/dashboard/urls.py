from django.urls import path

from .views import PlantsView, EventsView, InstructionsView, PopularInstructionsView, \
    SelectInstructionView, ShareInstruction

urlpatterns = [
    path('plants/', PlantsView.as_view(), name='PlantsView'),
    path('events/', EventsView.as_view(), name='EventsView'),
    path('instructions/', InstructionsView.as_view(), name='InstructionsView'),
    path('instructions/<uuid:id>', InstructionsView.as_view(), name='PUT/DEL_InstructionsView'),
    path('instructions/popular/', PopularInstructionsView.as_view(), name='PopularInstructionsView'),
    path('instructions/popular/<int:limit>/', PopularInstructionsView.as_view(), name='PopularInstructionsView'),
    path('instructions/select', SelectInstruction.as_view(), name='SelectInstructionView'),
    path('instructions/share', ShareInstruction.as_view(), name='ShareInstructionView')
]
