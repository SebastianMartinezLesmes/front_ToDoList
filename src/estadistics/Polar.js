// import React, {useState, useEffect} from 'react';

// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { PolarArea } from 'react-chartjs-2';

// function GraficPolar() {
//   const UrlList = 'http://localhost:5000/getList';
//   const [tareasDB, setTareasDB] = useState([]);
//   const listComplete = tareasDB.filter(tareas => tareas.state === 1).length;
//   const listincomplete = tareasDB.filter(tareas => tareas.state === 0).length;

//   async function getList() {
//     try {
//       const response = await fetch(UrlList);
//       if (!response.ok) {
//         throw new Error('Error al obtener los datos');
//       }
//       const data = await response.json();
//       setTareasDB(data);
//       console.log(tareasDB);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   useEffect(() => {
//     getList();
//   }, []);

//   ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

//   const data = {
//     labels: ['Completas', 'Incompletas'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [listComplete, listincomplete],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.5)',
//           'rgba(54, 162, 235, 0.5)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <>
//       <PolarArea data={data} />
//     </>
//   );
// }

// export default GraficPolar;
