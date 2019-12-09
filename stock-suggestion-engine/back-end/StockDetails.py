from iexfinance.stocks import Stock
from iexfinance.utils.exceptions import IEXSymbolError, IEXQueryError


class StockDetails:
    def get_stock_details(self, stock):
        print("Details")
        try:
            s = Stock(stock, token="sk_94426adfdc56434ea314b96d96961a4c")
            print(s.get_quote())
            return s.get_quote()
        except (IEXQueryError, IEXSymbolError):
            return "Please Input A Valid Stock Symbol"
