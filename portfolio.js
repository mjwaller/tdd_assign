// portfolio.js

class Portfolio {
  constructor() {
    this.stocks = [];
  }

  getStocks() {
    return this.stocks;
  }

  isEmpty() {
    return this.stocks.length === 0;
  }

  addStock(symbol, shares) {
    this.stocks.push({ symbol, shares });
  }

  removeStock(symbol) {
    this.stocks = this.stocks.filter(stock => stock.symbol !== symbol);
  }

  updateShares(symbol, newShares) {
    this.stocks = this.stocks.map(stock => {
      if (stock.symbol === symbol) {
        stock.shares = newShares;
      }
      return stock;
    });
  }

  getTotalShares() {
    return this.stocks.reduce((total, stock) => total + stock.shares, 0);
  }

  getUniqueSymbolCount() {
    const uniqueSymbols = new Set(this.stocks.map(stock => stock.symbol));
    return uniqueSymbols.size;
  }

  makePurchase(symbol, shares) {
    const existingStockIndex = this.stocks.findIndex(stock => stock.symbol === symbol);
    if (existingStockIndex !== -1) {
      this.stocks[existingStockIndex].shares += shares;
    } else {
      this.addStock(symbol, shares);
    }
  }

  makeSale(symbol, shares) {
    const existingStockIndex = this.stocks.findIndex(stock => stock.symbol === symbol);
    if (existingStockIndex !== -1) {
      if (this.stocks[existingStockIndex].shares < shares) {
        throw new ShareSaleException('Cannot sell more shares than owned');
      }
      this.stocks[existingStockIndex].shares -= shares;
      if (this.stocks[existingStockIndex].shares === 0) {
        this.removeStock(symbol);
      }
    } else {
      throw new ShareSaleException('Cannot sell shares of non-existing symbol');
    }
  }

  getSharesForSymbol(symbol) {
    const stock = this.stocks.find(stock => stock.symbol === symbol);
    return stock ? stock.shares : 0;
  }

  getOwnedSymbols() {
    return this.stocks.filter(stock => stock.shares > 0).map(stock => stock.symbol);
  }
}

class ShareSaleException extends Error {
  constructor(message) {
    super(message);
    this.name = 'ShareSaleException';
  }
}

module.exports = { Portfolio, ShareSaleException };







