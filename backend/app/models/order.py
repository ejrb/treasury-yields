from sqlalchemy import Column, Integer
from app.db import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    term = Column(Integer)
    amount = Column(Integer)
