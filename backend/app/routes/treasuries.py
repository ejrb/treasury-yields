from datetime import date
from decimal import Decimal
import requests
from pydantic import BaseModel, ConfigDict

from fastapi import APIRouter

router = APIRouter()


class MaturityTerm(BaseModel):
    name: str
    term: int

    model_config = ConfigDict(frozen=True)

    @classmethod
    def from_name(cls, name: str) -> "MaturityTerm":
        length, unit = name.strip().split()
        if unit == "Yr":
            return cls(name=name, term=int(length) * 12)
        return cls(name=name, term=int(length))


class DailyRate(BaseModel):
    date: date
    rate: Decimal

    model_config = ConfigDict(frozen=True)


FRED_API_URL = "https:#api.stlouisfed.org/fred/series/observations"

YIELD_SERIES = [
    ["DGS1MO", "1 Mo"],
    ["DGS2MO", "2 Mo"],
    # "DGS3MO", #  3 Mo
    ["DGS6MO", "6 Mo"],
    ["DGS1", "1 Yr"],
    ["DGS2", "2 Yr"],
    # "DGS3", #  3 Yr
    ["DGS5", "5 Yr"],
    # "DGS7", #  7 Yr
    ["DGS10", "10 Yr"],
    # "DGS20", #  20 Yr
    # "DGS30", #  30 Yr
]
START_DATE = "2024-01-01"
API_KEY = "..."


class YieldCurve(BaseModel):
    term: MaturityTerm
    rates: list[DailyRate]


def get_fred_yield_curve(series_id: str, name: str) -> YieldCurve:
    url = f"https://api.stlouisfed.org/fred/series/observations"
    params = dict(
        api_key=API_KEY,
        series_id=series_id,
        file_type="json",
        observation_start=START_DATE,
    )

    response = requests.get(url, params=params)

    data = response.json()["observations"]

    return YieldCurve(
        term=MaturityTerm.from_name(name),
        rates=[
            DailyRate(date=rate["date"], rate=Decimal(rate["value"]))
            for rate in data
            if rate["value"] != "."
        ],
    )


@router.get("/treasuries/yield_curve", response_model=list[YieldCurve])
async def get_yield_curve():
    return [
        get_fred_yield_curve("DGS1MO", "1 Mo"),
        get_fred_yield_curve("DGS1", "1 Yr"),
        get_fred_yield_curve("DGS5", "5 Yr"),
    ]
