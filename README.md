# 💰 Expense Tracker

A modern full-stack Expense Tracker web application built with **React**, **Django REST Framework**, and **SQLite** that helps users manage their personal finances efficiently.

---

## 📸 Screenshots

> Add screenshots here after deployment.

- Dashboard
- Transactions
- Categories
- Budgets
- Reports
- Profile

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### 📊 Dashboard
- Financial Summary
- Current Balance
- Total Income
- Total Expenses
- Recent Transactions
- Category-wise Expense Overview

### 💳 Transactions
- Add Transactions
- Edit Transactions
- Delete Transactions
- Search Transactions
- Filter by Category
- Filter by Date
- Income & Expense Support

### 📂 Categories
- Create Categories
- Edit Categories
- Delete Categories
- Custom Colors
- Category Icons

### 💰 Budgets
- Monthly Budgets
- Category Budgets
- Budget Tracking
- Budget Progress

### 📈 Reports
- Expense Analytics
- Income Reports
- Category Reports
- Interactive Charts

### 👤 Profile
- Update Profile Information
- Upload Profile Picture
- Change Password
- Account Statistics

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Recharts

## Backend

- Django
- Django REST Framework
- JWT Authentication
- Django Filters

## Database

- SQLite

---

# 📁 Project Structure

```
expense-tracker/
│
├── backend/
│   ├── apps/
│   ├── config/
│   ├── media/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── LICENSE
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/Prakashsingh2007/expense-tracker.git

cd expense-tracker
```

---

## 2. Backend Setup

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run migrations

```bash
python manage.py migrate
```

Start backend

```bash
python manage.py runserver
```

Backend runs on

```
http://127.0.0.1:8000
```

---

## 3. Frontend Setup

Open another terminal.

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔑 API Authentication

The project uses JWT Authentication.

After login, the frontend stores

- Access Token
- Refresh Token

and automatically includes them in API requests.

---

# 📊 Reports

The Reports module provides

- Monthly Expenses
- Monthly Income
- Category Breakdown
- Interactive Charts

---

# 📱 Responsive Design

The application supports

- Desktop
- Tablet
- Mobile

---

# 🔒 Security

- JWT Authentication
- Protected API Endpoints
- User-specific Data Isolation
- Input Validation
- Secure Password Storage

---

# 📦 Future Improvements

- PostgreSQL Support
- Email Verification
- Password Reset
- Dark Mode
- CSV Export
- PDF Reports
- Notifications
- Multi-currency Support
- AI Expense Insights

---

# 👨‍💻 Author

**Prakash Singh**

Computer Science Engineering Student

---


# ⭐ If you like this project

Give the repository a ⭐ on GitHub!