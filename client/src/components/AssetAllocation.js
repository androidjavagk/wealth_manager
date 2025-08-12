import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '../App';
import { PieChart as PieChartIcon } from 'lucide-react';

const AssetAllocation = ({ allocation }) => {
  const { isDarkMode } = useTheme();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const sectorData = allocation.bySector ? Object.entries(allocation.bySector).map(([sector, data], index) => ({
    name: sector,
    value: data.value,
    percentage: data.percentage,
    color: COLORS[index % COLORS.length]
  })) : [];

  const marketCapData = allocation.byMarketCap ? Object.entries(allocation.byMarketCap).map(([marketCap, data], index) => ({
    name: marketCap,
    value: data.value,
    percentage: data.percentage,
    color: COLORS[index % COLORS.length]
  })) : [];

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
            {payload[0].payload.name}
          </p>
          <p style={{ margin: '0 0 4px 0', color: isDarkMode ? '#b0b0b0' : '#6c757d' }}>
            Value: {formatCurrency(payload[0].value)}
          </p>
          <p style={{ margin: '0', color: isDarkMode ? '#b0b0b0' : '#6c757d' }}>
            Percentage: {payload[0].payload.percentage.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="charts-section">
      <div className="card">
        <h2>
          <PieChartIcon size={20} />
          Sector Allocation
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sectorData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name} ${percentage.toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {sectorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f9fa', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: isDarkMode ? '#fff' : '#2c3e50' }}>Summary</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
            {sectorData.map((sector, index) => (
              <div key={sector.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: sector.color, borderRadius: '2px' }}></div>
                <span style={{ fontSize: '0.875rem', color: isDarkMode ? '#b0b0b0' : '#6c757d' }}>
                  {sector.name}: {sector.percentage.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2>
          <PieChartIcon size={20} />
          Market Cap Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={marketCapData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name} ${percentage.toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {marketCapData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f9fa', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: isDarkMode ? '#fff' : '#2c3e50' }}>Summary</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
            {marketCapData.map((marketCap, index) => (
              <div key={marketCap.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: marketCap.color, borderRadius: '2px' }}></div>
                <span style={{ fontSize: '0.875rem', color: isDarkMode ? '#b0b0b0' : '#6c757d' }}>
                  {marketCap.name}: {marketCap.percentage.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetAllocation;
