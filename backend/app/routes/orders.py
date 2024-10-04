from pydantic import BaseModel

from fastapi import APIRouter

router = APIRouter()


@router.get("/orders")
async def get_orders():
    return {"orders": []}


class Order(BaseModel):
    term: int
    amount: int


@router.post("/orders")
async def create_order(order: Order):
    return {"message": "Order submitted", "order": order}
