class Calculator:
    def __init__(self, ss, am, fsp, sc, isp, bc, cgtr):
        self.ss = ss
        self.am = int(am)
        self.fsp = float(fsp)
        self.sc = float(sc)
        self.isp = float(isp)
        self.bc = float(bc)
        self.cgtr = float(cgtr)

    def get_pc(self):
        pc = self.am * self.fsp
        return pc

    def get_cost(self):
        proceeds = self.get_pc()
        commission = self.bc + self.sc
        price = self.am * self.isp
        tax = (self.cgtr / 100) * (proceeds - commission - price)
        costs = price + commission + tax
        return costs

    def get_net_profit(self):
        profit = self.get_pc() - self.get_cost()
        return profit

    def get_roi(self):
        roi = self.get_net_profit() / self.get_cost()
        return "{:.2%}".format(roi)

    def get_expect_fsp(self):
        commission = self.bc + self.sc
        expect_fsp = commission / self.am + self.isp
        return expect_fsp
