from django.urls import path

from .views import PlantsView

urlpatterns = [
    path('plants/', PlantsView.as_view(), name="PlantsView"),
]
