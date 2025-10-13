from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlmodel import select
from app.models import Product
from app.db import get_session

router = APIRouter(prefix="/products", tags=["products"])


@router.post("/", response_model=Product)
def create_product(product: Product, session=Depends(get_session)):
    session.add(product)
    session.commit()
    session.refresh(product)
    return product


@router.get("/", response_model=List[Product])
def list_products(session=Depends(get_session)):
    products = session.exec(select(Product)).all()
    return products


@router.get("/{product_id}", response_model=Product)
def get_product(product_id: int, session=Depends(get_session)):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.put("/{product_id}", response_model=Product)
def update_product(product_id: int, updated: Product, session=Depends(get_session)):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product.name = updated.name
    product.price = updated.price
    product.quantity = updated.quantity
    session.add(product)
    session.commit()
    session.refresh(product)
    return product


@router.delete("/{product_id}")
def delete_product(product_id: int, session=Depends(get_session)):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    session.delete(product)
    session.commit()
    return {"ok": True}
