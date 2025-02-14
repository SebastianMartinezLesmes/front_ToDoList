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
  const [date,setDate] = useState("0000-00-00");
  const [msgDate,msgSetDate] = useState(false);
  const [msgTitle,setMsgTitle] = useState(false);
  const [msgDesc,setMsgDesc] = useState(false);
  const [hecha,setHecha] = useState(false)

  const createWork = async () => {
    if(title === '' || desc === ''){
      //mensaje para titulo
      if ( title === '' ){ setMsgTitle(true); } else { setMsgTitle(false); }
      //mensaje para descripcion
      if ( desc === '' ){ setMsgDesc(true); } else { setMsgDesc(false); }
      //mensaje para la fecha
      if ( date === '' ){ msgSetDate(true); } else { msgSetDate(false); }
      
      setTimeout(() => {
        setMsgTitle(false);
        setMsgDesc(false);
        setMsgDesc(false);
      }, 1500);
      return; // Evitar continuar si hay campos vacios
    }  
    const url = 'http://localhost:5000/createList';
    const data = {
      idList: tareasDB.length + 1,
      nameList: title,
      description: desc,
      idUserFK: yo.idUser,
      date: date,
    };
    console.log(data)
    try {
      // Enviar la solicitud POST al servidor
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      // Verificar si la solicitud fue exitosa (código 200)
      if (response.ok) {
        // Actualizar el estado (setTareasDB) para que React sepa que ha cambiado
        setTareasDB((prevTareas) => [...prevTareas, data]);
        setHecha(true)

        setTitle ('')
        setDesc ('')
        setDate('')

        setTimeout(() => {
          setHecha(false);
        }, 3000);
        // Actualizar el estado (setTareasDB_2) para que React sepa que ha cambiado
        setTareasDB_2((prevTareas) => [...prevTareas, data]);
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
      await axios.delete(urlDeleteList);
      getList();
    } catch (error) {
      console.error('error de peticion', error);
    }
  }

  // update state
  async function update(id) {
    let urlUpdateList = `http://localhost:5000/updateList/${id}`;
    try {
      await axios.put(urlUpdateList);
      getList();
    } catch (error) {
    }
  }
//  Update data
const [updateTaskForm,setUpdateTaskForm] = useState(false);

const [selectedTask, setSelectedTask] = useState("");
const [titleSelected,setTitleSelected] = useState("");
const [descSelected,setDescSelected] = useState("");
const [dateSelected,setDateSelected] = useState("0000-00-00");

  function showUpdate (tarea){
    // console.log(tarea._id)
    setSelectedTask(tarea._id)
    setTitleSelected(tarea.nameList)
    setDescSelected(tarea.description)
    setDateSelected(tarea.date)
    setUpdateTaskForm(true);
  }

  async function updateData() {
    const data = {
        nameList: titleSelected,
        description: descSelected,
        date: dateSelected,
    };
    console.log(data);
    let urlUpdateListData = `http://localhost:5000/updateListData/${selectedTask}`;
    try {
        const response = await fetch(urlUpdateListData, {
            method: 'PUT', // Método HTTP para actualizar datos
            headers: {
              'Content-Type': 'application/json', // Indicar que el cuerpo de la solicitud es JSON
            },
            body: JSON.stringify(data), // Convertir el objeto de datos a JSON
        });

        if (!response.ok) {
          // Manejar errores HTTP
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const result = await response.json(); // Procesar la respuesta como JSON
        console.log('Datos actualizados:', result);
        getList(); // Actualizar la lista después de una solicitud exitosa
        setUpdateTaskForm(false); // Cerrar el formulario de actualización
    } catch (error) {
        console.error('Fallo al actualizar los datos:', error);
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
      // console.log('Usuario encontrado en localStorage:', usuarioDesdeLocalStorage);
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
            <div> 
              {msgDate === true ? (<span> Fecha es requerida</span>): <p> Fecha:</p>}
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
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
                  <th>Contador</th>
                  <th>Nombre tarea</th>
                  <th>Detalle</th>
                  <th>Fecha</th>
                  <th>Editar</th>
                  <th>Completar</th>
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
                      <div id="date_finish">
                        {tareas.date}
                      </div>
                    </th>
                    <th>
                      <button class='change-button' onClick={() => showUpdate(tareas)}>Actualizar</button>
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
              {filteredTareas.map((tarea) => (
                <div className='card' key={tarea._id}>
                  <div>
                    <h2 className='card-title'>{tarea.nameList}</h2>
                    <p className='card-date'>{tarea.date}</p>
                    <p className='card-description'>{tarea.description}</p>
                  </div>
                  <div className='card-actions'>
                    {tarea.state !== 1 &&(
                      <button className='update-button' onClick={() => update(tarea._id)}>
                         <AiOutlineCheckCircle /> 
                      </button>
                    )}
                    <button className='change-button' onClick={() => showUpdate(tarea)}>Editar</button>
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
                    {tarea.state === 1 &&( <p className='card-state'> {tarea.state === 1 ? 'Completada' : ''} </p> )}
                    {tarea.state === 0 &&( <p className='card-state'> {tarea.state === 0 ? 'Pendiente' : ''} </p> )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {updateTaskForm && (
          <div id='updateForm'>
            <h3>Formulario de actualización</h3>
            <div>
              <label>Título:</label>
              <input type="text" value={titleSelected} onChange={(e) => setTitleSelected(e.target.value)}/>
            </div>
            <div>
              <label>Descripción:</label>
              <textarea value={descSelected} onChange={(e) => setDescSelected(e.target.value)}/>
            </div>
            <div>
              <label>Fecha:</label>
              <input type="date" value={dateSelected} onChange={(e) => setDateSelected(e.target.value)}/>
            </div>
            <div>
              <button id='act' onClick={() => updateData()}>Actualizar</button>
              <button id='can' onClick={() => setUpdateTaskForm(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
  
}

export default Client;
