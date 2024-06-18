// src/components/ComparativaBMVSP500.jsx
import  { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ComparativaBMVSP500 = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      { label: 'BMV', data: [], borderColor: 'green', backgroundColor: 'rgba(0, 255, 0, 0.1)', borderWidth: 1 },
      { label: 'S&P 500', data: [], borderColor: 'red', backgroundColor: 'rgba(255, 0, 0, 0.1)', borderWidth: 1 }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/bmv_sp500');

        const labels = response.data.dates;
        const bmvValues = response.data.bmv;
        const sp500Values = response.data.sp500;

        setData({
          labels,
          datasets: [
            { ...data.datasets[0], data: bmvValues },
            { ...data.datasets[1], data: sp500Values }
          ]
        });
      } catch (error) {
        console.error('Error al obtener datos para la comparativa', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Comparativa BMV vs S&P 500</h2>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Comparativa BMV vs S&P 500' }
          },
          scales: {
            x: { type: 'category' },
            y: { type: 'linear' }
          }
        }}
      />
    </div>
  );
};

export default ComparativaBMVSP500;
