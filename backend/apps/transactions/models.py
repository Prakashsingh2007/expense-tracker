from django.db import models
from apps.categories.models import Category
class Transaction(models.Model):
    owner = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='transactions')
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=10, choices=[('income', 'Income'), ('expense', 'Expense')])
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='transactions')
    note = models.TextField(blank=True, null=True)
    transaction_date = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.owner.email} - {self.amount} - {self.transaction_date}"
# Create your models here.
