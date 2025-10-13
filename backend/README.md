# Mongkol Sale System - Backend (FastAPI)

This is a minimal FastAPI backend scaffold for the Mongkol Sale System.

What's included:

- FastAPI app (`app/main.py`)
- SQLite database using SQLModel (`app/models.py`, `app/db.py`)
- CRUD routers for `Product` and `Sale` (`app/routers/*.py`)
- `requirements.txt`

Quick start (assuming Python 3.10+):

1. Create a venv and activate it:

```bash
python -m venv .venv
source .venv/Scripts/activate # on Windows PowerShell/CMD: .venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the app:

```bash
uvicorn app.main:app --reload --port 8000
```

API docs will be available at http://localhost:8000/docs
