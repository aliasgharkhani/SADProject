from QA.views import QuestionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('questions', QuestionViewSet, base_name='questions')

urlpatterns = router.urls
