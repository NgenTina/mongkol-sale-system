from typing import Optional
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import List


class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    sku: Optional[str] = None
    price: float
    quantity: int = 0
    sales: List["Sale"] = Relationship(back_populates="product")


class Sale(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: int = Field(foreign_key="product.id")
    quantity: int
    total_price: float
    created_at: datetime = Field(default_factory=datetime.utcnow)
    product: Optional[Product] = Relationship(back_populates="sales")
