// portfolio.test.js

const { Portfolio, ShareSaleException } = require('./portfolio');

test('Creating new portfolo - should initialize with empty list of stocks', () => {
  const portfolio = new Portfolio();
  expect(portfolio.getStocks()).toEqual([]);
});

test('isEmpty - when the portfolio is empty, should return true', () => {
  const portfolio = new Portfolio();
  expect(portfolio.isEmpty()).toBe(true);
});

test('isEmpty - when the portfolio is not empty, should return false', () => {
  const portfolio = new Portfolio();
  portfolio.addStock('MCRSFT', 10);
  expect(portfolio.isEmpty()).toBe(false);
});

test('Adding a stock to the portfolio -  should increase the number of stocks', () => {
  const portfolio = new Portfolio();
  portfolio.addStock('AAPL', 10);
  expect(portfolio.getStocks()).toHaveLength(1);
});

test('Removing a stock from the portfolio - should decrease the number of stocks', () => {
  const portfolio = new Portfolio();
  portfolio.addStock('APPL', 10);
  portfolio.removeStock('APPL');
  expect(portfolio.getStocks()).toHaveLength(0);
});

test('Updating shares for a stock should modify the number of shares in the portfolio', () => {
  const portfolio = new Portfolio();
  portfolio.addStock('APPLE', 10);
  portfolio.updateShares('APPLE', 20);
  expect(portfolio.getStocks()[0].shares).toBe(20);
});

test('Total number of shares in the portfolio -  should be calculated correctly', () => {
  const portfolio = new Portfolio();
  portfolio.addStock('MCRSFT', 10);
  portfolio.addStock('GOOGLE', 5);
  portfolio.addStock('APPLE', 15);
  expect(portfolio.getTotalShares()).toBe(30);
});

test('getUniqueSymbolCount - should return the count of unique ticker symbols', () => {
  const portfolio = new Portfolio();
  portfolio.addStock('BMW', 5);
  portfolio.addStock('RBLX', 10);
  portfolio.addStock('BMW', 3); // Adding more shares of existing symbol
  expect(portfolio.getUniqueSymbolCount()).toBe(2);
});

test('makePurchase - should add shares to the portfolio for a given symbol', () => {
  const portfolio = new Portfolio();
  portfolio.makePurchase('GOOGLE', 10);
  expect(portfolio.getStocks()).toEqual([{ symbol: 'GOOGLE', shares: 10 }]);
});

test('makeSale - should subtract shares from the portfolio for a given symbol', () => {
  const portfolio = new Portfolio();
  portfolio.addStock('APPLE', 20);
  portfolio.makeSale('APPLE', 10);
  expect(portfolio.getStocks()).toEqual([{ symbol: 'APPLE', shares: 10 }]);
});

test('getSharesForSymbol - should return the number of shares for a given symbol', () => {
  const portfolio = new Portfolio();
  portfolio.addStock('APPLE', 20);
  expect(portfolio.getSharesForSymbol('APPLE')).toBe(20);
});

test('getOwnedSymbols - should return an array of symbols for which the portfolio owns shares', () => {
  const portfolio = new Portfolio();
  portfolio.addStock('APPLE', 20);
  portfolio.addStock('GOOGLE', 15);
  portfolio.addStock('MCRSFT', 0); // Adding a stock with zero shares
  expect(portfolio.getOwnedSymbols()).toEqual(['APPLE', 'GOOGLE']);
});
