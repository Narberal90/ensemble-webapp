from rest_framework import serializers

from ensemble.models import Post, Image


class ImageUrlSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        fields = ["image_url"]

    def get_image_url(self, obj):
        return obj.full_image_url


class PostSerializer(ImageUrlSerializer):
    class Meta:
        model = Post
        fields = ["description", "video", "image_url"]


class ImageSerializer(ImageUrlSerializer):
    class Meta:
        model = Image
        fields = ["id", "image_url"]
