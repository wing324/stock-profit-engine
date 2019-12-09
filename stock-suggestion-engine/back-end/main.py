from flask import Flask
from flask import  request, jsonify
from StockDetails import StockDetails
from StockHistory import StockHistory
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

ethical_list = ["AAPL", "NSRGY", "ADBE"]
growth_list = ["OXLC", "GOOGL", "AMD"]
index_list = ["VTI", "IXUS", "ILTB"]
quality_list = ["NVDA", "MU", "CSCO"]
value_list = ["INTC", "NFLX", "GE"]


@app.route('/api/results', methods=['POST'])
def results():
    req = request.get_json()
    amount = req["amount"]
    strategies = req["strategies"]
    res_amount = [amount * 0.5, amount * 0.3, amount * 0.2]
    res_strategies = []
    res_history = []
    stock = StockDetails()
    history = StockHistory()
    switcher = {
        "Ethical": ethical_list,
        "Growth": growth_list,
        "Index": index_list,
        "Quality": quality_list,
        "Value": value_list,
    }
    for s in strategies:
        res_strategies.append(stock.get_stock_details(switcher.get(s)))
        res_history.append(history.get_history(switcher.get(s)))

    response = {"resAmount": res_amount, "resStrategies": res_strategies, "resHistory": res_history}
    return jsonify(response)


if __name__ == '__main__':
    app.run()
