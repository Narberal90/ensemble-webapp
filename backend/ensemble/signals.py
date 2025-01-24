import cloudinary
from django.db.models.signals import post_delete
from django.dispatch import receiver

from ensemble.models import Post, Image


@receiver(post_delete)
def delete_cloudinary_image(sender, instance, **kwargs):
    if isinstance(instance, (Post, Image)) and instance.image:
        cloudinary.uploader.destroy(instance.image.public_id)
