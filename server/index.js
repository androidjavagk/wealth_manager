const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const serverless = require('serverless-http');

const portfolioData = require('./data/portfolioData');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio Analytics API is running!' });
});

// Helper function to calculate portfolio metrics
const calculatePortfolioMetrics = (holdings) => {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalInvested = holdings.reduce((sum, holding) => sum + (holding.avgPrice * holding.quantity), 0);
  const totalGainLoss = totalValue - totalInvested;
  const totalGainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

  // Find top and worst performers
  const sortedByPerformance = [...holdings].sort((a, b) => b.gainLossPercent - a.gainLossPercent);
  const topPerformer = sortedByPerformance[0];
  const worstPerformer = sortedByPerformance[sortedByPerformance.length - 1];

  // Calculate diversification score (1-10)
  const sectors = [...new Set(holdings.map(h => h.sector))];
  const diversificationScore = Math.min(10, sectors.length * 2);

  // Determine risk level based on performance volatility
  const avgGainLoss = holdings.reduce((sum, h) => sum + Math.abs(h.gainLossPercent), 0) / holdings.length;
  let riskLevel = 'Low';
  if (avgGainLoss > 15) riskLevel = 'High';
  else if (avgGainLoss > 8) riskLevel = 'Moderate';

  return {
    totalValue,
    totalInvested,
    totalGainLoss,
    totalGainLossPercent,
    topPerformer: {
      symbol: topPerformer.symbol,
      name: topPerformer.name,
      gainPercent: topPerformer.gainLossPercent
    },
    worstPerformer: {
      symbol: worstPerformer.symbol,
      name: worstPerformer.name,
      gainPercent: worstPerformer.gainLossPercent
    },
    diversificationScore,
    riskLevel
  };
};

// Helper function to calculate allocation
const calculateAllocation = (holdings) => {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  
  // Calculate sector allocation
  const sectorAllocation = {};
  holdings.forEach(holding => {
    if (!sectorAllocation[holding.sector]) {
      sectorAllocation[holding.sector] = { value: 0, percentage: 0 };
    }
    sectorAllocation[holding.sector].value += holding.value;
  });

  // Calculate percentages for sectors
  Object.keys(sectorAllocation).forEach(sector => {
    sectorAllocation[sector].percentage = (sectorAllocation[sector].value / totalValue) * 100;
  });

  // Calculate market cap allocation
  const marketCapAllocation = {};
  holdings.forEach(holding => {
    if (!marketCapAllocation[holding.marketCap]) {
      marketCapAllocation[holding.marketCap] = { value: 0, percentage: 0 };
    }
    marketCapAllocation[holding.marketCap].value += holding.value;
  });

  // Calculate percentages for market cap
  Object.keys(marketCapAllocation).forEach(marketCap => {
    marketCapAllocation[marketCap].percentage = (marketCapAllocation[marketCap].value / totalValue) * 100;
  });

  return {
    bySector: sectorAllocation,
    byMarketCap: marketCapAllocation
  };
};

// API Endpoints

// 1. Portfolio Holdings Endpoint
app.get('/api/portfolio/holdings', (req, res) => {
  try {
    res.json(portfolioData.holdings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio holdings' });
  }
});

// 2. Portfolio Allocation Endpoint
app.get('/api/portfolio/allocation', (req, res) => {
  try {
    const allocation = calculateAllocation(portfolioData.holdings);
    res.json(allocation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate portfolio allocation' });
  }
});

// 3. Performance Comparison Endpoint
app.get('/api/portfolio/performance', (req, res) => {
  try {
    res.json(portfolioData.performance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch performance data' });
  }
});

// 4. Portfolio Summary Endpoint
app.get('/api/portfolio/summary', (req, res) => {
  try {
    const summary = calculatePortfolioMetrics(portfolioData.holdings);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate portfolio summary' });
  }
});

// AI Insights endpoint (uses OpenAI if OPENAI_API_KEY is set; falls back to heuristic)
app.get('/api/portfolio/ai-insights', async (req, res) => {
  try {
    const holdings = portfolioData.holdings;
    const summary = calculatePortfolioMetrics(holdings);
    const allocation = calculateAllocation(holdings);

    const openAiKey = process.env.OPENAI_API_KEY;
    if (openAiKey) {
      const prompt = `You are a portfolio analyst. Analyze the following Indian equity portfolio and give a concise, actionable summary (4-6 bullet points):\n\n` +
        `Summary: totalValue=₹${Math.round(summary.totalValue)}, totalInvested=₹${Math.round(summary.totalInvested)}, totalGainLoss=₹${Math.round(summary.totalGainLoss)} (${summary.totalGainLossPercent.toFixed(2)}%).\n` +
        `Top Performer: ${summary.topPerformer.symbol} (${summary.topPerformer.name}) at ${summary.topPerformer.gainPercent.toFixed(2)}%.\n` +
        `Worst Performer: ${summary.worstPerformer.symbol} (${summary.worstPerformer.name}) at ${summary.worstPerformer.gainPercent.toFixed(2)}%.\n` +
        `Risk Level: ${summary.riskLevel}, Diversification Score: ${summary.diversificationScore}/10.\n` +
        `Sector Allocation (top 3): ${Object.entries(allocation.bySector)
          .sort((a,b)=>b[1].value-a[1].value)
          .slice(0,3)
          .map(([k,v])=>`${k} ${v.percentage.toFixed(1)}%`)
          .join(', ')}.\n` +
        `Provide: portfolio health, concentration risk, rebalancing suggestion, and 1-2 specific actions.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a concise, data-driven portfolio analyst.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.4,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }
      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content || 'No insights generated.';
      return res.json({ source: 'openai', insights: content });
    }

    // Heuristic fallback (no external API key required)
    const topSector = Object.entries(allocation.bySector)
      .sort((a,b)=>b[1].percentage-a[1].percentage)[0];
    const mcSplit = allocation.byMarketCap;
    const largePct = (mcSplit.Large?.percentage || 0).toFixed(1);
    const midPct = (mcSplit.Mid?.percentage || 0).toFixed(1);
    const smallPct = (mcSplit.Small?.percentage || 0).toFixed(1);

    const heuristic = [
      `Portfolio is ${summary.totalGainLoss >= 0 ? 'up' : 'down'} ${summary.totalGainLossPercent.toFixed(2)}% versus cost; ` +
        `total value around ₹${Math.round(summary.totalValue).toLocaleString('en-IN')}.`,
      `Largest sector weight: ${topSector ? `${topSector[0]} (${topSector[1].percentage.toFixed(1)}%)` : 'N/A'}.`,
      `Market-cap mix ~ Large ${largePct}%, Mid ${midPct}%, Small ${smallPct}%.`,
      `Top performer: ${summary.topPerformer.symbol} at ${summary.topPerformer.gainPercent.toFixed(2)}%; ` +
        `worst: ${summary.worstPerformer.symbol} at ${summary.worstPerformer.gainPercent.toFixed(2)}%.`,
      `Risk labeled ${summary.riskLevel} with diversification score ${summary.diversificationScore}/10.`,
      `Suggestion: Trim overweight sectors above 35% and rebalance toward underweight areas; stagger buys in laggards if fundamentals hold.`
    ].join('\n- ');

    return res.json({ source: 'heuristic', insights: `- ${heuristic}` });
  } catch (error) {
    console.error('AI insights error:', error.message);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start local server only when run directly (not in serverless env)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Portfolio Analytics API listening on port ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;
module.exports.handler = serverless(app);
