from django.urls import path
from .views import (
    MonthlyReportView,
    CategoryReportView,
    TrendReportView,
    TopExpenseView,
)
from .views import (
    MonthlyReportView,
    CategoryReportView,
    TrendReportView,
    TopExpenseView,
    ReportsDashboardView,
)

urlpatterns = [
    path("", ReportsDashboardView.as_view()),

    path("monthly/", MonthlyReportView.as_view()),
    path("categories/", CategoryReportView.as_view()),
    path("trends/", TrendReportView.as_view()),
    path("top-expenses/", TopExpenseView.as_view()),
]