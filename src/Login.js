import React, {useState, useEffect} from 'react';
import './Login.css';
import Admin from './Admin';
import Client from './Client';

import { useHistory } from 'react-router-dom';

function Login() {

  useEffect(() => {
    // Llamamos a la función getUser al montar el componente
    getUser();
  }, []);

  //funcionalidad para crear usuarios
  const [emailC, setEmailC] = useState("");
  const [nameC, setNameC] = useState("");
  const [pswC, setPswC] = useState("");

  let [msnNameC,setMsnNameC] = useState(false);
  let [msnEmailC,setMsnEmailC] = useState(false);
  let [MsnPswC,setMsnPswC] = useState(false);

  const createUser = async () => {
    const data = {
      idUser: usuariosDB.length + 1,
      role: 'client',
      nameUser: nameC,
      email: emailC,
      passwordUser: pswC,
      state: 'activo',
    };
  
    // verificacion de campos
    if (nameC === "" || emailC === '' || pswC === '') {
      if (nameC === '') {setMsnNameC(true);} else setMsnNameC(false);
      if (emailC === '') {setMsnEmailC(true);} else setMsnEmailC(false);
      if (pswC === '') {setMsnPswC(true);} else setMsnPswC(false);

      setTimeout(() => { // Establecer los estados a false después de 4 segundos
        setMsnNameC(false);
        setMsnEmailC(false);
        setMsnPswC(false);
      }, 4000);

    } else {

      const usuarioEncontrado_other = usuariosDB.find(
        (u) => u.email === emailC
      );
    
      if (usuarioEncontrado_other){
        setMsg(true);
        console.log('Correo encontrado, fallo al registrar el usuario: '+usuarioEncontrado_other)
      }
      else {
        console.log(`Correo NO encontrado, iniciando registro del usuario ${usuarioEncontrado_other}... `)
        setTimeout(() => { 
          setMsg(false);
        }, 4000);
        
        const urlCreate = "http://localhost:5000/createUser";
        try {
          const response = await fetch(urlCreate, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (response.ok) {
            // La solicitud fue exitosa, puedes realizar acciones adicionales si es necesario.
            console.log('Usuario creado exitosamente'); 
          } else {
            console.error('Error al crear el usuario');
          }
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
        
        setUsuariosDB((prevTareas) => [...prevTareas, data]);
        console.log(data);

        setEmailC('');
        setNameC('');
        setPswC('');
        
        setWindow('login');
      }
    }
  };
      
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");

  let [msnEmail,setMsnEmail] = useState(false);
  let [msnPsw,setMsnPsw] = useState(false);
  let [msnYo,setMsnYo] = useState(false);
  let [msg,setMsg] = useState(false)

// funcion de login
  const submitLogin = () => {
    // Validación de campos
    if (email === '' || psw === '') {
      setMsnEmail(email === '');
      setMsnPsw(psw === '');
      setMsnYo(false);
      return; // Evitar continuar si hay campos no válidos
    }
  
    const data = {
      email: email,
      passwordUser: psw,
    };
  
    try {
      // Actualizar el estado 'usuariosDB' con el nuevo usuario
      setUsuariosDB((prevTareas) => [...prevTareas, data]);
      console.log(data);
  
      // Buscar el usuario con el correo electrónico y la contraseña proporcionados
      const usuarioEncontrado = usuariosDB.find(
        (u) => u.email === email && u.passwordUser === psw
      );
  
      // Si se encuentra el usuario, actualizar el estado 'yo' con los datos del usuario
      if (usuarioEncontrado) {
        setYo(usuarioEncontrado);
        setMsnYo(false);
        console.log('Usuario encontrado:', usuarioEncontrado);
        
        // aca se guarda el usuario en el localStorage
        try {
          // Guardar el usuario encontrado en el localStorage
          localStorage.clear();
          localStorage.setItem('usuarioEncontrado', JSON.stringify(usuarioEncontrado));
          setWindow('')
        } catch (error) {
          console.error('Error al guardar en el localStorage:', error);
        }
        
        const usuarioEnLocalStorage = localStorage.getItem('usuarioEncontrado');

        // Verificar si el valor existe
        if (usuarioEnLocalStorage) {
          // Convertir la cadena JSON a un objeto JavaScript
          const usuarioDesdeLocalStorage = JSON.parse(usuarioEnLocalStorage);
          
          // Imprimir en la consola el usuario almacenado en localStorage
          console.log('Usuario almacenado en localStorage exitosamente:', usuarioDesdeLocalStorage);
        } else {
          console.log('No hay usuario almacenado en localStorage.');
        }

      } else {
        console.log('Usuario no encontrado');
        setMsnYo(true);
      }
    } catch (error) {
      console.error(error);
      console.log('Fallo en alguna operación.');
    } finally {
      // Limpiar campos después de todo
      setEmail('');
      setPsw('');
    }
  };
  
  const [yo, setYo] = useState([]); // Proporciona un valor inicial si es necesario
  
// aca un metodo que trae los usuarios y los buarda en setUsuariosDB
  const urlUsers = 'http://localhost:5000/getUser';
  async function getUser() {
    try {
      const response = await fetch(urlUsers);
      if (!response) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      // Actualizamos el estado con los datos obtenidos
      setUsuariosDB(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
//array de prueba Usuarios
  const [usuariosDB,setUsuariosDB] = useState([])

  const [window,setWindow] = useState('login')

  return (
    <>
      <div id='super_content'>
      
        {window === 'login' && (
          <>
            <h2 id='titPrin' onClick={() => setWindow('register')}>Login</h2>
            <div id='login_form'>
              <form>
                <div>
                    <tr>
                      <th> Email </th>
                      <th> <input type="email" id='correo' onChange={(e)=>setEmail(e.target.value)}/> </th>
                      {msnEmail === true ? (<tr> campo Email es requerido</tr>):""}
                    </tr>
              
                    <tr>
                      <th> Password </th>
                      <th> <input type="password" id='password' onChange={(e)=>setPsw(e.target.value)}/> </th>
                      {msnPsw === true ? (<tr> campo Password es requerido</tr>):""}
                    </tr>

                    {msnYo === true ? (<div id='msnNoUser'> <tr> Usuario no encontrado, intente nuevamente</tr> </div>):""}
                    
                    <button type='button' onClick={submitLogin}>Iniciar sesión</button><br />
                    <a href="#" onClick={() => setWindow('register')}>Crear usuario</a>
                </div>
              </form>
            </div>
          </>
        )}
        {window === 'register' &&  (
          <div>
            <h2 id='titSec' onClick={() => setWindow('login')}>Registrarse</h2>
            <div id='crearUsuario_form'>
              <form>
                <div>
                  <tr>
                      <th> Name </th>
                      <th> <input type="text" id='Pnombre' value={nameC} onChange={(e)=>setNameC(e.target.value)}/> </th>
                      {msnNameC === true ? (<tr className='error'> Campo requerido</tr>):""}
                  </tr>   
                  <tr>
                      <th> Email </th>
                      <th> <input type="email" id='Pcorreo' value={emailC} onChange={(e)=>setEmailC(e.target.value)}/> </th>
                      {msnEmailC === true ? (<tr className='error'> Campo requerido</tr>):""}
                  </tr>
                  <tr>
                      <th> Password </th>
                      <th> <input type="password" id='Ppassword' value={pswC} onChange={(e)=>setPswC(e.target.value)}/> </th>
                      {MsnPswC === true ? (<tr className='error'> Campo requerido</tr>):""}
                  </tr>
                  <button type='button' onClick={createUser}>Crear Usuario</button>
                  <a href="#" onClick={() => setWindow('login')}>login</a>
                  {msg &&(
                    <>
                      <span> Correo ya registrado </span>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      
      </div>
      <div id='mini_content'>
        {window === '' &&(
          <>
            {yo.role === 'client' && (
              <>
                <button id='especial' onClick={() => setWindow('login')}>login</button>
                <Client/>
              </>
            )}  
            { yo.role === 'administrador' && (
              <>
                <button id='especial2' onClick={() => setWindow('login')}>login</button>
                <h2> <Admin/> </h2>
              </>
            )}
          </>
        )}
      </div>
    </>
  );

}

export default Login;
