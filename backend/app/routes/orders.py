from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.services import order_service
from app.db import get_db


router = APIRouter()


class Order(BaseModel):
    term: int
    amount: int


@router.get("/orders")
async def list_orders(db: Session = Depends(get_db)):
    return order_service.get_orders(db=db)


@router.post("/orders")
async def create_order(order: Order, db: Session = Depends(get_db)):
    return order_service.create_order(db=db, term=order.term, amount=order.amount)
