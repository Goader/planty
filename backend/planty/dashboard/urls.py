from django.urls import path

from .views import PlantsView, EventsView, PlantView, CustomEventsView

urlpatterns = [
    path('plants/<uuid:id>', PlantView.as_view(), name='PlantView'),
    path('plants/', PlantsView.as_view(), name='PlantsView'),
    path('events/', EventsView.as_view(), name='EventsView'),
    path('events/custom/', CustomEventsView.as_view(), name='CustomEventsView')
]
