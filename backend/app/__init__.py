from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from .routes import treasuries, orders
from .models import order
from .db import engine

app = FastAPI()

# ToDo: Migrate DB in a non-destructive way
order.Base.metadata.drop_all(bind=engine)
order.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(treasuries.router)
app.include_router(orders.router)
