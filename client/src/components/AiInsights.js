import React from 'react';
import { Sparkles } from 'lucide-react';

const AiInsights = ({ insights, source }) => {
  if (!insights) return null;

  return (
    <div className="card">
      <h2>
        <Sparkles size={20} />
        AI Insights
        <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
          {source === 'openai' ? '(powered by OpenAI)' : '(auto-generated)'}
        </span>
      </h2>
      <div
        className="ai-insights"
        style={{
          whiteSpace: 'pre-wrap',
          color: 'var(--text-primary)'
        }}
      >
        {insights}
      </div>
    </div>
  );
};

export default AiInsights;


