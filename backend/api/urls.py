from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts.views import RegisterView
from accounts.views import ProtectedView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
router = DefaultRouter()
router.register('register', RegisterView, basename='register')


urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected-view/', ProtectedView.as_view()),
    
]
