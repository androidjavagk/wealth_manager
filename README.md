# 📊 Portfolio Analytics Dashboard

A comprehensive portfolio analytics dashboard that gives investors a complete view of their investment portfolio. Built with React.js frontend and Node.js/Express backend.

## 🌐 Live Demo

**🔗 [View Live Application](https://wealth-manager-2.onrender.com/)**

Experience the full portfolio analytics dashboard with interactive charts, real-time data, and responsive design.

## ✨ Features

### 📈 Portfolio Overview
- **Total Portfolio Value** - Real-time market value display
- **Total Gain/Loss** - Color-coded profit/loss indicators
- **Portfolio Performance** - Percentage return on investment
- **Number of Holdings** - Total stocks in portfolio

### 🎯 Asset Allocation
- **Sector Distribution** - Interactive pie chart showing sector breakdown
- **Market Cap Distribution** - Visual split between Large/Mid/Small cap stocks
- **Interactive Elements** - Hover effects with exact values and percentages

### 📋 Holdings Management
- **Sortable Table** - Sort by gains, value, symbol, sector, etc.
- **Search/Filter** - Find specific stocks quickly
- **Color Coding** - Green/red for positive/negative performance
- **Responsive Design** - Works on desktop and mobile

### 📊 Performance Analytics
- **Timeline Visualization** - Portfolio vs Nifty 50 vs Gold performance
- **Interactive Charts** - Hover to see exact values at different time points
- **Performance Metrics** - 1 month, 3 months, 1 year returns comparison

### 🏆 Top Performers
- **Best Performer** - Highlight biggest winner
- **Worst Performer** - Show biggest loser
- **Key Insights** - Diversification score and risk level

### 🌙 Theme Support
- **Dark/Light Mode** - Toggle between themes
- **Responsive Design** - Mobile-friendly interface
- **Modern UI** - Clean and intuitive design

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface framework
- **Recharts** - Charting library for data visualization
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library
- **CSS Variables** - Dynamic theming system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Serverless-http** - Vercel deployment support

## 📁 Project Structure

```
portfolio-analytics-dashboard/
├── server/
│   ├── index.js              # Express server with API endpoints
│   └── data/
│       └── portfolioData.js  # Sample portfolio data (15 Indian stocks)
├── client/
│   ├── public/
│   │   └── index.html        # React app entry point
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Global styles and theming
│   │   ├── index.js          # React app initialization
│   │   ├── index.css         # Base styles
│   │   └── components/
│   │       ├── PortfolioOverview.js    # Portfolio metrics cards
│   │       ├── AssetAllocation.js      # Pie charts for allocation
│   │       ├── HoldingsTable.js        # Sortable holdings table
│   │       ├── PerformanceChart.js     # Performance comparison chart
│   │       ├── TopPerformers.js        # Best/worst performers
│   │       ├── LoadingSpinner.js       # Loading state component
│   │       └── ErrorMessage.js         # Error handling component
│   └── package.json          # React dependencies
├── package.json              # Root dependencies and scripts
├── vercel.json              # Vercel deployment configuration
└── README.md                # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start backend server only
- `npm run client` - Start frontend server only
- `npm run build` - Build React app for production
- `npm run install-all` - Install dependencies for both frontend and backend

## 🔌 API Endpoints

### 1. Portfolio Holdings
```
GET /api/portfolio/holdings
```
Returns complete list of user's stock investments with current values and performance.

### 2. Portfolio Allocation
```
GET /api/portfolio/allocation
```
Returns asset distribution by sectors and market cap with percentages.

### 3. Performance Comparison
```
GET /api/portfolio/performance
```
Returns historical performance data vs benchmarks (Nifty 50, Gold).

### 4. Portfolio Summary
```
GET /api/portfolio/summary
```
Returns key portfolio metrics and insights including top/worst performers.

## 📊 Sample Data

The application includes realistic sample data for 15 popular Indian stocks:

- **RELIANCE** - Reliance Industries Ltd (Energy)
- **INFY** - Infosys Limited (Technology)
- **TCS** - Tata Consultancy Services Ltd (Technology)
- **HDFC** - HDFC Bank Ltd (Banking)
- **ICICIBANK** - ICICI Bank Ltd (Banking)
- **ITC** - ITC Limited (Consumer Goods)
- **HINDUNILVR** - Hindustan Unilever Ltd (Consumer Goods)
- **SBIN** - State Bank of India (Banking)
- **BHARTIARTL** - Bharti Airtel Ltd (Telecommunications)
- **AXISBANK** - Axis Bank Ltd (Banking)
- **MARUTI** - Maruti Suzuki India Ltd (Automobile)
- **SUNPHARMA** - Sun Pharmaceutical Industries Ltd (Healthcare)
- **WIPRO** - Wipro Limited (Technology)
- **ULTRACEMCO** - UltraTech Cement Ltd (Construction)
- **TATAMOTORS** - Tata Motors Ltd (Automobile)

## 🎨 Features

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface

### Interactive Elements
- Hover effects on charts and cards
- Sortable and searchable data tables
- Real-time data updates

### Performance Optimizations
- Efficient data filtering and sorting
- Optimized chart rendering
- Minimal re-renders with React hooks

### Error Handling
- Graceful error states
- User-friendly error messages
- Retry mechanisms for failed requests

## 🌐 Deployment

### Vercel Deployment
The application is configured for easy deployment on Vercel:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the configuration
   - Deploy with zero configuration

### Environment Variables
- `NODE_ENV` - Set to "production" for deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for optimal user experience
- Optimized for performance and accessibility

---

**Built with ❤️ by Tanu**
