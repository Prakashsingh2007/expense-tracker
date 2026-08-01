from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.accounts.models import User
from apps.categories.models import Category


DEFAULT_CATEGORIES = [
    {
        "name": "Salary",
        "icon": "💰",
        "color": "#10B981",
    },
    {
        "name": "Freelancing",
        "icon": "💻",
        "color": "#3B82F6",
    },
    {
        "name": "Investment",
        "icon": "📈",
        "color": "#8B5CF6",
    },
    {
        "name": "Food",
        "icon": "🍔",
        "color": "#F97316",
    },
    {
        "name": "Transport",
        "icon": "🚗",
        "color": "#06B6D4",
    },
    {
        "name": "Shopping",
        "icon": "🛒",
        "color": "#EC4899",
    },
    {
        "name": "Bills",
        "icon": "🧾",
        "color": "#EF4444",
    },
    {
        "name": "Entertainment",
        "icon": "🎬",
        "color": "#A855F7",
    },
    {
        "name": "Healthcare",
        "icon": "🏥",
        "color": "#22C55E",
    },
    {
        "name": "Education",
        "icon": "📚",
        "color": "#F59E0B",
    },
    {
        "name": "Other",
        "icon": "📦",
        "color": "#6B7280",
    },
]


@receiver(post_save, sender=User)
def create_default_categories(sender, instance, created, **kwargs):
    if created:
        Category.objects.bulk_create([
            Category(
                owner=instance,
                name=category["name"],
                icon=category["icon"],
                color=category["color"],
            )
            for category in DEFAULT_CATEGORIES
        ])