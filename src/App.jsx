// src/App.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import ParidadPesoDolar from './components/ParidadPesoDolar';
import IndicadoresBMV from './components/IndicadoresBMV';
import ComparativaBMVSP500 from './components/ComparativaBMVSP500';

const App = () => {
  return (
    <div>
      <h1>ChartJS3</h1>
      <ParidadPesoDolar />
      <IndicadoresBMV />
      <ComparativaBMVSP500 />
    </div>
  );
};

export default App;
