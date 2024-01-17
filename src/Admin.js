import React, {useState, useEffect} from 'react';
import { FaEye } from 'react-icons/fa'; //<FaEye />

import './Admin.css';

function Admin(){

  useEffect(() => {
    // Llamamos a la función getUser y getList al montar el componente
    getUser();
    getList();
    getLocalStorage();
    doFilter();
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
  const [filtroU,setFiltroU] = useState([])
  const [worksFiltro,setWorksFiltro] = useState('')

// funcion para filtrar todas las tareas
const [msg,setMsg] = useState('all')
async function allList() {
  setFiltro(tareasDB);
  setMsg('all')
}

// funcion para filtrar todas las tareas completadas
async function allListComplete() {
  setFiltro(tareasDB);
  setFiltro(tareasDB.filter(tareas => tareas.state === 1));
  setMsg('all')
}

// funcion para filtrar todas las tareas pendientes
async function allListPending() {
  setFiltro(tareasDB);
  setFiltro(tareasDB.filter(tareas => tareas.state === 0));
  setMsg('all')
}


// funcion para traer todos los usuarios 
async function allUsers() {
  setFiltroU(usuariosDB);
  setMsg('all')
}
// funcion para filtrar todos los usuarios activos
async function allUsersActive() {
  setFiltroU(usuariosDB);
  setFiltroU(usuariosDB.filter(users => users.state === 'activo'));
  setMsg('all')
}
// funcion para filtrar todos los usuarios inactivos
async function allUsersInactive() {
  setFiltroU(usuariosDB);
  setFiltroU(usuariosDB.filter(users => users.state === 'inactivo'));
  setMsg('all')
}
// funcion para filtrar todos los usuarios administradores
async function allUsersAdmin() {
  setFiltroU(usuariosDB);
  setFiltroU(usuariosDB.filter(users => users.role === "administrador"));
  setMsg('all')
}
// funcion para filtrar todos los usuarios clientes
async function allUsersClient() {
  setFiltroU(usuariosDB);
  setFiltroU(usuariosDB.filter(users => users.role === 'client'));
  setMsg('all')
}


// funcion para filtrar todos los usuarios por nombre ------------------------------------------------------------------------------------
const [nameUsuario,setNameUsuario] = useState('')

async function allUsersForname() {
  if(nameUsuario !== ''){
    setFiltroU(usuariosDB.filter(users => users.nameUser.toLowerCase() === nameUsuario.toLowerCase()));
  }
  else{
    setFiltroU(usuariosDB);
    setMsg('all')
  }
}
// ----------------------------------------------------------------------------------------------------------------
const [notUser,setNotuser] = useState(false)
async function doFilter() {
  if (worksFiltro === '') {
    setFiltro(tareasDB);
    setMsg('all')
  } else {
      const filtered = filtro.filter(tarea =>
        (usuariosDB.find(user => user.idUser === tarea.idUserFK)?.nameUser.toLowerCase().includes(worksFiltro.toLowerCase()))
      );
          
      if (filtered.length !== 0) {
        setMsg('one')
        setFiltro(filtered);
      } else {
        setFiltro([])
        setNotuser(true);
        setTimeout(() => {
          setNotuser(false);
        }, 6000);
        setTimeout(()=>{
          setFiltro(tareasDB);
        }, 6010)
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

  const [showAdmin, setShowAdmin] = useState('users');
  const [vista,setVista] = useState('');

  function passList (){
    setShowAdmin('list') 
    setFiltro(tareasDB)
  }
  function passUsers (){
    setShowAdmin('users')
    setFiltroU(usuariosDB);
  }

  function getAllU(){
    allUsers();
    if (vista === 'todos'){
      setVista('');
    }
    else{
      setVista('todos');
    }
  }

  function getState(){
    if (vista === 'state'){
      setVista('');
    }
    else{
      setVista('state');
    }
  }

  function getRole(){
    if (vista === 'rol'){
      setVista('');
    }
    else{
      setVista('rol');
    }
  }

  return(
    <>
      <div id='admin_page'>
        <div id='soyYo' key={yo.idUser}>
          Admin: {yo.nameUser}
        </div>
        <div id='butns'>
          <button id='button1' onClick={passUsers}>usuarios</button> 
          <button id='button2' onClick={passList}>tareas</button> 
        </div>

        {showAdmin === 'users' && (
          <> 
            <div id='Content_users'>
              <div id='left'>
                
                <button id='buttonT' onClick={getAllU}>Todos</button>
                {vista === 'todos' && (
                  <>
                    <p class='verLook'> Total Usuarios:  {usuariosDB.length} <button class='look' onClick={allUsers}></button></p>  
                  </>
                )}

                <button id='buttonE' onClick={getState}>Estados</button>
                {vista === 'state' && (
                  <>
                    <p class='verLook'> Activos: {usersActiveCount} <button class='look' onClick={allUsersActive}><FaEye /></button></p> 
                    <p class='verLook'> Inactivos: {usersInactiveCount} <button class='look' onClick={allUsersInactive}><FaEye /></button></p>
                  </>
                )}
              
                <button id='buttonR' onClick={getRole}>Roles</button>
                {vista === 'rol' && (
                  <>
                    <p class='verLook'> Admin: {administradoresCount} <button class='look' onClick={allUsersAdmin}><FaEye /></button></p>
                    <p class='verLook'> Clientes: {clientCount} <button class='look' onClick={allUsersClient}><FaEye /></button></p>
                  </>
                )}
              </div>

              <div id='right_content'>

                <div id='find_right'>
                  <label>buscar usuario</label>
                  <input type='text' onChange={(e)=> setNameUsuario(e.target.value)}></input>
                  <button onClick={allUsersForname}>filtrar</button>
                </div>

                <div id='right'>
                  {filtroU.map((usuario) => (
                    <div key={usuario.idUser} id='listUsers'>
                      <p id='cont'>{usuario.idUser.toString().padStart(2, '0')}</p>
                      <p id='stateUser'> {usuario.state}</p>
                      <p id='nameUserAdmin'> {usuario.nameUser}</p> 
                    </div>
                  ))}
                </div>
              </div>
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
                    <div class="grid-item"> <p>encontradas</p> <span> {filtro.length}</span> </div>
                    <div class="grid-item"> <p>Completadas</p> <span> {listComplete}</span> </div>
                    <div class="grid-item"> <p>Pendientes</p> <span> {listincomplete}</span></div>
                  </div>
                </div>
              </>
            )}

            <span id='glogal_contentlist'>
              <div id='serach_filter'>
                <button onClick={allList}>Todas las tareas</button>
                <button onClick={allListComplete}>Tareas completadas</button>
                <button onClick={allListPending}>Tareas pendientes</button>
              </div>

              <div id='right_list'>

                <div id='header_filter'>
                  <label>Busqueda: </label>
                  <input type='text' placeholder='Nombre del usuario' onChange={(e) => setWorksFiltro(e.target.value)}></input>
                  <button onClick={doFilter}>Filtrar</button>
                  {notUser &&(
                    <>
                      <div id='content_error'>
                        <span id='error'> No se encontro ningun usuario que coincida con los parametros de la busqueda, intenta usando otro filtro</span>
                      </div>
                    </>
                  )}
                </div>

                <div id='contentList_C'>
                  {filtro.map((tarea) => {
                    const usuario = usuariosDB.find(user => user.idUser === tarea.idUserFK); // Busca el usuario correspondiente a la tarea actual

                    return (
                      <>
                        <div id='contentList' key={tarea.idUserFK}>
                          <span id='count'>{tarea.idUserFK.toString().padStart(2, '0')} </span>
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

              </div>
            </span>
          </>
        )}

      </div>
    </>
  );
}
export default Admin;