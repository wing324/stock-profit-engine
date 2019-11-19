from iexfinance.stocks import Stock
from iexfinance.utils.exceptions import IEXSymbolError, IEXQueryError


class StockDetails:
    def __init__(self, stock):
        self.stock = stock

    def get_stock_details(self):
        try:
            details = Stock(self.stock, token="replace token")
            return details.get_quote()
        except (IEXQueryError, IEXSymbolError):
            return "Please Input A Valid Stock Symbol"



