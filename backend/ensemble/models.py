import cloudinary
from cloudinary.models import CloudinaryField
from cloudinary.utils import cloudinary_url
from django.db import models
from tinymce.models import HTMLField


class ImageMixin:
    @property
    def full_image_url(self):
        if hasattr(self, "image") and self.image:
            url, options = cloudinary_url(self.image.public_id)
            return url
        return None


class Post(ImageMixin, models.Model):
    description = HTMLField("Description", null=True, max_length=700)
    video = models.URLField(max_length=500, null=True, blank=True)
    image = CloudinaryField("image", null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.pk:
            old_image = Post.objects.filter(pk=self.pk).first().image
            if old_image and old_image != self.image:
                cloudinary.uploader.destroy(old_image.public_id)
            if self.image is None and old_image:
                cloudinary.uploader.destroy(old_image.public_id)

        super().save(*args, **kwargs)


class Image(ImageMixin, models.Model):
    image = CloudinaryField("image")

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return f"Image {self.id})"

    def save(self, *args, **kwargs):
        if self.pk:
            old_image = Image.objects.filter(pk=self.pk).first().image
            if old_image and old_image != self.image:
                cloudinary.uploader.destroy(old_image.public_id)
        super().save(*args, **kwargs)
