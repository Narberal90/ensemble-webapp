import cloudinary
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

from ensemble.models import Post, Image


@receiver(post_delete)
def delete_cloudinary_image(sender, instance, **kwargs):
    if isinstance(instance, (Post, Image)) and instance.image:
        cloudinary.uploader.destroy(instance.image.public_id)


@receiver(pre_save, sender=Image)
def delete_old_image(sender, instance, **kwargs):
    if instance.pk:
        old_image = Image.objects.filter(pk=instance.pk).first().image
        old_image_public_id = old_image.public_id if old_image else None
        new_image_public_id = instance.image.public_id if instance.image else None

        print("Old image public_id:", old_image_public_id)
        print("New image public_id:", new_image_public_id)

        if old_image_public_id and old_image_public_id != new_image_public_id:
            cloudinary.uploader.destroy(old_image_public_id)