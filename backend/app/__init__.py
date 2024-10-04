from fastapi import FastAPI

from .routes import treasuries, orders
from .models import order
from .db import engine

app = FastAPI()

order.Base.metadata.create_all(bind=engine)

app.include_router(treasuries.router)
app.include_router(orders.router)
