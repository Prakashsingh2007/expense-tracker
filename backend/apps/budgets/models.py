from django.db import models
from django.conf import settings

# Create your models here.
class Budget(models.Model):
    owner = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name='budgets'
)
    category = models.ForeignKey('categories.Category', on_delete=models.CASCADE, related_name='budgets')
    limit = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        unique_together = ('owner', 'category', 'month')
        ordering = ['-month']

    def __str__(self):
        return f"{self.owner.username} - {self.category.name} - {self.month}"