from sqlalchemy import Column, Integer, Float, DateTime
from sqlalchemy.sql import func
from app.db import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    term = Column(Integer)
    amount = Column(Integer)
    created_at = Column(DateTime, default=func.now())
