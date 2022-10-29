from app_search import views
from django.urls import path
from .views import *


urlpatterns = [
    path('books/' , Search.as_view()),  
]