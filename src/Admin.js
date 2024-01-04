import React, {useState} from 'react';
import './Admin.css';

function Admin(){

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

    const data2 = {
      idList: tareasDB_2.length + 1,
      nameList: title,
      description: desc,
      state: 0,
      idUserFK: yo[0].idUser,
    }
  // Actualizar el estado (setTareasDB) para que React sepa que ha cambiado
  setTareasDB((prevTareas) => [...prevTareas, data]);
  // Actualizar el estado (setTareasDB_2) para que React sepa que ha cambiado
  setTareasDB_2((prevTareas) => [...prevTareas, data2]);
  }

//array de prueba Tareas
const [tareasDB_2, setTareasDB_2] = useState([]);
  
//array de prueba Usuarios
 const [usuariosDB,setUsuariosDB] = useState([
    {  idUser: 2,  nameUser: 'lucas',  state: 'activo'},
    {  idUser: 3,  nameUser: 'pablo',  state: 'activo'},
    {  idUser: 4,  nameUser: 'pedro',  state: 'activo'},
    {  idUser: 5,  nameUser: 'judas',  state: 'activo'},
  ])

//array de prueba Tareas
  const [tareasDB,setTareasDB] = useState([]);

//array de prueba con mis datos
  const [yo,setYo] = useState([{idUser: 4,  nameUser: 'pedro',}]);

    return(
        <>
            <div id='admin_page'>
                <table>
                <tr>
                    {yo.map((user) => (
                    <th key={user.idUser}>Admin: {user.nameUser}</th>
                    ))}
                    <th> <button>usuarios</button> </th>
                    <th> <button>tareas</button> </th>
                </tr>
                <h3>usuarios</h3>
                <tr>
                    <th>contador</th>
                    <th>nombre</th>
                    <th>estado</th>
                </tr>
                {usuariosDB.map((usuario, index) => (
                    <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{usuario.nameUser}</th>
                    <th>{usuario.state}</th>
                    </tr>
                ))}
                <h3>tareas</h3>
                <tr>
                    <th>contador</th>
                    <th>nombre usuario</th>
                    <th>nombre tarea</th>
                </tr>
                {tareasDB.map((usuario,index) => (
                    <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{usuario.nameUser} / {usuario.idUser}</th>
                    <th>{usuario.nameList}</th>
                    </tr>
                ))}
                </table>
            </div>
        </>
    );
}
export default Admin;