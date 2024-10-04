from sqlalchemy.orm import Session
from app.models.order import Order


def create_order(db: Session, term: int, amount: int):
    new_order = Order(term=term, amount=amount)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order


def get_orders(db: Session):
    return db.query(Order).all()
