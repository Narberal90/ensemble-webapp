from django import forms
from django.contrib import admin
from django.utils.html import format_html
from tinymce.widgets import TinyMCE

from .models import Post, Image


class PostAdminForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ["description", "video", "image"]
        widgets = {
            "description": TinyMCE(attrs={"cols": 80, "rows": 30}),
        }


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    form = PostAdminForm
    list_display = ("video", "description", "image")
    search_fields = ("description", "video")


class ImageAdmin(admin.ModelAdmin):
    list_display = (
        "image_thumbnail",
        "full_image_url",
    )

    def image_thumbnail(self, obj):
        return format_html(
            '<img src="{}" width="100" height="100"/>', obj.full_image_url
        )

    image_thumbnail.short_description = "Image"


admin.site.register(Image, ImageAdmin)
