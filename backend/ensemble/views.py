from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ensemble.models import Post, Image
from ensemble.pagination import CustomPagination
from ensemble.serializers import PostSerializer, ImageSerializer


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.order_by('-id')
    pagination_class = CustomPagination


@api_view(['GET'])
def image_gallery(request):
    images = Image.objects.all()
    serializer = ImageSerializer(images, many=True)
    return Response({'images': serializer.data})