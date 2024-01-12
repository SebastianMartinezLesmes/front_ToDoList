import React, {useState, useEffect} from 'react';
import { FaEye } from 'react-icons/fa'; //<FaEye />

import './Admin.css';

function Admin(){

  useEffect(() => {
    // Llamamos a la función getUser y getList al montar el componente
    getUser();
    getList();
    getLocalStorage();
  }, []);
  
//funcionalidad para crear usuarios
    const [emailC, setEmailC] = useState("");
    const [nameC, setNameC] = useState("");
    const [pswC, setPswC] = useState("");

// aca un metodo que trae los usuarios y los buarda en setUsuariosDB
  const urlUsers = 'http://localhost:5000/getUser';
  
  async function getUser() {
    try {
      const response = await fetch(urlUsers);
      if (!response) {
        throw new Error('Error al obtener los datos');
      }
      console.log(response)
      const data = await response.json();
      // Actualizamos el estado con los datos obtenidos
      setUsuariosDB(data);
      console.log(usuariosDB)
    } catch (error) {
      console.error('Error:', error);
    }
  }
//array de prueba Usuarios
  const [usuariosDB,setUsuariosDB] = useState([])

// aca un metodo que trae los usuarios y los guarda en setTareasDB
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
      console.log(tareasDB)
    } catch (error) {
      console.error('Error:', error);
    }
  }
//array de prueba Tareas
  const [tareasDB,setTareasDB] = useState([]);

  const [filtro,setFiltro] = useState([])
  const [worksFiltro,setWorksFiltro] = useState('')

// funcion para filtrar
  const [msg,setMsg] = useState('all')
  async function allList() {
    setFiltro(tareasDB);
    setMsg('all')
  }
  
  async function allListComplete() {
    setFiltro(tareasDB);
    setFiltro(tareasDB.filter(tareas => tareas.state === 1));
    setMsg('all')
  }
  
  async function allListPending() {
    setFiltro(tareasDB);
    setFiltro(tareasDB.filter(tareas => tareas.state === 0));
    setMsg('all')
  }

  async function doFilter() {
    if (worksFiltro === '') {
      setFiltro(tareasDB);
      setMsg('all')
    } else {
      const filtered = tareasDB.filter(tarea =>
        (usuariosDB.find(user => user.idUser === tarea.idUserFK)?.nameUser.toLowerCase().includes(worksFiltro.toLowerCase()))
        );
        
        if (filtered.length !== 0) {
          setMsg('one')
          setFiltro(filtered);
        } else {
          const notUser = [{ idUserFK: null, nameList: 'Tarea no encontrada', state: null }];
        setFiltro(notUser);
      }
    }
  }

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

  const administradoresCount = usuariosDB.filter(usuario => usuario.role === 'administrador').length;
  const clientCount = usuariosDB.filter(usuario => usuario.role === 'client').length;
  const usersActiveCount = usuariosDB.filter(usuario => usuario.state === 'activo').length;
  const usersInactiveCount = usuariosDB.filter(usuario => usuario.state === 'inactivo').length;
  
  const listComplete = filtro.filter(tareas => tareas.state === 1).length;
  const listincomplete = filtro.filter(tareas => tareas.state === 0).length;

  const [showAdmin, setShowAdmin] = useState('list');
  const [vista,setVista] = useState('');

    return(
        <>
          <div id='admin_page'>
            <div id='soyYo' key={yo.idUser}>
              Admin: {yo.nameUser}
            </div>
            <div id='butns'>
              <button id='button1' onClick={() => setShowAdmin('users')}>usuarios</button> 
              <button id='button2' onClick={() => setShowAdmin('list')}>tareas</button> 
            </div>
            <table>

              {showAdmin === 'users' && (
                <> 
                  <button id='buttonC' onClick={() => setVista('')}>Nada</button>
                  <button id='buttonT' onClick={() => setVista('todos')}>Todos</button>
                  <button id='buttonE' onClick={() => setVista('state')}>Estados</button>
                  <button id='buttonR' onClick={() => setVista('rol')}>Roles</button>
                  {vista === 'todos' && (
                    <>
                      <h4> Total de Usuarios:  </h4> 
                      <h4>{usuariosDB.length}  </h4> 
                    </>
                  )}
                  {vista === 'state' && (
                    <>
                      <h4> Activos: {usersActiveCount}</h4>
                      <h4> Inactivos: {usersInactiveCount}</h4>
                    </>
                  )}
                  {vista === 'rol' && (
                    <>
                      <h4> Administradores: {administradoresCount} </h4>
                      <h4> Clientes: {clientCount} </h4>
                    </>
                  )}
                  <div id='contentUsers'>
                    {usuariosDB.map((usuario, index) => (
                      <div key={index} id='listUsers'>
                        <p id='cont'>{(index + 1).toString().padStart(2, '0')}</p>
                        <p id='stateUser'> {usuario.state}</p>
                        <p id='nameUserAdmin'> {usuario.nameUser}</p> 
                      </div>
                    ))}
                  </div>
                </>
              )}
              {showAdmin === 'list' && (
                <>
                  {msg === 'all' && (
                    <>
                    <div class="grid-container">
                      <div id='f'>
                        <div class="grid-item"> <p>Creadas</p> <span> {filtro.length}</span> </div>
                        <div class="grid-item"> <p>Completadas</p> <span> {listComplete}</span> </div>
                        <div class="grid-item"> <p>Pendientes</p> <span> {listincomplete}</span></div>
                      </div>
                    </div>
                  </>
                  )}
                  {msg === 'one' && (
                    <>
                      <div class="grid-container">
                        <div id='f'>
                          <div class="grid-item"> <p>usuario</p> <span>{worksFiltro}</span> </div>
                          <div class="grid-item"> <p>Creadas</p> <span> {filtro.length}</span> </div>
                          <div class="grid-item"> <p>Completadas</p> <span> {listComplete}</span> </div>
                          <div class="grid-item"> <p>Pendientes</p> <span> {listincomplete}</span></div>
                        </div>
                      </div>
                    </>
                  )}

                  <div id='serach_filter'>
                    <p id='miniFilters'>
                      <button onClick={allList}>Todas las tareas</button>
                      <button onClick={allListComplete}>Tareas completadas</button>
                      <button onClick={allListPending}>Tareas pendientes</button>
                    </p>
                    <span>
                      <label>Busqueda: </label>
                      <input type='text' placeholder='Nombre del usuario' onChange={(e) => setWorksFiltro(e.target.value)}></input>
                      <button onClick={doFilter}>Filtrar</button>
                    </span>
                  </div>

                  <div id='contentList_C'>
                    {filtro.map((tarea, index) => {
                      const usuario = usuariosDB.find(user => user.idUser === tarea.idUserFK); // Busca el usuario correspondiente a la tarea actual

                      return (
                        <>
                          <div id='contentList' key={index}>
                            <span id='count'>{(index + 1).toString().padStart(2, '0')} </span>
                            <p> {usuario ? usuario.nameUser : ''}  </p>
                            {tarea.state === 1 &&( <p> {tarea.state === 1 ? 'Completada' : ''} </p> )}
                            {tarea.state === 0 &&( <p> {tarea.state === 0 ? 'Pendiente' : ''} </p> )}
                            {tarea.state === null &&( <p> {tarea.state === null ? 'no Encontrado' : ''} </p> )}
                            <p id='nameWorkList'> {tarea.nameList} </p>                            
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              )}

            </table>
          </div>
        </>
    );
}
export default Admin;