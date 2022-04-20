from django.urls import path
from .views import DefaultInstructionsApiView

urlpatterns = [
    path('default_instructions/', DefaultInstructionsApiView.as_view()),
]
