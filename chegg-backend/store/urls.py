from django.urls import include, path
from rest_framework.routers import DefaultRouter
from store.views import BookViewSet

router = DefaultRouter()
router.register('books', BookViewSet)

urlpatterns = router.urls
