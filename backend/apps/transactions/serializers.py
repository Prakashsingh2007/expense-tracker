from rest_framework import serializers
from apps.categories.models import Category
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Transaction
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            self.fields['category'].queryset = Category.objects.filter(owner=request.user)