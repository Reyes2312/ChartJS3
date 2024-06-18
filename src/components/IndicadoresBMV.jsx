import  { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const IndicadoresBMV = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=RO9HVEOV1JNW6VIH')
      .then(response => {
        const timeSeries = response.data['Time Series (Daily)'];
        const labels = Object.keys(timeSeries);
        const values = labels.map(date => timeSeries[date]['4. close']);
        setData({
          labels,
          datasets: [
            {
              label: 'Indicadores BMV',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        });
      })
      .catch(error => console.error('Error al obtener indicadores de la BMV', error));
  }, []);

  return (
    <div>
      <h2>Indicadores de la BMV</h2>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Indicadores de la BMV' }
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

export default IndicadoresBMV;
