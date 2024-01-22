import React from 'react';
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
                'rgba(44, 0, 155, 0.299)',
                'rgba(180, 20, 210, 0.199)',
            ],
            borderColor: [
                'rgba(225, 225, 225)',
                'rgba(225, 225, 225)',
            ],
            borderWidth: 1,
            },
        ],
    };
        
    return <Doughnut data={data} />;
}

export default Dona;
