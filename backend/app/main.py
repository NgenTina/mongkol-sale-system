from fastapi import FastAPI
from app.db import init_db
from app.routers import products, sales

app = FastAPI(title="Mongkol Sale System API")

app.include_router(products.router)
app.include_router(sales.router)


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/")
def root():
    return {"ok": True, "message": "Mongkol Sale System API"}
