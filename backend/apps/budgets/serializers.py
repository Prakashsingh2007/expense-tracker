from rest_framework import serializers
from .models import Budget


class BudgetSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    class Meta:
        model = Budget
        fields = [
            "id",
            "owner",
            "category",
            "category_name",
            "limit",
            "month",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "owner",
            "category_name",
            "created_at",
            "updated_at",
        ]