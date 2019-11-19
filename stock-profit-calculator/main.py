from flask import Flask, render_template, request, flash
from Calculator import Calculator
from StockDetails import StockDetails
from datetime import datetime
import json

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        ss = request.form['ss']
        am = request.form['am']
        fsp = request.form['fsp']
        sc = request.form['sc']
        isp = request.form['isp']
        bc = request.form['bc']
        cgtr = request.form['cgtr']

        calculator = Calculator(ss, am, fsp, sc, isp, bc, cgtr)
        proceeds = calculator.get_pc()
        costs = calculator.get_cost()
        net_profit = calculator.get_net_profit()
        roi = calculator.get_roi()
        expect_fsp = calculator.get_expect_fsp()
        pp = calculator.get_purchase_price()
        tax = calculator.get_tax()

        return render_template('index.html', proceeds=proceeds, costs=costs, net_profit=net_profit, roi=roi, expect_fsp=expect_fsp, purchase_price=pp, buy_commision=bc, sell_commision=sc, tax=tax)
    return render_template('index.html')


@app.route('/stock', methods=['GET', 'POST'])
def stock():
    if request.method == 'POST':
        stock = request.form['stock']
        stockDetails = StockDetails(stock)
        stockDict = stockDetails.get_stock_details()
        if isinstance(stockDict, dict):
            now = datetime.now()
            ct = now.strftime("%Y-%m-%d %H:%M:%S")
            fn = stockDict['companyName']
            sp = stockDict['latestPrice']
            vc = stockDict['change']
            pc = stockDict['changePercent'] * 100
            return render_template('stockDetails.html', ct=ct, fn=fn, sp=sp, vc=vc, pc=pc)
        else:
            flash("You should retype a valid stock symbol!")
            return render_template('stockDetails.html')
    return render_template('stockDetails.html')


if __name__ == '__main__':
    app.run(port=8080)
