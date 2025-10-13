from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlmodel import select
from app.models import Sale, Product
from app.db import get_session

router = APIRouter(prefix="/sales", tags=["sales"])


@router.post("/", response_model=Sale)
def create_sale(sale: Sale, session=Depends(get_session)):
    product = session.get(Product, sale.product_id)
    if not product:
        raise HTTPException(status_code=400, detail="Invalid product")
    if product.quantity < sale.quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")
    product.quantity -= sale.quantity
    sale.total_price = sale.quantity * product.price
    session.add(sale)
    session.add(product)
    session.commit()
    session.refresh(sale)
    return sale


@router.get("/", response_model=List[Sale])
def list_sales(session=Depends(get_session)):
    sales = session.exec(select(Sale)).all()
    return sales
