// Sample portfolio data with 15 Indian stocks
const portfolioData = {
  holdings: [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd",
      quantity: 50,
      avgPrice: 2450.00,
      currentPrice: 2680.50,
      sector: "Energy",
      marketCap: "Large",
      value: 134025.00,
      gainLoss: 11525.00,
      gainLossPercent: 9.4
    },
    {
      symbol: "INFY",
      name: "Infosys Limited",
      quantity: 100,
      avgPrice: 1800.00,
      currentPrice: 2010.75,
      sector: "Technology",
      marketCap: "Large",
      value: 201075.00,
      gainLoss: 21075.00,
      gainLossPercent: 11.7
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services Ltd",
      quantity: 75,
      avgPrice: 3200.00,
      currentPrice: 3450.25,
      sector: "Technology",
      marketCap: "Large",
      value: 258768.75,
      gainLoss: 18768.75,
      gainLossPercent: 7.8
    },
    {
      symbol: "HDFC",
      name: "HDFC Bank Ltd",
      quantity: 200,
      avgPrice: 1650.00,
      currentPrice: 1615.50,
      sector: "Banking",
      marketCap: "Large",
      value: 323100.00,
      gainLoss: -6900.00,
      gainLossPercent: -2.1
    },
    {
      symbol: "ICICIBANK",
      name: "ICICI Bank Ltd",
      quantity: 150,
      avgPrice: 950.00,
      currentPrice: 1025.75,
      sector: "Banking",
      marketCap: "Large",
      value: 153862.50,
      gainLoss: 11362.50,
      gainLossPercent: 8.0
    },
    {
      symbol: "ITC",
      name: "ITC Limited",
      quantity: 300,
      avgPrice: 420.00,
      currentPrice: 445.25,
      sector: "Consumer Goods",
      marketCap: "Large",
      value: 133575.00,
      gainLoss: 7575.00,
      gainLossPercent: 6.0
    },
    {
      symbol: "HINDUNILVR",
      name: "Hindustan Unilever Ltd",
      quantity: 100,
      avgPrice: 2500.00,
      currentPrice: 2650.00,
      sector: "Consumer Goods",
      marketCap: "Large",
      value: 265000.00,
      gainLoss: 15000.00,
      gainLossPercent: 6.0
    },
    {
      symbol: "SBIN",
      name: "State Bank of India",
      quantity: 500,
      avgPrice: 650.00,
      currentPrice: 720.50,
      sector: "Banking",
      marketCap: "Large",
      value: 360250.00,
      gainLoss: 35250.00,
      gainLossPercent: 10.8
    },
    {
      symbol: "BHARTIARTL",
      name: "Bharti Airtel Ltd",
      quantity: 200,
      avgPrice: 850.00,
      currentPrice: 925.75,
      sector: "Telecommunications",
      marketCap: "Large",
      value: 185150.00,
      gainLoss: 15150.00,
      gainLossPercent: 8.9
    },
    {
      symbol: "AXISBANK",
      name: "Axis Bank Ltd",
      quantity: 250,
      avgPrice: 750.00,
      currentPrice: 820.25,
      sector: "Banking",
      marketCap: "Large",
      value: 205062.50,
      gainLoss: 17562.50,
      gainLossPercent: 9.4
    },
    {
      symbol: "MARUTI",
      name: "Maruti Suzuki India Ltd",
      quantity: 50,
      avgPrice: 9500.00,
      currentPrice: 10250.00,
      sector: "Automobile",
      marketCap: "Large",
      value: 512500.00,
      gainLoss: 37500.00,
      gainLossPercent: 7.9
    },
    {
      symbol: "SUNPHARMA",
      name: "Sun Pharmaceutical Industries Ltd",
      quantity: 300,
      avgPrice: 850.00,
      currentPrice: 920.75,
      sector: "Healthcare",
      marketCap: "Large",
      value: 276225.00,
      gainLoss: 21225.00,
      gainLossPercent: 8.3
    },
    {
      symbol: "WIPRO",
      name: "Wipro Limited",
      quantity: 400,
      avgPrice: 450.00,
      currentPrice: 485.25,
      sector: "Technology",
      marketCap: "Large",
      value: 194100.00,
      gainLoss: 14100.00,
      gainLossPercent: 7.8
    },
    {
      symbol: "ULTRACEMCO",
      name: "UltraTech Cement Ltd",
      quantity: 100,
      avgPrice: 6500.00,
      currentPrice: 6850.00,
      sector: "Construction",
      marketCap: "Large",
      value: 685000.00,
      gainLoss: 35000.00,
      gainLossPercent: 5.4
    },
    {
      symbol: "TATAMOTORS",
      name: "Tata Motors Ltd",
      quantity: 500,
      avgPrice: 450.00,
      currentPrice: 520.75,
      sector: "Automobile",
      marketCap: "Large",
      value: 260375.00,
      gainLoss: 35375.00,
      gainLossPercent: 15.7
    }
  ],
  performance: {
    timeline: [
      {
        date: "2024-01-01",
        portfolio: 650000,
        nifty50: 21000,
        gold: 62000
      },
      {
        date: "2024-02-01",
        portfolio: 665000,
        nifty50: 21500,
        gold: 62500
      },
      {
        date: "2024-03-01",
        portfolio: 680000,
        nifty50: 22100,
        gold: 64500
      },
      {
        date: "2024-04-01",
        portfolio: 690000,
        nifty50: 22800,
        gold: 65500
      },
      {
        date: "2024-05-01",
        portfolio: 695000,
        nifty50: 23200,
        gold: 67000
      },
      {
        date: "2024-06-01",
        portfolio: 700000,
        nifty50: 23500,
        gold: 68000
      }
    ],
    returns: {
      portfolio: {
        "1month": 2.3,
        "3months": 8.1,
        "1year": 15.7
      },
      nifty50: {
        "1month": 1.8,
        "3months": 6.2,
        "1year": 12.4
      },
      gold: {
        "1month": -0.5,
        "3months": 4.1,
        "1year": 8.9
      }
    }
  }
};

module.exports = portfolioData;
