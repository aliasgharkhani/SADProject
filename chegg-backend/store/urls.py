from django.urls import include, path
from rest_framework.routers import DefaultRouter
from store.views import BookViewSet, ChapterViewSet

router = DefaultRouter()
router.register('books', BookViewSet)
router.register('chapters', ChapterViewSet)

urlpatterns = router.urls
