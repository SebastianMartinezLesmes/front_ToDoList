import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

function Points({tareas}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const uniqueUserIds = new Set();

  for (const tarea of tareas) {
    uniqueUserIds.add(tarea.idUserFK);
  }

  const labels = Array.from(uniqueUserIds);
  labels.sort((a, b) => a - b);// ordenar de menor a mayor
    
  const data = {
    labels,
    datasets: [
      {
        label: 'Completadas',
        data: labels.map(userId => tareas.filter(tarea => tarea.idUserFK === userId && tarea.state === 1).length),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'pendientes',
        data: labels.map(userId => tareas.filter(tarea => tarea.idUserFK === userId && tarea.state === 0).length),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
}

export default Points;