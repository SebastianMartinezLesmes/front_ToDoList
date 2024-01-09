import React, {useState, useEffect} from 'react';
import './Client.css';
import { AiOutlineDelete, AiOutlineCheckCircle } from 'react-icons/ai';

function Client() {

  useEffect(() => {
    // Llamamos a la función getUser y getList al montar el componente
    getList();
  }, []);

    //funcionalidad para crear tareas
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");

  const createWork = async () => {
    const data = {
      nameList: title,
      nameUser: yo[0].nameUser,
      idUser: yo[0].idUser,
    };
  
    const url = 'http://localhost:5000/createList';
    const data2 = {
      idList: tareasDB.length + 1,
      nameList: title,
      description: desc,
      idUserFK: yo[0].idUser,
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

//array de prueba con mis datos
  const [yo,setYo] = useState([{idUser: 6,  nameUser: 'cliente 5',}]);

// Filtrar las tareas que cumplen con la condición
  const filteredTareas = tareasDB_2.filter(tarea => tarea.idUserFK === yo[0].idUser);

  const [mostrarLista, setMostrarLista] = useState(true);

  const toggleVista = () => {
    setMostrarLista((prevState) => !prevState);
  };

  return (
    <>
        <div id='client_page'>

        <div id='formClient'>
        <form>
          <h3>Formulario para crear las tareas</h3>
          <div> Título: <input type="text" onChange={(e)=>setTitle(e.target.value)}/> </div>
          <div> Descripción: <textarea id='desc' onChange={(e)=>setDesc(e.target.value)}></textarea> </div>
          <button type='button' onClick={createWork} >Poner tarea</button>
        </form>
        </div>

        <h3>tareas</h3>
         <div>
      <button onClick={toggleVista}>cambiar vista</button>

      {mostrarLista ? (
        <table>
          <thead>
            <tr>
              <th>contador</th>
              <th>nombre tarea</th>
              <th>nombre descripción</th>
              <th>¿Completada?</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {filteredTareas.map((tareas, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{tareas.nameList}</th>
                <th>{tareas.description}</th>
                <th>
                  <button className='update-button'>
                    <AiOutlineCheckCircle />
                  </button>
                </th>
                <th>
                  <button className='delete-button'>
                    <AiOutlineDelete />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div id='content_cards'>
          {filteredTareas.map((tarea, index) => (
            <div className='card' key={index}>
              <div className='card-item'>
                <h2 className='card-title'>{tarea.nameList}</h2>
                <p className='card-description'>{tarea.description}</p>
              </div>
              <div className='card-actions'>
                <button className='update-button'>
                  <AiOutlineCheckCircle />
                </button>
                <button className='delete-button'>
                  <AiOutlineDelete />
                </button>
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