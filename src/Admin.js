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
    const createUser = () =>{
      const data = {
          idUser: usuariosDB.length+1,
          role: 'cliente',
          nameUser: nameC,
          email: emailC,
          passwordUser: pswC,
          state: 'activo',
      }
// Actualizar el estado (setTareasDB_2) para que React sepa que ha cambiado
      setUsuariosDB((prevTareas) => [...prevTareas, data]);
        console.log(data);
    }

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

  const [showAdmin, setShowAdmin] = useState('');
  const [vista,setVista] = useState('');

    return(
        <>
          <div id='admin_page'>
            <div id='soyYo' key={yo.idUser}>
              Admin: {yo.nameUser}
            </div>
            <div id='butns'>
              <button onClick={() => setShowAdmin('users')}>usuarios</button> 
              <button onClick={() => setShowAdmin('list')}>tareas</button> 
            </div>
            <table>

              {showAdmin === 'users' && (
                <>
                  <button onClick={() => setVista('todos')}>todos</button>
                  <button onClick={() => setVista('state')}>estados</button>
                  <button onClick={() => setVista('rol')}>roles</button>
                  {vista === 'todos' && (
                    <>
                      <h4> Usuarios: {usuariosDB.length} </h4> 
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
                        <p> {usuario.nameUser}</p> 
                        <p id='stateUser'> {usuario.state}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {showAdmin === 'list' && (
                <>
                  <h3>Tareas Creadas: {tareasDB.length}</h3> 
                  <div id='contentList_C'>
                    {tareasDB.map((tarea, index) => {
                      // Busca el usuario correspondiente a la tarea actual
                      const usuario = usuariosDB.find(user => user.idUser === tarea.idUserFK);
                      return (
                        <div id='contentList' key={index}>
                          <span id='count'>{(index + 1).toString().padStart(2, '0')} </span>
                          <p> {usuario ? usuario.nameUser : 'Usuario no encontrado'}  </p>
                          <p id='nameWorkList'> {tarea.nameList} </p>
                          <p> {tarea.state !== 0 ? 'Completada' : 'Pendiente'} </p> 
                        </div>
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