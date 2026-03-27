from django.urls import path
from .views import QuestionnaireSubmitView

urlpatterns = [
    path('submit/', QuestionnaireSubmitView.as_view()),
]