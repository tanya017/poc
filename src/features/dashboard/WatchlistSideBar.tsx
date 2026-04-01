import React, { useState } from 'react';

const WatchlistSidebar = () => {
  const [activeTab, setActiveTab] = useState('Favorites');
  const tabs = ['Favorites', 'Tech', 'Energy', 'Crypto'];

  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 182.63, change: +1.24, percent: '+0.68%' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 176.54, change: -3.42, percent: '-1.90%' },
    { symbol: 'NVDA', name: 'Nvidia Corp.', price: 894.22, change: +12.15, percent: '+1.38%' },
    { symbol: 'MSFT', name: 'Microsoft', price: 417.32, change: -0.85, percent: '-0.20%' },
    { symbol: 'AMD', name: 'Advanced Micro', price: 170.42, change: +2.11, percent: '+1.25%' },
  ];

  return (
    <aside className="w-80 h-screen bg-[#0B0E11] border-r border-gray-800 flex flex-col text-gray-200 font-sans">
      {/* 1. Watchlist Tabs */}
      <div className="flex px-2 pt-4 border-b border-gray-800 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === tab 
                ? 'border-yellow-500 text-yellow-500' 
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 2. Search Bar */}
      <div className="p-4">
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Symbols"
            className="w-full bg-[#1E2329] border border-transparent rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-yellow-500 transition-colors placeholder-gray-600"
          />
        </div>
      </div>

      {/* 3. List Header */}
      <div className="px-4 py-2 flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-tighter border-b border-gray-800/50">
        <span>Symbol / Name</span>
        <div className="flex gap-10 pr-2">
          <span>Last Price</span>
          <span>Chg%</span>
        </div>
      </div>

      {/* 4. Stock List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {stocks.map((stock) => {
          const isPositive = stock.change >= 0;
          return (
            <div 
              key={stock.symbol}
              className="flex items-center justify-between px-4 py-3 hover:bg-[#1E2329] cursor-pointer border-b border-gray-900 transition-colors"
            >
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-none mb-1">{stock.symbol}</span>
                <span className="text-[11px] text-gray-500">{stock.name}</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className={`text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-500'}`}>
                    {stock.price.toFixed(2)}
                  </div>
                  <div className={`text-[11px] font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-500'}`}>
                    {stock.percent}
                  </div>
                </div>
                
                {/* Minimal "More" Icon (Three Dots) */}
                <div className="text-gray-600 hover:text-white">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default WatchlistSidebar;