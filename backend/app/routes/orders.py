from fastapi import APIRouter, Depends
from datetime import datetime
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.services import order_service
from app.db import get_db


router = APIRouter()


class CreateOrder(BaseModel):
    term: int
    amount: int


class Order(CreateOrder):
    id: int
    created_at: datetime


@router.get("/orders", response_model=list[Order])
async def list_orders(db: Session = Depends(get_db)):
    return order_service.get_orders(db=db)


@router.post("/orders", response_model=Order)
async def create_order(order: CreateOrder, db: Session = Depends(get_db)):
    return order_service.create_order(db=db, term=order.term, amount=order.amount)
