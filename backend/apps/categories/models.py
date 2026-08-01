from django.db import models

# Create your models here.
class Category(models.Model):
    owner = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=100, blank=True)
    color = models.CharField(max_length=7, blank=True)  # Hex color code
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ('owner', 'name')  # Ensure unique category names per user
        ordering = ['name']  # Default ordering by name

    def __str__(self):
        return self.name
