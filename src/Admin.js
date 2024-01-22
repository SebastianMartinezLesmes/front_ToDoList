import React, {useState, useEffect} from 'react';
import { FaEye } from 'react-icons/fa'; //<FaEye />
import './Admin.css';

import Polar from './estadistics/Polar'//Diagrama polar
import Dona from './estadistics/Dona';//Diagrama dona
import Barra from './estadistics/Barra';//Diagrama barra
import Points from './estadistics/Puntos';//Diagrama puntos
import Spider from './estadistics/Spider';//Diagrama radar(Spider)

function Admin(){

  const [usuariosDB,setUsuariosDB] = useState([]) // usuarios
  const [tareasDB,setTareasDB] = useState([]); // tareas

  const [filtro,setFiltro] = useState([]) // filtro de tareas
  const [filtroU,setFiltroU] = useState([]) // filtro de usuarios
  const [worksFiltro,setWorksFiltro] = useState('') // palabras para filtrar tareas
  const [nameUsuario,setNameUsuario] = useState('') // palabras para filtrar usuarios
  const [yo,setYo] = useState([]); //array de prueba con mis datos

  const [notUser,setNotUser] = useState(false) // si no encuentra usuario muestra un nmensaje

  const administradoresCount = usuariosDB.filter(usuario => usuario.role === 'administrador').length; // contador de cuantos usuarios tienen el rol administrador
  const clientCount = usuariosDB.filter(usuario => usuario.role === 'client').length; // contador de cuantos usuarios tienen el rol cliente
  const usersActiveCount = usuariosDB.filter(usuario => usuario.state === 'activo').length; // contador de cuantos usuarios tienen el estado activo
  const usersInactiveCount = usuariosDB.filter(usuario => usuario.state === 'inactivo').length; // contador de cuantos usuarios tienen el estado inactivo
  
  const listComplete = filtro.filter(tareas => tareas.state === 1).length; // contador de cuantas tareas estan completas
  const listincomplete = filtro.filter(tareas => tareas.state === 0).length; // contador de cuantas tareas estan incompletas

  const [showAdmin, setShowAdmin] = useState('users'); // abre en el administrador la ventana de los usuarios
  const [vista,setVista] = useState(''); // aca un filtro para los usuarios

  // Llamamos a useEffect al montar el componente
  useEffect(() => {
    getUser();
    getList();
    getLocalStorage();
    doFilter();
  }, []);

  // aca un metodo que trae los usuarios y los buarda en setUsuariosDB
  const urlUsers = 'http://localhost:5000/getUser';
  async function getUser() {
    try {
      const response = await fetch(urlUsers);
      if (!response) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      setUsuariosDB(data);
      setFiltroU(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // aca un metodo que trae las tareas y los guarda en setTareasDB
  const UrlList = 'http://localhost:5000/getList';
  async function getList() {
    try {
      const response = await fetch(UrlList);
      if (!response) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      setTareasDB(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

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

  // funcion para filtrar todos los usuarios por nombre
  async function allUsersForName() {
    if(nameUsuario !== ''){
      setFiltroU(usuariosDB.filter(users => users.nameUser.toLowerCase() === nameUsuario.toLowerCase()));
    }
    else{
      setFiltroU(usuariosDB);
      setMsg('all')
    }
  }

  // funcion para filtrar las tareas por el nombre que escoja el usuario
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
        setNotUser(true);
        setTimeout(() => {
          setNotUser(false);
        }, 6000);
        setTimeout(()=>{
          setFiltro(tareasDB);
        }, 6010)
      }
    }
  }

  // aca se trae la informacion del locaStorage
  async function getLocalStorage (){
    const usuarioEnLocalStorage = localStorage.getItem('usuarioEncontrado');
    if (usuarioEnLocalStorage) {
      const usuarioDesdeLocalStorage = JSON.parse(usuarioEnLocalStorage); // Convertir la cadena JSON a un objeto JavaScript
      setYo(usuarioDesdeLocalStorage)
      console.log('Usuario encontrado en localStorage:', usuarioDesdeLocalStorage);
    }
  }

  // funcion para abrir la ventana de tareas
  function passList (){
    setShowAdmin('list') 
    setFiltro(tareasDB)
  }

  // funcion para abrir la ventana de usuarios
  function passUsers (){
    setShowAdmin('users')
    setFiltroU(usuariosDB);
  }

  //funcion para mini ventana de todos los usuarios
  function getAllU(){
    allUsers();
    if (vista === 'todos'){
      setVista('');
    }
    else{
      setVista('todos');
    }
  }

  //funcion para mini ventana de todos los usuarios por estado
  function getState(){
    if (vista === 'state'){
      setVista('');
    }
    else{
      setVista('state');
    }
  }

  //funcion para mini ventana de todos los usuarios por rol
  function getRole(){
    if (vista === 'rol'){
      setVista('');
    }
    else{
      setVista('rol');
    }
  }

  // funcion para mini ventana con el diagrama de barras
  const [grafic,setGrafic] = useState('barras');
  function graficBar (){
    if (grafic !== 'barras'){
      setGrafic('barras')
    }
  }

  // funcion para mini ventana con el diagrama de puntos
  function graficPoints (){
      if (grafic !== 'points'){
      setGrafic('points')
    }
  }
  
  // funcion para mini ventana con el diagrama de dona
  function graficDonut (){
    if (grafic !== 'donut'){
    setGrafic('donut')
    }
  }

  // funcion para mini ventana con el diagrama de zona polar
  function graficPolar (){
    if (grafic !== 'polar'){
    setGrafic('polar')
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
                  <label>buscar</label>
                  <input placeholder='Buscar por nombre' type='text' onChange={(e)=> setNameUsuario(e.target.value)}></input>
                  <button onClick={allUsersForName}>filtrar</button>
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
            
            <div id='grafics_list'>
              <div id='options_grafics'>
                <p>graficas</p>
                <button onClick={graficBar}>Barras</button>
                <button onClick={graficPoints}>Puntos</button>
                <button onClick={graficDonut}>Dona</button>
                <button onClick={graficPolar}>Zona polar</button>
              </div>
              <div id='grafic_list'>

                <div id='gra'> 
                  {grafic === 'points' &&( <Points tareas={tareasDB}/> )} 
                  {grafic === 'barras' &&( <Barra tareas={tareasDB}/> )}
                  {grafic === 'donut' &&( <Dona tareas={tareasDB}/> )}
                  {grafic === 'polar' &&( <Polar tareas={tareasDB}/> )}
                  {grafic === '' &&( <p>Escoje una grafica </p> )}
                </div>
                
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Admin;