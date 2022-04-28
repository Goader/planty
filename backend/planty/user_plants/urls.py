from django.urls import path

from .views import UserPlantsView

urlpatterns = [
    path('', UserPlantsView.as_view(), name="UserPlants_view"),
]
