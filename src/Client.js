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
  const [msgTitle,setMsgTitle] = useState(false);
  const [msgDesc,setMsgDesc] = useState(false);
  const [hecha,setHecha] = useState(false)

  const createWork = async () => {
    if(title === '' || desc === ''){
      //mensaje para titulo
      if ( title === '' ){ setMsgTitle(true); } else { setMsgTitle(false); }
      //mensaje para descripcion
      if ( desc === '' ){ setMsgDesc(true); } else { setMsgDesc(false); }
      
      setTimeout(() => {
        setMsgTitle(false);
        setMsgDesc(false);
      }, 2000);
      return; // Evitar continuar si hay campos no llenados
    }
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
        setHecha(true)

        setTitle ('')
        setDesc ('')

        setTimeout(() => {
          setHecha(false);
        }, 3000);
        // Actualizar el estado (setTareasDB_2) para que React sepa que ha cambiado
        setTareasDB_2((prevTareas) => [...prevTareas, data2]);
        getList();
      } else {
        console.error('Error al enviar la solicitud');
      }

    } catch (error) {
      console.error('Error de red:', error);
    }
  };

// logica para confirmar la eliminacion de la tarea
  const [drop, setDrop] = useState(false)

  function changeConfirmDrop (){
    setDrop(true)
    setTimeout(() => {
      setDrop(false);
      setHecha(false);
    }, 3000);
  }

  async function borrar(id) {
    let urlDeleteList = `http://localhost:5000/deleteList/${id}`;
  
    try {
      const response = await axios.delete(urlDeleteList);
      getList();
    } catch (error) {
      console.error('error de peticion', error);
    }
  }

  async function update(id) {
    let urlUpdateList = `http://localhost:5000/updateList/${id}`;
  
    try {
      const response = await axios.put(urlUpdateList);
      getList();
    } catch (error) {
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
      const data = await response.json();
      // Actualizamos el estado con los datos obtenidos
      setTareasDB(data);
      setTareasDB_2(data);
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
      const usuarioDesdeLocalStorage = JSON.parse(usuarioEnLocalStorage);
      setYo(usuarioDesdeLocalStorage)
      console.log('Usuario encontrado en localStorage:', usuarioDesdeLocalStorage);
    } 
  }

  // Filtrar las tareas que cumplen con la condición
  const filteredTareas = tareasDB_2.filter(tarea => tarea.idUserFK === yo.idUser); //aca esta el error de inicializacion antes de...

  return (
    <>
      <div id='client_page'>

        <div id='header'>
          <p key={yo.idUser}>tareas de {yo.nameUser}</p> 
          <button id='changeMode' onClick={toggleVista}>cambiar vista</button>
        </div>

        <div id='formClient'>
          <form>
            <h3>Formulario para crear las tareas</h3>
            <div>
              {msgTitle === true ? (<span> Título es requerido</span>):<p> Título: </p>}
              <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/> 
            </div>
            <div> 
              {msgDesc === true ? (<span> Descripción es requerida</span>): <p> Descripción:</p>}
              <textarea id='desc' value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea> 
            </div>
            <button type='button' onClick={createWork} >Poner tarea</button>
            {hecha &&( <div id='goodmessage'> Tarea creada exitosamente</div>)}
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
                  <th>¿Completar?</th>
                  <th>¿Borrar?</th>
                </tr>
              </thead>
              <tbody>
                {filteredTareas.map((tareas, index) => (
                  <tr key={tareas.idList }>
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

                    <th>
                      {tareas.state !== 1 &&(<button className='update-button' onClick={() => update(tareas._id)}> <AiOutlineCheckCircle /> </button>)}
                      {tareas.state === 1 &&( <p> {tareas.state === 1 ? 'Completada' : ''} </p> )}
                    </th>
                    <th>
                      {drop  === false &&(
                        <>
                          <button className='delete-button' onClick={() => changeConfirmDrop()}>¿Borrar?</button>
                        </>
                      )}
                      {drop &&(
                        <>
                          <button className='delete-button' onClick={() => borrar(tareas._id)}> <AiOutlineDelete /> </button>
                        </>
                      )} 
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div id='content_cards'>
              {filteredTareas.map((tarea, index) => (
                <div className='card' key={tarea._id}>
                  <div>
                    <h2 className='card-title'>{tarea.nameList}</h2>
                    <p className='card-description'>{tarea.description}</p>
                  </div>
                  <div className='card-actions'>

                    {tarea.state !== 1 &&(
                      <button className='update-button' onClick={() => update(tarea._id)}>
                         <AiOutlineCheckCircle /> 
                      </button>
                    )}

                    {drop  === false &&(
                      <>
                        <button className='delete-button' onClick={() => changeConfirmDrop()}>¿Borrar?</button>
                      </>
                    )}
                    {drop &&(
                      <>
                        <button className='delete-button' onClick={() => borrar(tarea._id)}> <AiOutlineDelete /> </button>
                      </>
                    )}

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
