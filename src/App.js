import React, { useState } from 'react';
import ChartComponent from '../src/Components/chart'
import './App.css'

const App = () => {
  const [timeframe, setTimeframe] = useState('daily');
  return (
    <div className='chart-app-container'>
      <div className='app-container'>
        <h1>Charting App</h1>
        <div className='timeframe-container'>
          <button onClick={() => setTimeframe('daily')}>Daily</button>
          <button onClick={() => setTimeframe('weekly')}>Weekly</button>
          <button onClick={() => setTimeframe('monthly')}>Monthly</button>
        </div>
      </div>
      <ChartComponent timeframe={timeframe} />
    </div>

  );
};

export default App;
