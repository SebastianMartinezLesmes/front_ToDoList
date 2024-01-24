import React from 'react';
import { Radar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

function Spider({ datos }) {

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  
  const { fuerza, velocidad, resistencia, agilidad, defensa } = datos;

  const data = {
    labels: ['Fuerza', 'Velocidad', 'Resistencia', 'Agilidad', 'Defensa'],
    datasets: [
      {
        label: 'Atributos',
        data: [fuerza, velocidad, resistencia, agilidad, defensa],
        backgroundColor: 'rgba(4, 0, 255, 0.199)',
        borderColor: 'rgba(4, 0, 255, 0.799);',
        borderWidth: 0,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        max: 10,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(4, 0, 205, 1)', // Cambia el color de la letra a blanco
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
}

export default Spider;
