import React, { useState, useEffect } from 'react';
import './personajes.css'
import Spider from './personajes/Spider';
import infoPersonajes from 'C:/Users/jmartinezl/Desktop/toDoList_React/notas/src/personajes/people.json';

function Personajes() {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    // Simulación de carga de datos desde el archivo JSON
    setPersonajes(infoPersonajes);
  }, []);

  return (
    <>
      <h1>Listado de Personajes</h1>
      {personajes.map((personaje) => (
        <div key={personaje.id} id='all'>
          <div id='personajes_left'>
            <h2>{personaje.sobreNombre}</h2>
            <img src={personaje.imagenUrl} alt={personaje.sobreNombre} />
          </div>
          <div id='desc_right'>
            <p>Raza: {personaje.raza}</p>
            <p>Poder: {personaje.poder}</p>
            {personaje.edad > 1 ? <p>edad: {personaje.edad} años</p> : <p>edad: {personaje.edad} año</p>}
            
            <p>altura: {personaje.altura}</p>
            <p>peso: {personaje.peso}</p>
            <p>genero: {personaje.genero}</p>
            {/* Agregar más detalles según tus necesidades */}
          </div>
          <div id='estadisticas'>
            <Spider datos={personaje} />
          </div>
          
        </div>
      ))}
    </>
  );
}

export default Personajes;
