import React, {useState, useEffect} from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

function Polar({tareas}) {

    const listComplete = tareas.filter(tareas => tareas.state === 1).length;
    const listincomplete = tareas.filter(tareas => tareas.state === 0).length;

    useEffect(() => {
        //aca se colocas mas funciones
    }, []);

    ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
    const data = {
        labels: ['Completas', 'Incompletas'],
        datasets: [
        {
            label: '# of Votes',
            data: [listComplete, listincomplete],
            backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            ],
            borderWidth: 1,
        },
        ],
    };
    return (
        <>
            <PolarArea data={data} />
        </>
    );
}

export default Polar;
