from datetime import date, datetime
from decimal import Decimal
from typing import Iterable

from collections import defaultdict
from fastapi import APIRouter
from pydantic import BaseModel, ConfigDict

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

    @classmethod
    def from_raw(cls, data: str) -> Iterable[tuple[MaturityTerm, "DailyRate"]]:
        header, *rows = data.strip().split("\n")
        maturity_terms = [
            MaturityTerm.from_name(name) for name in header.split("\t")[1:]
        ]

        for row in rows:
            datestr, *rates = row.strip().split("\t")
            day = datetime.strptime(datestr, "%m/%d/%Y").date()
            for rate, term in zip(rates, maturity_terms):
                yield term, cls(date=day, rate=Decimal(rate))


TREASURY_RATES = DailyRate.from_raw(
    # Source: https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value_month=202410
    """
        Date	1 Mo	2 Mo	3 Mo	4 Mo	6 Mo	1 Yr	2 Yr	3 Yr	5 Yr	7 Yr	10 Yr	20 Yr	30 Yr
        10/01/2024	4.96	4.87	4.71	4.63	4.36	3.96	3.61	3.52	3.51	3.60	3.74	4.14	4.08
        10/02/2024	4.92	4.83	4.69	4.61	4.36	3.97	3.63	3.54	3.55	3.65	3.79	4.19	4.14
        10/03/2024	4.99	4.85	4.68	4.61	4.37	4.02	3.70	3.62	3.62	3.71	3.85	4.24	4.18
    """
)


class YieldCurve(BaseModel):
    term: MaturityTerm
    rates: list[DailyRate]


@router.get("/treasuries/yield_curve", response_model=list[YieldCurve])
async def get_yield_curve():
    result = defaultdict(list)
    for term, rate in TREASURY_RATES:
        result[term].append(rate)
    return [YieldCurve(term=term, rates=rates) for term, rates in result.items()]
