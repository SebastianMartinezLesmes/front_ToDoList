import './App.css';
import react, {useState} from 'react';

import { AiOutlineDelete } from 'react-icons/ai';

function App() {

// funcionalidad del login
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const submitLogin =()=>{
    const data = {
      correo: email,
      contrasena:psw,
    }
    console.log(data);
  }
//funcionalidad para crear usuarios
  const [emailC, setEmailC] = useState("");
  const [nameC, setNameC] = useState("");
  const [pswC, setPswC] = useState("");
  const createUser = () =>{
    const data = {
      correo: emailC,
      nombre: nameC,
      contraseña: pswC,
    }
    console.log(data);
  }
//funcionalidad para crear tareas
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const createWork = () =>{
    const data = {
      title: title,
      description: desc,
    }
    console.log(data);
  }

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
            <th>Admin: nombre del usuario</th>
            <th> <button>usuarios</button> </th>
            <th> <button>tareas</button> </th>
          </tr>
          <h3>usuarios</h3>
          <tr>
            <th>contador</th>
            <th>nombre</th>
            <th>estado</th>
          </tr>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
          </tr>
            <h3>tareas</h3>
          <tr>
            <th>contador</th>
            <th>nombre usuario</th>
            <th>nombre tarea</th>
          </tr>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
          </tr>
        </table>
      </div><br />

      <div id='client_page'>
        <div>
          Client: nombre del usuario
        </div>

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
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th> <input type="checkbox" name="cheked" id="check" /> </th>
            <th><AiOutlineDelete /></th>
          </tr>
        </table>
      </div>

    </div>
)}
export default App;
