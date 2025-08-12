import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { Sun, Moon } from 'lucide-react';
import PortfolioOverview from './components/PortfolioOverview';
import AssetAllocation from './components/AssetAllocation';
import HoldingsTable from './components/HoldingsTable';
import PerformanceChart from './components/PerformanceChart';
import TopPerformers from './components/TopPerformers';
import AiInsights from './components/AiInsights';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

// Create theme context
const ThemeContext = createContext();

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

function App() {
  const [holdings, setHoldings] = useState([]);
  const [allocation, setAllocation] = useState({});
  const [performance, setPerformance] = useState({});
  const [summary, setSummary] = useState({});
  const [aiInsights, setAiInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const themeValue = {
    isDarkMode,
    toggleTheme: () => setIsDarkMode(!isDarkMode)
  };

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);

      const baseURL = process.env.NODE_ENV === 'production' 
        ? 'https://your-render-app.onrender.com' 
        : 'http://localhost:5000';

      const [holdingsRes, allocationRes, performanceRes, summaryRes, insightsRes] = await Promise.all([
        axios.get(`${baseURL}/api/portfolio/holdings`),
        axios.get(`${baseURL}/api/portfolio/allocation`),
        axios.get(`${baseURL}/api/portfolio/performance`),
        axios.get(`${baseURL}/api/portfolio/summary`),
        axios.get(`${baseURL}/api/portfolio/ai-insights`)
      ]);

      setHoldings(holdingsRes.data);
      setAllocation(allocationRes.data);
      setPerformance(performanceRes.data);
      setSummary(summaryRes.data);
      setAiInsights(insightsRes.data);
    } catch (err) {
      console.error('Error fetching portfolio data:', err);
      setError('Failed to load portfolio data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchPortfolioData} />;
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
        <header className="header">
          <div className="header-content">
            <h1 className="header-title">
              📊 Portfolio Analytics Dashboard
            </h1>
            <button
              className="theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        <main className="main-content">
          <PortfolioOverview summary={summary} />
          
          <div className="charts-section">
            <AssetAllocation allocation={allocation} />
            <PerformanceChart performance={performance} />
          </div>
          
          <div className="bottom-section">
            <HoldingsTable holdings={holdings} />
            <TopPerformers summary={summary} />
          </div>

          <AiInsights insights={aiInsights?.insights} source={aiInsights?.source} />
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
