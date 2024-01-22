import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

function Barra({tareas}) {
    
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const uniqueUserIds = new Set();

  for (const tarea of tareas) {
    uniqueUserIds.add(tarea.idUserFK);
  }

  const labels = Array.from(uniqueUserIds);
  labels.sort((a, b) => a - b); // ordenar de menor a mayor
  
  const data = {
    datasets: [
      {
        label: 'Completas',
        data: labels.map(userId => tareas.filter(tarea => tarea.idUserFK === userId && tarea.state === 1).length),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Incompletas',
        data: labels.map(userId => tareas.filter(tarea => tarea.idUserFK === userId && tarea.state === 0).length),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
    labels,
  };
    
  return <Bar options={options} data={data} />;
}

export default Barra;