from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum
from django.db.models.functions import TruncMonth
from django.utils import timezone
from apps.transactions.models import Transaction


class MonthlyReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now()

        transactions = Transaction.objects.filter(
            owner=request.user,
            transaction_date__year=today.year,
            transaction_date__month=today.month,
        )

        income = (
            transactions.filter(type="income")
            .aggregate(total=Sum("amount"))["total"]
            or 0
        )

        expense = (
            transactions.filter(type="expense")
            .aggregate(total=Sum("amount"))["total"]
            or 0
        )

        data = {
            "month": today.strftime("%B"),
            "income": income,
            "expense": expense,
            "balance": income - expense,
        }

        return Response(data)

class CategoryReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now()

        transactions = Transaction.objects.filter(
            owner=request.user,
            transaction_date__year=today.year,
            transaction_date__month=today.month,
        )

        category_summary = (
            transactions.values("category__name")
            .annotate(total=Sum("amount"))
            .order_by("-total")
        )

        data = {
            "month": today.strftime("%B"),
            "category_summary": category_summary,
        }

        return Response(data)

class TrendReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now()

        transactions = Transaction.objects.filter(
            owner=request.user,
            type="expense",
            transaction_date__year=today.year,
            transaction_date__month=today.month,
        )

        trends = (
            transactions
            .values("transaction_date__date")
            .annotate(total=Sum("amount"))
            .order_by("transaction_date__date")
        )

        data = {
            "month": today.strftime("%B"),
            "trends": list(trends),
        }

        return Response(data)

    
class TopExpenseView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now()

        expenses = Transaction.objects.filter(
            owner=request.user,
            type="expense",
            transaction_date__year=today.year,
            transaction_date__month=today.month,
        ).order_by("-amount")[:5]

        data = {
            "month": today.strftime("%B"),
            "top_expenses": [
                {
                    "title": expense.title,
                    "amount": expense.amount,
                    "category": expense.category.name,
                    "transaction_date": expense.transaction_date,
                }
                for expense in expenses
            ],
        }  

        return Response(data)



class ReportsDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        year = request.query_params.get("year")
        month = request.query_params.get("month")

        transactions = Transaction.objects.filter(owner=request.user)

        if year:
            transactions = transactions.filter(transaction_date__year=int(year))
        if month:
            transactions = transactions.filter(transaction_date__month=int(month))

        income = (
            transactions.filter(type="income")
            .aggregate(total=Sum("amount"))["total"] or 0
        )

        expense = (
            transactions.filter(type="expense")
            .aggregate(total=Sum("amount"))["total"] or 0
        )

        categories = (
            transactions.filter(type="expense")
            .values("category__name")
            .annotate(amount=Sum("amount"))
            .order_by("-amount")
        )

        # Single-month view: daily points. Broader ranges: true monthly series.
        if year and month:
            trends = (
                transactions.filter(type="expense")
                .values("transaction_date__date")
                .annotate(amount=Sum("amount"))
                .order_by("transaction_date__date")
            )
            monthly = [
                {
                    "month": item["transaction_date__date"].strftime("%d %b"),
                    "expense": item["amount"],
                }
                for item in trends
            ]
        else:
            trends = (
                transactions.filter(type="expense")
                .annotate(period=TruncMonth("transaction_date"))
                .values("period")
                .annotate(amount=Sum("amount"))
                .order_by("period")
            )
            monthly = [
                {
                    "month": item["period"].strftime("%b %Y"),
                    "expense": item["amount"],
                }
                for item in trends
            ]

        top_expenses = transactions.filter(
            type="expense"
        ).order_by("-amount")[:5]

        return Response({
            "total_income": income,
            "total_expense": expense,
            "balance": income - expense,

            "category_expenses": [
                {
                    "category": item["category__name"],
                    "amount": item["amount"],
                }
                for item in categories
            ],

            "monthly": monthly,

            "top_expenses": [
                {
                    "title": item.title,
                    "amount": item.amount,
                    "category": item.category.name,
                    "date": item.transaction_date,
                }
                for item in top_expenses
            ],
        })