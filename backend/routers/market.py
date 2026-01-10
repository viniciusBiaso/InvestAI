from fastapi import APIRouter, HTTPException
from typing import Optional, List
from services.market_data import MarketDataService
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/market",
    tags=["Market Data"]
)

class QuoteResponse(BaseModel):
    ticker: str
    price: float
    change_percent: float

class HistoryPoint(BaseModel):
    date: str
    value: float

@router.get("/quote/{ticker}", response_model=QuoteResponse)
async def get_quote(ticker: str):
    """
    Get current price for a ticker (e.g., PETR4, AAPL, BTC-USD).
    """
    data = MarketDataService.get_stock_price(ticker)
    if not data:
        raise HTTPException(status_code=404, detail=f"Ticker '{ticker}' not found or service unavailable.")
    return data

@router.get("/history/{ticker}", response_model=List[HistoryPoint])
async def get_history(ticker: str, period: str = "1mo"):
    """
    Get historical data for charts.
    Period options: 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max
    """
    data = MarketDataService.get_historical_data(ticker, period)
    # If empty list, it might be invalid ticker or just no data.
    # We return empty list instead of 404 for charts usually, but 404 is also valid.
    # Let's return empty list to not break UI.
    return data

@router.get("/search")
async def search_assets(query: str):
    """
    Fast search for assets. Uses a local JSON file to avoid external API latency.
    """
    if not query or len(query) < 2:
        return []

    import json
    import os

    try:
        # Load data (Optimally this should be loaded once at startup, but for now file read is fast enough for low traffic)
        # Assuming run from backend/ dir
        file_path = "data/tickers_br.json"
        if not os.path.exists(file_path):
            # Fallback for different CWD
            file_path = "../data/tickers_br.json"
        
        with open(file_path, "r", encoding="utf-8") as f:
            assets = json.load(f)

        query = query.lower()
        results = []

        for asset in assets:
            if query in asset["ticker"].lower() or query in asset["name"].lower():
                results.append(asset)
                if len(results) >= 5: # Limit results
                    break
        
        return results

    except Exception as e:
        print(f"Search error: {e}")
        return []

