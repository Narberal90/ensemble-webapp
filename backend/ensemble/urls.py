from django.urls import path, include
from rest_framework import routers

from ensemble.views import PostViewSet, image_gallery

router = routers.DefaultRouter()
router.register("posts", PostViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("images/", image_gallery, name="image-gallery"),
]

app_name = "ensemble"
