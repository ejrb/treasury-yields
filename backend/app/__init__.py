from fastapi import FastAPI

from .routes import treasuries, orders

app = FastAPI()


app.include_router(treasuries.router)
app.include_router(orders.router)
