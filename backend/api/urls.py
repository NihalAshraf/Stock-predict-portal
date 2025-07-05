from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts.views import RegisterView

router = DefaultRouter()
router.register('register', RegisterView, basename='register')

urlpatterns = [
    path('', include(router.urls)),
]
