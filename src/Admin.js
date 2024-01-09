import React, {useState, useEffect} from 'react';
import './Admin.css';

function Admin(){

  useEffect(() => {
    // Llamamos a la función getUser y getList al montar el componente
    getUser();
    getList();
  }, []);

    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    const submitLogin =()=>{
    const data = {
        email: email,
        passwordUser:psw,
    }
    console.log(data);
    }
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

    //funcionalidad para crear tareas
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const createWork = () =>{
    const data = {
      nameList: title,
      nameUser: yo[0].nameUser,
      idUser: yo[0].idUser,
    }

  // Actualizar el estado (setTareasDB) para que React sepa que ha cambiado
  setTareasDB((prevTareas) => [...prevTareas, data]);
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
      console.log(tareasDB)
    } catch (error) {
      console.error('Error:', error);
    }
  }
//array de prueba Tareas
  const [tareasDB,setTareasDB] = useState([]);

//array de prueba con mis datos
  const [yo,setYo] = useState([{idUser: 0,  nameUser: '', role: ''}]);

  const [showU, setShowU] = useState(false);
  const [showL, setShowL] = useState(false);

    return(
        <>
            <div id='admin_page'>
                <table>
                <tr>
                    {yo.map((user) => (
                    <th key={user.idUser}>Admin: {user.nameUser}</th>
                    ))}
                    <th></th>
                    <th> <button onClick={() => setShowU(!showU)}>usuarios</button> </th>
                    <th> <button onClick={() => setShowL(!showL)}>tareas</button> </th>
                </tr>
                {showU && (
                  <>
                  <h3>Usuarios</h3>
                    <tr>
                      <th></th>
                      <th>nombre usuario</th>
                      <th>Correo usuario</th>
                      <th>estado</th>
                    </tr>
                    {usuariosDB.map((usuario, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <th>{usuario.nameUser}</th>
                        <th>{usuario.email}</th>
                        <th>{usuario.state !== 0 ? 'Activo' : 'Inactivo'}</th>
                      </tr>
                    ))}
                  </>
                )}
                {showL && (
                  <>
                    <h3>Tareas</h3>
                    <tr>
                        <th></th>
                        <th>nombre usuario</th>
                        <th>nombre tarea</th>
                        <th> estado</th>
                    </tr>
                    {tareasDB.map((tarea, index) => {
                      // Busca el usuario correspondiente a la tarea actual
                      const usuario = usuariosDB.find(user => user.idUser === tarea.idUserFK);

                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <th>{usuario ? usuario.nameUser : 'Usuario no encontrado'} </th>
                          <th>{tarea.nameList}</th>
                          <th>{tarea.state !== 0 ? 'Complata' : 'Incompleta'}</th>
                        </tr>
                      );
                    })}
                  </>
                )}

                </table>
            </div>
        </>
    );
}
export default Admin;