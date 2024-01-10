import React, {useState, useEffect} from 'react';
import './Login.css';
import CreateUser from './CreateUser';

import Admin from './Admin';
import Client from './Client';

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
  
    if (nameC === "" || emailC === '' || pswC === '') {
      if (nameC === '') setMsnNameC(true); else setMsnNameC(false);
  
      if (emailC === '') setMsnEmailC(true); else setMsnEmailC(false);
  
      if (pswC === '') setMsnPswC(true); else setMsnPswC(false);
    } else {
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
      setMsnNameC(false);
      setMsnEmailC(false);
      setMsnPswC(false);
      setEmailC('');
      setNameC('');
      setPswC('');

      setWindow(!window);
    }
  };
      
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");

  let [msnEmail,setMsnEmail] = useState(false);
  let [msnPsw,setMsnPsw] = useState(false);
  let [msnYo,setMsnYo] = useState(false);

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
      
        const key = 'usuarioEncontrado';
        try {
          window.localStorage.setItem(key, JSON.stringify(usuarioEncontrado));
          console.log('Guardado exitosamente en el localStorage.');
        } catch (error) {
          console.error(error);
          console.log('Error al enviar datos al localStorage');
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
  const [usuariosDB,setUsuariosDB] = useState({})

  const [window,setWindow] = useState(true)
  const changeWindow = () => {
    setWindow(!window);
    getUser();
  };

  return (
    <>
      <div>
      
      {window ? (
        <div>
          <h2 onClick={changeWindow}>Registrarse</h2>
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
                <a href="#" onClick={changeWindow}>Crear usuario</a>

            </div>
          </form>
        </div>
        </div>
      ) : (
        <div>
          <h2 onClick={changeWindow}>Login</h2>
          <div id='crearUsuario_form'>
            <form>
              <div>
                <tr>
                    <th> Name </th>
                    <th> <input type="text" id='Pnombre' value={nameC} onChange={(e)=>setNameC(e.target.value)}/> </th>
                    {msnNameC === true ? (<tr className='error'> campo Name es requerido</tr>):""}
                </tr>   
                <tr>
                    <th> Email </th>
                    <th> <input type="email" id='Pcorreo' value={emailC} onChange={(e)=>setEmailC(e.target.value)}/> </th>
                    {msnEmailC === true ? (<tr className='error'> campo Email es requerido</tr>):""}
                </tr>
                <tr>
                    <th> Password </th>
                    <th> <input type="password" id='Ppassword' value={pswC} onChange={(e)=>setPswC(e.target.value)}/> </th>
                    {MsnPswC === true ? (<tr className='error'> campo Password es requerido</tr>):""}
                </tr>
                <button type='button' onClick={createUser}>Crear Usuario</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
    <p>Soy: {yo.nameUser} // {yo.idUser} // {yo.role}</p>

    {yo.role === 'client' ? <h2> <Client/> </h2> : yo.role === 'administrador' ? <h2> <Admin/> </h2> : null}
    </>
  );

}

export default Login;
