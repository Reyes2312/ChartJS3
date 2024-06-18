import  { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ParidadPesoDolar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://v6.exchangerate-api.com/v6/7afaf7c5a4d0c6be38cbeaf9/latest/USD')
      .then(response => {
        const pesoToDollar = response.data.conversion_rates.MXN;
        setData([pesoToDollar]);
      })
      .catch(error => console.error('Error al obtener la paridad peso/dólar', error));
  }, []);

  return (
    <div>
      <h2>Paridad Peso/Dólar</h2>
      <Line
        data={{
          labels: ['Hoy'],
          datasets: [{
            label: 'Paridad Peso/Dólar',
            data: data,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            borderWidth: 1
          }]
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Paridad Peso/Dólar' }
          }
        }}
      />
    </div>
  );
};

export default ParidadPesoDolar;
