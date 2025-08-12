import React from 'react';
import { Trophy, Target, Shield } from 'lucide-react';

const TopPerformers = ({ summary }) => {
  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="card">
      <h2>
        <Trophy size={20} />
        Top Performers & Insights
      </h2>
      
      <div className="top-performers">
        <div className="performer-card">
          <h3>🏆 Best Performer</h3>
          <div className="symbol">{summary.topPerformer?.symbol || 'N/A'}</div>
          <div className="name">{summary.topPerformer?.name || 'N/A'}</div>
          <div className={`performance best ${(summary.topPerformer?.gainPercent || 0) >= 0 ? 'positive' : 'negative'}`}>
            {formatPercentage(summary.topPerformer?.gainPercent || 0)}
          </div>
        </div>

        <div className="performer-card">
          <h3>⚠️ Worst Performer</h3>
          <div className="symbol">{summary.worstPerformer?.symbol || 'N/A'}</div>
          <div className="name">{summary.worstPerformer?.name || 'N/A'}</div>
          <div className={`performance worst ${(summary.worstPerformer?.gainPercent || 0) >= 0 ? 'positive' : 'negative'}`}>
            {formatPercentage(summary.worstPerformer?.gainPercent || 0)}
          </div>
        </div>
      </div>

      <div className="insights-grid">
        <div className="insight-item">
          <Target size={24} />
          <div className="value">{summary.diversificationScore?.toFixed(1) || 'N/A'}/10</div>
          <div className="label">Diversification Score</div>
        </div>
        
        <div className="insight-item">
          <Shield size={24} />
          <div className="value">{summary.riskLevel || 'N/A'}</div>
          <div className="label">Risk Level</div>
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;
