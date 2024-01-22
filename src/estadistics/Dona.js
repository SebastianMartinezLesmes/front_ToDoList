import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


function Dona({tareas}) {
   
    const listComplete = tareas.filter(tareas => tareas.state === 1).length;
    const listincomplete = tareas.filter(tareas => tareas.state === 0).length;

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['Completas', 'Incompletas'],
        datasets: [
            {
            label: '# de tareas',
            data: [listComplete, listincomplete],
            backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
            },
        ],
    };
        
    return <Doughnut data={data} />;
}

export default Dona;
