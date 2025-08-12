import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../App';
import { TrendingUp } from 'lucide-react';

const PerformanceChart = ({ performance }) => {
  const { isDarkMode } = useTheme();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: isDarkMode ? '#333' : '#fff',
          border: `1px solid ${isDarkMode ? '#404040' : '#e9ecef'}`,
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: isDarkMode ? '#fff' : '#2c3e50' }}>
            {formatDate(label)}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              margin: '4px 0', 
              color: entry.color,
              fontSize: '14px'
            }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const timelineData = performance.timeline || [];
  const returns = performance.returns || {};

  return (
    <div className="card performance-chart">
      <h2>
        <TrendingUp size={20} />
        Performance Comparison
      </h2>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={timelineData}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#404040' : '#e9ecef'} />
          <XAxis
            dataKey="date"
            stroke={isDarkMode ? '#b0b0b0' : '#6c757d'}
            fontSize={12}
            tickFormatter={formatDate}
          />
          <YAxis
            stroke={isDarkMode ? '#b0b0b0' : '#6c757d'}
            fontSize={12}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="portfolio"
            stroke="#8884d8"
            strokeWidth={3}
            name="Portfolio"
            dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="nifty50"
            stroke="#82ca9d"
            strokeWidth={2}
            name="Nifty 50"
            dot={{ fill: '#82ca9d', strokeWidth: 2, r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="gold"
            stroke="#ffc658"
            strokeWidth={2}
            name="Gold"
            dot={{ fill: '#ffc658', strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="performance-insights">
        <div className="insight-card">
          <div className="value" style={{ color: '#8884d8' }}>
            {returns.portfolio?.['1month']?.toFixed(1) || 0}%
          </div>
          <div className="label">Portfolio (1M)</div>
        </div>
        <div className="insight-card">
          <div className="value" style={{ color: '#82ca9d' }}>
            {returns.nifty50?.['1month']?.toFixed(1) || 0}%
          </div>
          <div className="label">Nifty 50 (1M)</div>
        </div>
        <div className="insight-card">
          <div className="value" style={{ color: '#ffc658' }}>
            {returns.gold?.['1month']?.toFixed(1) || 0}%
          </div>
          <div className="label">Gold (1M)</div>
        </div>
        <div className="insight-card">
          <div className="value" style={{ color: '#8884d8' }}>
            {returns.portfolio?.['3months']?.toFixed(1) || 0}%
          </div>
          <div className="label">Portfolio (3M)</div>
        </div>
        <div className="insight-card">
          <div className="value" style={{ color: '#82ca9d' }}>
            {returns.nifty50?.['3months']?.toFixed(1) || 0}%
          </div>
          <div className="label">Nifty 50 (3M)</div>
        </div>
        <div className="insight-card">
          <div className="value" style={{ color: '#ffc658' }}>
            {returns.gold?.['3months']?.toFixed(1) || 0}%
          </div>
          <div className="label">Gold (3M)</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
