import React from 'react';
import { useTheme } from '../App';
import { DollarSign, TrendingUp, Package } from 'lucide-react';

const PortfolioOverview = ({ summary }) => {
  // eslint-disable-next-line no-unused-vars
  const { isDarkMode } = useTheme();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="portfolio-overview">
      <div className="card overview-card">
        <DollarSign size={24} />
        <h3>Total Portfolio Value</h3>
        <div className="value">{formatCurrency(summary.totalValue || 0)}</div>
        <div className="label">Current Market Value</div>
      </div>

      <div className="card overview-card">
        <TrendingUp size={24} />
        <h3>Total Gain/Loss</h3>
        <div className={`value ${(summary.totalGainLoss || 0) >= 0 ? 'positive' : 'negative'}`}>
          {formatCurrency(summary.totalGainLoss || 0)}
        </div>
        <div className={`change ${(summary.totalGainLossPercent || 0) >= 0 ? 'positive' : 'negative'}`}>
          {formatPercentage(summary.totalGainLossPercent || 0)}
        </div>
        <div className="label">Since Purchase</div>
      </div>

      <div className="card overview-card">
        <TrendingUp size={24} />
        <h3>Portfolio Performance</h3>
        <div className={`value ${(summary.totalGainLossPercent || 0) >= 0 ? 'positive' : 'negative'}`}>
          {formatPercentage(summary.totalGainLossPercent || 0)}
        </div>
        <div className="label">Return on Investment</div>
      </div>

      <div className="card overview-card">
        <Package size={24} />
        <h3>Number of Holdings</h3>
        <div className="value">{summary.totalValue ? 15 : 0}</div>
        <div className="label">Total Stocks</div>
      </div>
    </div>
  );
};

export default PortfolioOverview;
