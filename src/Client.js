import React, {useState, useEffect} from 'react';
import { AiOutlineDelete, AiOutlineCheckCircle } from 'react-icons/ai';
import './Client.css';

import axios from 'axios';

function Client() {

  useEffect(() => {
    // Llamamos a la función getUser y getLocalStorage al montar el componente
    getList();
    getLocalStorage();
  }, []);

//funcionalidad para crear tareas
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");

  const createWork = async () => {
    const data = {
      nameList: title,
      nameUser: yo.nameUser,
      idUser: yo.idUser,
    };
  
    const url = 'http://localhost:5000/createList';
    const data2 = {
      idList: tareasDB.length + 1,
      nameList: title,
      description: desc,
      idUserFK: yo.idUser,
    };
    console.log(data2);
    try {
      // Enviar la solicitud POST al servidor
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data2),
      });
  
      // Verificar si la solicitud fue exitosa (código 200)
      if (response.ok) {
        // Actualizar el estado (setTareasDB) para que React sepa que ha cambiado
        setTareasDB((prevTareas) => [...prevTareas, data]);
        // Actualizar el estado (setTareasDB_2) para que React sepa que ha cambiado
        setTareasDB_2((prevTareas) => [...prevTareas, data2]);
      } else {
        console.error('Error al enviar la solicitud');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  async function borrar(id) {
    console.log(id);
    let urlDeleteList = `http://localhost:5000/deleteList/${id}`;
  
    try {
      const response = await axios.delete(urlDeleteList);
      console.log('respuesta exitosa', response);
      getList();
    } catch (error) {
      console.error('error de peticion', error);
    }
  }

  async function update(id) {
    console.log(id);
    let urlUpdateList = `http://localhost:5000/updateList/${id}`;
  
    try {
      const response = await axios.put(urlUpdateList);
      console.log('respuesta exitosa', response.data);
      getList();
    } catch (error) {
      console.error('error de peticion', error);
    }
  }
  
// aca un metodo que trae los usuarios y los buarda en setTareasDB
  const UrlList = 'http://localhost:5000/getList';
  async function getList() {
    try {
      const response = await fetch(UrlList);
      if (!response) {
        throw new Error('Error al obtener los datos');
      }
      console.log(response)
      const data = await response.json();
      // Actualizamos el estado con los datos obtenidos
      setTareasDB(data);
      setTareasDB_2(data);
      console.log(tareasDB);
    } catch (error) {
      console.error('Error:', error);
    }
  }
//array de prueba Tareas
  const [tareasDB,setTareasDB] = useState([]);

//array de prueba Tareas
  const [tareasDB_2, setTareasDB_2] = useState([]);

  const [mostrarLista, setMostrarLista] = useState(true);

  const toggleVista = () => {
    setMostrarLista((prevState) => !prevState);
  };

//array de prueba con mis datos
  const [yo,setYo] = useState([]);

// aca se trae la informacion del locaStorage
  async function getLocalStorage (){
    const usuarioEnLocalStorage = localStorage.getItem('usuarioEncontrado');

    if (usuarioEnLocalStorage) {
      // Convertir la cadena JSON a un objeto JavaScript
      const usuarioDesdeLocalStorage = JSON.parse(usuarioEnLocalStorage);
      setYo(usuarioDesdeLocalStorage)
      // Imprimir en la consola el usuario almacenado en localStorage
      console.log('Usuario encontrado en localStorage:', usuarioDesdeLocalStorage);
    } else {
      console.log('No hay usuario almacenado en localStorage.');
    }
  }

  // Filtrar las tareas que cumplen con la condición
  const filteredTareas = tareasDB_2.filter(tarea => tarea.idUserFK === yo.idUser); //aca esta el error de inicializacion antes de...


  return (
    <>
      <div id='client_page'>

        <h3 key={yo.idUser}>tareas de {yo.nameUser}</h3> <button id='changeMode' onClick={toggleVista}>cambiar vista</button>
        <div id='formClient'>
          <form>
            <h3>Formulario para crear las tareas</h3>
            <div> Título: <input type="text" onChange={(e)=>setTitle(e.target.value)}/> </div>
            <div> Descripción: <textarea id='desc' onChange={(e)=>setDesc(e.target.value)}></textarea> </div>
            <button type='button' onClick={createWork} >Poner tarea</button>
          </form>
        </div>

        <div>
          {!mostrarLista ? (
            <table>
              <thead>
                <tr>
                  <th>contador</th>
                  <th>nombre tarea</th>
                  <th>detalle</th>
                  <th>estado</th>
                  <th>¿Completar?</th>
                  <th>¿Borrar?</th>
                </tr>
              </thead>
              <tbody>
                {filteredTareas.map((tareas, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>
                      <div id='short_tit'>
                        {tareas.nameList}
                      </div>
                    </th>
                    <th>
                      <div id="descrip">
                        {tareas.description}
                      </div>
                    </th>
                    <th id='estate_part'>
                      {tareas.state === 1 &&( <p> {tareas.state === 1 ? 'Completada' : ''} </p> )}
                      {tareas.state === 0 &&( <p> {tareas.state === 0 ? 'Pendiente' : ''} </p> )}
                    </th>
                    <th>
                      {tareas.state !== 1 &&(
                        <button className='update-button' onClick={() => update(tareas._id)}> <AiOutlineCheckCircle /> </button>
                      )}
                    </th>
                    <th>
                      <button className='delete-button' onClick={() => borrar(tareas._id)}> <AiOutlineDelete /> </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div id='content_cards'>
              {filteredTareas.map((tarea, index) => (
                <div className='card' key={tarea._id}>
                  <div className='card-item'>
                    <h2 className='card-title'>{tarea.nameList}</h2>
                    <p className='card-description'>{tarea.description}</p>
                  </div>
                  <div className='card-actions'>
                    {tarea.state !== 1 &&(
                      <button className='update-button' onClick={() => update(tarea._id)}>
                        <AiOutlineCheckCircle />
                      </button>
                    )}
                    <button className='delete-button' onClick={() => borrar(tarea._id)}>
                      <AiOutlineDelete />
                    </button>
                  </div>
                  <div>
                    {tarea.state === 1 &&( <p className='card-description'> {tarea.state === 1 ? 'Completada' : ''} </p> )}
                    {tarea.state === 0 &&( <p className='card-description'> {tarea.state === 0 ? 'Pendiente' : ''} </p> )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
  
}

export default Client;
