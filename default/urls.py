from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='default_page.index'),
]
