from fastapi import FastAPI

from .routes import treasuries, orders
from .models import order
from .db import engine

app = FastAPI()

# ToDo: Migrate DB in a non-destructive way
order.Base.metadata.drop_all(bind=engine)
order.Base.metadata.create_all(bind=engine)

app.include_router(treasuries.router)
app.include_router(orders.router)
