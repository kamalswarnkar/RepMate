from django.urls import path
from .views import GoalListView

urlpatterns = [
    path('', GoalListView.as_view()),
]