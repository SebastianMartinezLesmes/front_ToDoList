import React, { useState, useEffect } from 'react';
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

  const [usuariosDB, setUsuariosDB] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const urlUsers = 'http://localhost:5000/getUser';

  async function getUser() {
    try {
      const response = await fetch(urlUsers);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      setUsuariosDB(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

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
    labels: labels.map(userId => usuariosDB.find(user => user.idUser === userId)?.nameUser || `User ${userId}`),
    datasets: [
      {
        label: 'Completadas',
        data: labels.map(userId => tareas.filter(tarea => tarea.idUserFK === userId && tarea.state === 1).length),
        borderColor: 'rgba(44, 98, 175, 0.8)',
        backgroundColor: 'rgba(67, 99, 175, 1)',
      },
      {
        label: 'pendientes',
        data: labels.map(userId => tareas.filter(tarea => tarea.idUserFK === userId && tarea.state === 0).length),
        borderColor: 'rgb(53, 162, 235, 0.8)',
        backgroundColor: 'rgba(4, 110, 105, 1)',
      },
      {
        label: 'Creadas',
        data: labels.map(userId => tareas.filter(tarea => tarea.idUserFK === userId).length),
        borderColor: 'rgb(53, 12, 235, 0.3)',
        backgroundColor: 'rgba(53, 12, 235, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
}

export default Points;