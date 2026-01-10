import yfinance as yf
import pandas as pd
from cachetools import TTLCache, cached
import logging

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Cache: Store data for 5 minutes (300 seconds) to avoid rate limits
# Max 100 items in cache
cache = TTLCache(maxsize=100, ttl=300)

class MarketDataService:
    @staticmethod
    def _format_ticker(ticker: str) -> str:
        """
        Adds .SA suffix if it's a Brazilian stock (usually 4 chars + number, or 5 chars).
        Simple heuristic: if it ends with a number and doesn't have a dot, add .SA.
        Also handles standard crypto pairs if needed (e.g. BTC-USD).
        """
        ticker = ticker.upper().strip()
        
        # Basic heuristic for B3 stocks (e.g., PETR4, MGLU3, VALE3)
        # Assuming tickers with 4-5 letters + 1-2 numbers are likely B3 if no suffix provided.
        # Check if it has numbers at the end and no dot
        if any(char.isdigit() for char in ticker) and "." not in ticker and "-" not in ticker:
             return f"{ticker}.SA"
        
        return ticker

    @staticmethod
    @cached(cache)
    def get_stock_price(ticker: str):
        """
        Fetches current price and basic info for a ticker.
        """
        formatted_ticker = MarketDataService._format_ticker(ticker)
        logger.info(f"Fetching price for: {formatted_ticker}")

        try:
            stock = yf.Ticker(formatted_ticker)
            
            # fast_info is faster than .info
            price = stock.fast_info.last_price
            prev_close = stock.fast_info.previous_close
            
            if price is None:
                logger.warning(f"No price found for {formatted_ticker}")
                return None

            change_percent = ((price - prev_close) / prev_close) * 100 if prev_close else 0.0

            # Try to get a logo/icon (yfinance might not always have this reliable)
            # We can use a placeholder or check .info if speed permits, but .info is slow.
            # For now, return basic structure.
            
            return {
                "ticker": ticker.upper(),
                "price": round(price, 2),
                "change_percent": round(change_percent, 2),
                # "company_name": stock.info.get('longName', ticker), # accessing .info can be slow and blocking
            }

        except Exception as e:
            logger.error(f"Error fetching stock price for {formatted_ticker}: {e}")
            return None

    @staticmethod
    @cached(cache)
    def get_historical_data(ticker: str, period: str = "1mo"):
        """
        Fetches historical data for charts.
        """
        formatted_ticker = MarketDataService._format_ticker(ticker)
        logger.info(f"Fetching history for: {formatted_ticker} ({period})")

        try:
            stock = yf.Ticker(formatted_ticker)
            hist = stock.history(period=period)

            if hist.empty:
                 return []

            # Format for Recharts: [{ "date": "10/01", "value": 35.50 }, ...]
            data = []
            for date, row in hist.iterrows():
                # Format date as 'DD/MM' or 'DD/MM/YYYY' depending on period
                # For 1mo, 'DD/MM' is good.
                date_str = date.strftime("%d/%m")
                data.append({
                    "date": date_str,
                    "value": round(row['Close'], 2)
                })
            
            return data

        except Exception as e:
            logger.error(f"Error fetching history for {formatted_ticker}: {e}")
            return []
