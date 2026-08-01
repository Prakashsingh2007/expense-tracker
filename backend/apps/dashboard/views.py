from decimal import Decimal

from django.db.models import Sum
from django.db.models.functions import TruncMonth
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.transactions.models import Transaction


class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        transactions = Transaction.objects.filter(owner=user)

        # Total Income
        total_income = (
            transactions.filter(type="income")
            .aggregate(total=Sum("amount"))["total"]
            or Decimal("0.00")
        )

        # Total Expense
        total_expense = (
            transactions.filter(type="expense")
            .aggregate(total=Sum("amount"))["total"]
            or Decimal("0.00")
        )

        # Balance
        balance = total_income - total_expense

        # Recent Transactions
        recent_transactions = (
            transactions.order_by("-transaction_date")[:5]
        )

        recent_data = []

        for transaction in recent_transactions:
            recent_data.append({
                "id": transaction.id,
                "title": transaction.title,
                "amount": transaction.amount,
                "type": transaction.type,
                "category": transaction.category.name,
                "note": transaction.note,
                "transaction_date": transaction.transaction_date,
            })

        # Monthly Expenses
        monthly_expenses = (
            transactions.filter(type="expense")
            .annotate(month=TruncMonth("transaction_date"))
            .values("month")
            .annotate(total=Sum("amount"))
            .order_by("month")
        )

        monthly_data = []

        for item in monthly_expenses:
            monthly_data.append({
                "month": item["month"].strftime("%b %Y"),
                "expense": item["total"],
            })

        # Category-wise Expenses
        category_expenses = (
            transactions.filter(type="expense")
            .values("category__name")
            .annotate(total=Sum("amount"))
            .order_by("-total")
        )

        category_data = []

        for item in category_expenses:
            category_data.append({
                "category": item["category__name"],
                "amount": item["total"],
            })

        return Response({
            "balance": balance,
            "total_income": total_income,
            "total_expense": total_expense,
            "recent_transactions": recent_data,
            "monthly_expenses": monthly_data,
            "category_expenses": category_data,
        })