import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

function Barra({ tareas }) {
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
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const uniqueUserIds = new Set();

  for (const tarea of tareas) {
    uniqueUserIds.add(tarea.idUserFK);
  }

  const labels = Array.from(uniqueUserIds);
  labels.sort((a, b) => a - b);// ordenar de menor a mayor

  const data = {
    datasets: [
      {
        label: 'Completas',
        data: labels.map(userId => tareas.filter(tarea => tarea.idUserFK === userId && tarea.state === 1).length),
        backgroundColor: 'rgba(44, 98, 175, 0.599)',
      },
      {
        label: 'Incompletas',
        data: labels.map(userId => tareas.filter(tarea => tarea.idUserFK === userId && tarea.state === 0).length),
        backgroundColor: 'rgba(4, 110, 105, 0.299)',
      },
      {
        label: 'Creadas',
        data: labels.map(userId => tareas.filter(tarea => tarea.idUserFK === userId).length),
        backgroundColor: 'rgba(53, 12, 235, 0.5)',
      },
    ],
    labels: labels.map(userId => usuariosDB.find(user => user.idUser === userId)?.nameUser || `User ${userId}`),
  };

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

  return <Bar options={options} data={data} />;
}

export default Barra;
