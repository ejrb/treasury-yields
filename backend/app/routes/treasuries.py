from fastapi import APIRouter

router = APIRouter()


@router.get("/treasuries")
async def get_treasuries():
    return {"treasuries": [{"yields": [1.2, 1.5, 1.8, 2.0]}]}
