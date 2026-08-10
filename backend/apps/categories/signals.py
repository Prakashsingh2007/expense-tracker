from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.accounts.models import User
from apps.categories.models import Category


DEFAULT_CATEGORIES = [
    {
        "name": "Salary",
        "color": "#10B981",
    },
    {
        "name": "Freelancing",
        "color": "#3B82F6",
    },
    {
        "name": "Investment",
        "color": "#8B5CF6",
    },
    {
        "name": "Food",
        "color": "#F97316",
    },
    {
        "name": "Transport",
        "color": "#06B6D4",
    },
    {
        "name": "Shopping",
        "color": "#EC4899",
    },
    {
        "name": "Bills",
        "color": "#EF4444",
    },
    {
        "name": "Entertainment",
        "color": "#A855F7",
    },
    {
        "name": "Healthcare",
        "color": "#22C55E",
    },
    {
        "name": "Education",
        "color": "#F59E0B",
    },
    {
        "name": "Other",
        "color": "#6B7280",
    },
]


@receiver(post_save, sender=User)
def create_default_categories(sender, instance, created, **kwargs):
    if created:
        for category in DEFAULT_CATEGORIES:
            Category.objects.create(
                owner=instance,
                name=category["name"],
                color=category["color"]
            )