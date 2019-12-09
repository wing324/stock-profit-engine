import yfinance as yf


class StockHistory:
    def get_history(self, stock):
        s = yf.Tickers(stock)
        return s.history(period="5d").Close.to_json()
