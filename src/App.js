import React, { useState } from 'react';
import ChartComponent from '../src/Components/chart'
import './App.css'

const App = () => {
  const [timeframe, setTimeframe] = useState('daily');

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <div>
      <div className='app-container'>
        <h1>Charting App</h1>
        <div className='timeframe-container'>
          <button onClick={() => handleTimeframeChange('daily')}>Daily</button>
          <button onClick={() => handleTimeframeChange('weekly')}>Weekly</button>
          <button onClick={() => handleTimeframeChange('monthly')}>Monthly</button>
        </div>

      </div>
      <ChartComponent timeframe={timeframe} />
    </div>

  );
};

export default App;
