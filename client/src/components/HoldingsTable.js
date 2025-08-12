import React, { useState, useMemo } from 'react';
import { Search, Table } from 'lucide-react';

const HoldingsTable = ({ holdings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('symbol');
  const [sortOrder, setSortOrder] = useState('asc');

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

  const filteredAndSortedHoldings = useMemo(() => {
    let filtered = holdings.filter(holding =>
      holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.sector.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [holdings, searchTerm, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="card holdings-table">
      <h2>
        <Table size={20} />
        Portfolio Holdings
      </h2>
      
      <div className="table-controls">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by symbol, name, or sector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="sort-controls">
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="symbol">Symbol</option>
            <option value="name">Name</option>
            <option value="sector">Sector</option>
            <option value="value">Value</option>
            <option value="gainLoss">Gain/Loss</option>
            <option value="gainLossPercent">Performance %</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              padding: '0.5rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('symbol')} style={{ cursor: 'pointer' }}>
              Symbol {sortBy === 'symbol' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
              Company Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>Quantity</th>
            <th>Avg Price</th>
            <th>Current Price</th>
            <th onClick={() => handleSort('value')} style={{ cursor: 'pointer' }}>
              Market Value {sortBy === 'value' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('gainLoss')} style={{ cursor: 'pointer' }}>
              Gain/Loss {sortBy === 'gainLoss' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('gainLossPercent')} style={{ cursor: 'pointer' }}>
              Performance % {sortBy === 'gainLossPercent' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('sector')} style={{ cursor: 'pointer' }}>
              Sector {sortBy === 'sector' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedHoldings.map((holding, index) => (
            <tr key={holding.symbol}>
              <td className="symbol">{holding.symbol}</td>
              <td className="name">{holding.name}</td>
              <td>{holding.quantity.toLocaleString()}</td>
              <td>{formatCurrency(holding.avgPrice)}</td>
              <td>{formatCurrency(holding.currentPrice)}</td>
              <td>{formatCurrency(holding.value)}</td>
              <td className={holding.gainLoss >= 0 ? 'positive' : 'negative'}>
                {formatCurrency(holding.gainLoss)}
              </td>
              <td className={holding.gainLossPercent >= 0 ? 'positive' : 'negative'}>
                {formatPercentage(holding.gainLossPercent)}
              </td>
              <td className="sector">{holding.sector}</td>
              <td className="market-cap">{holding.marketCap}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredAndSortedHoldings.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          No holdings found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
