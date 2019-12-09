import yfinance as yf


class StockHistory:
    def get_history(self, stock):
        s = yf.Tickers(stock)
        return s.history(period="1wk").Close.to_json()
