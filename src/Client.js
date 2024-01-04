import React, {useState} from 'react';
import './Client.css';
import { AiOutlineDelete } from 'react-icons/ai';


function Client() {
    
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


  return (
    <>
        <div id='client_page'>

        {yo.map((user) => (
            <div key={user.idUser}> Client: {user.nameUser} </div>
        ))}

        <div id='formClient'>
        <form>
            <h3>Formulario para crear las tareas</h3>
            <div> Título: <input type="text" onChange={(e)=>setTitle(e.target.value)}/> </div>
            <div> Descripción: <textarea id='desc' onChange={(e)=>setDesc(e.target.value)}></textarea> </div>
            <button type='button' onClick={createWork} >Poner tarea</button>
        </form>
        </div>

        <h3>tareas</h3>
        <table>
            <tr>
                <th>contador</th>
                <th>nombre tarea</th>
                <th>nombre descripción</th>
                <th>¿Completada?</th>
                <th>Borrar</th>
            </tr>
            {tareasDB_2.map((tareas,index) => (
                <tr key={index}>
                <th>{index + 1}</th>
                <th>{tareas.nameList}</th>
                <th>{tareas.description}</th>
                <th> <input type="checkbox" name="cheked" id="check" /> </th>
                <th><AiOutlineDelete /></th>
                </tr>
            ))}
        </table>
        </div>
    </>
  );
  
}

export default Client;