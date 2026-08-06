from rest_framework import serializers
from apps.categories.models import Category
from .models import Budget


class BudgetSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    class Meta:
        model = Budget
        fields = [
            "id", "owner", "category", "category_name",
            "limit", "month", "created_at", "updated_at",
        ]
        read_only_fields = [
            "id", "owner", "category_name", "created_at", "updated_at",
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            self.fields['category'].queryset = Category.objects.filter(owner=request.user)