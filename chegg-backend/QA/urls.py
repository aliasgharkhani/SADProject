from QA.views import QuestionViewSet, TagListAPIView
from django.urls import path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('questions', QuestionViewSet, base_name='questions')

urlpatterns = [
    path('tags/', TagListAPIView.as_view(), name='tags')
]

urlpatterns += router.urls
