import './App.css';
import react, {useState} from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

function App() {
/*
// funcionalidad del login
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
 const [usuariosDB,setUsuariosDB] = useState([])

//array de prueba Tareas
  const [tareasDB,setTareasDB] = useState([]);

//array de prueba con mis datos
  const [yo,setYo] = useState([{idUser: 4,  nameUser: 'pedro',}]);


//codigo html funtional
  return (
    <div className="App">
      
      <div id='login_form'>
        <h2>login</h2>
        <form>
          <div>
            <tr>
              <th> Email </th>
              <th> <input type="email" id='correo' onChange={(e)=>setEmail(e.target.value)}/> </th>
            </tr>
            <tr>
              <th> Password </th>
              <th> <input type="password" id='password' onChange={(e)=>setPsw(e.target.value)}/> </th>
            </tr>
            <button type='button' onClick={submitLogin}>Iniciar sesión</button><br />
            <a href="https://tse2.mm.bing.net/th/id/OIP.HtBwbRvZsv7Qu1Ty9974BwHaE2?rs=1&pid=ImgDetMain"><p> ¿Crear un usuario? </p></a>
          </div>
        </form>
      </div><br />

      <div id='crearUsuario_form'>
        <h2>crear usuario</h2>
        <form>
          <div>
              <tr>
                <th> Name </th>
                <th> <input type="text" id='Pnombre' onChange={(e)=>setNameC(e.target.value)}/> </th>
              </tr>
              <tr>
                <th> Email </th>
                <th> <input type="email" id='Pcorreo' onChange={(e)=>setEmailC(e.target.value)}/> </th>
              </tr>
              <tr>
                <th> Password </th>
                <th> <input type="password" id='Ppassword' onChange={(e)=>setPswC(e.target.value)}/> </th>
              </tr>
              <button type='button' onClick={createUser}>Crear Usuario</button>
          </div>
        </form>
      </div><br />

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
      </div><br />

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

    </div>
)*/}
export default App;
