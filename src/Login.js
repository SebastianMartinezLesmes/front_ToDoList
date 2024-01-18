import React, {useState, useEffect} from 'react';
import { AiOutlineDelete, AiOutlineCheckCircle, AiOutlineLogout } from 'react-icons/ai';

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

  const [nCaracters,setNCaracters] = useState(false);
  const [nSimbols,setNSinbols] = useState(false);
  const [nUpLeters,setNUpLeters] = useState(false);

// funcion para crear usuarios
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

      let number = 0;
      if( pswC.length < 7){ 
        console.log('# caracteres password: '+pswC.length+' es menor a 8') 
        setNCaracters(true)
        number = number+1
      }
      
      if (!/[^\w\d]/.test(pswC)) {
        console.log("La contraseña NO contiene caracteres especiales.");
        setNSinbols(true)
        number = number+1
      }
      
      if (!/[A-Z]/.test(pswC)) {
        console.log('La cadena NO contiene al menos una letra mayúscula.');
        setNUpLeters(true)
        number = number+1
      } 

      setTimeout(() => { 
        setNCaracters(false);
        setNSinbols(false);
        setNUpLeters(false);
        return
      }, 9000); //9seg

      if(number !== 0){
        return
      }

      const usuarioEncontrado_other = usuariosDB.find(
        (u) => u.email === emailC
      );
    
      // si encuentra el usuario
      if (usuarioEncontrado_other){
        setMsg(true);
        console.log('Correo encontrado, fallo al registrar el usuario: '+usuarioEncontrado_other)

        // Establecer los estados a false después de # segundos
        setTimeout(() => { 
          setMsg(false);
        }, 3000); //3seg

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
      if(email === ''){ setMsnEmail(true); } else { setMsnEmail(false); }
      if( psw === ''){ setMsnPsw(true); } else { setMsnPsw(false); }
      setMsnYo(false);

      setTimeout(() => {
        setMsnEmail(false);
        setMsnPsw(false);
        setMsnYo(false);
      }, 2000);

      return; // Evitar continuar si hay campos no llenados
    }
  
    setTimeout(() => { 
      setMsg(false);
    }, 4000);

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
        setTimeout(() => {
          setMsnYo(false);
        }, 3000);
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
  
  const [yo, setYo] = useState([]); 
  
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
{/* formulario Login de la paguina*/}
      <div id='super_content'>
        {window === 'login' && (
          <>
            <p id='titPrin' onClick={() => setWindow('register')}> <h1>To Do List</h1> </p>
            <div id='login_form'>
              <form>
                <div id='content_left'>
                  <div>
                    <p id='titPrin' onClick={() => setWindow('register')}> <u><h3> Login</h3></u> </p>
                  </div>
                  <div>
                    {msnEmail === false ?<p> Email </p> : null}
                    {msnEmail ? <p id='alert_mesage'> <i> Email es requerido </i> </p>:""}
                    <input type="email" id='correo' onChange={(e)=>setEmail(e.target.value)}/>
                  </div>
            
                  <div>
                    {msnPsw === false ? <p>Password</p> : null}
                    {msnPsw ? <p id='alert_mesage'> <i> Password es requerido </i> </p> : null}
                    <input type="password" id="password" onChange={(e) => setPsw(e.target.value)} /> 
                  </div>

                  {msnYo ? (<div> <p id='alert_mesage'> Usuario no encontrado, intente nuevamente</p> </div>): null}
                
                  {msnYo === false ? <> 
                    <button type='button' onClick={submitLogin}>Iniciar sesión</button><br /> 
                    <a href="#" onClick={() => setWindow('register')}>Crear usuario</a>
                  </> :null}
                  
                </div>
                <div id='content_right'>
                  {msnEmail === false && msnPsw === false && msnYo === false ? <img src='https://th.bing.com/th/id/R.5b478f3a87757b1a92eaa1092903d391?rik=wvdKbClhQidd5w&riu=http%3a%2f%2fpa1.narvii.com%2f6379%2fe9a7b27e10968c59128359b829e1469bd37f0c24_00.gif&ehk=XNGKl5w9%2fUwbv%2fV7pe0qGzN%2bK5lnKBuaMNkRDIivGRU%3d&risl=&pid=ImgRaw&r=0'></img> : null}
                  {msnPsw || msnEmail || msnYo ? <img src='https://66.media.tumblr.com/f99de3cf616737af32191023f45ae764/tumblr_miid0sJc7v1rfjowdo1_500.gif'></img> : null}
                </div>
              </form>
            </div>

          </>
        )}

{/* formulario para crear usuarios*/}
        {window === 'register' &&  (
          <>
            <p id='titSec' onClick={() => setWindow('login')}> <h1> To Do List </h1> </p>
            <div id='crearUsuario_form'>
              <form>

                <div id='createU_left'>

                  <h2 id='titSec' onClick={() => setWindow('login')}>Registrarse</h2>

                  <span>
                    {msnNameC ? (<p className='error' id='mesage_alert'> Nombre requerido </p>) : null}
                    {msnNameC === false ? (<p className='error'> Nombre: </p>) : null}
                    
                    <input
                      type="text"
                      placeholder="Ingresa tu Nombre"
                      onChange={(e)=>setNameC(e.target.value)}
                      value={nameC}
                    />
                  </span>
                  
                  <span>
                    {msnEmailC ? (<p className='error' id='mesage_alert'> Email requerido </p>) : null}
                    {msnEmailC === false ? (<p className='error'> Email: </p>) : null}
                    
                    <input
                      type="email"
                      placeholder="Ingresa tu Correo"
                      onChange={(e)=>setEmailC(e.target.value)}
                      value={emailC}
                    />
                  </span>
                  {msg &&( <> <span id='alert'> <p id='alert_error'> Correo ya registrado </p> </span> </> )}
                  
                  <span>
                    {MsnPswC ? (<p className='error' id='mesage_alert'> Contraseña Requerida </p>) : null}
                    {MsnPswC === false ? (<p className='error'> Contraseña: </p>) : null}
                                        
                    <input
                      type="password"
                      placeholder="Crea tu Contraseña"
                      onChange={(e)=>setPswC(e.target.value)}
                      value={pswC}
                    />
                  </span>
                     
                  {nCaracters &&( <> <span id='alert'> <p id='alert_error'> La contraseña debe tener minimo 8 caracteres </p> </span> </> )}
                  {nSimbols &&( <> <span id='alert'> <p id='alert_error'> La contraseña debe al menos 1 simbolo </p> </span> </> )}
                  {nUpLeters &&( <> <span id='alert'> <p id='alert_error'> La contraseña debe al menos 1 letra en mayuscula </p> </span> </> )}

                  <button type='button' onClick={createUser}>Crear Usuario</button>
                  <a href="#" onClick={() => setWindow('login')}>login</a>
                </div>

                <div id='createU_right'>
                  <p> Organiza tu día, simplifica tu vida </p>
                  <span>  ¡Bienvenido a tu lista de tareas, donde cada tarea es un paso más hacia tus objetivos! </span>
                  <img src='/gato_no_fondo.png'></img>
                </div>

              </form>
            </div>
          </>
        )}
      </div>

      <div id='mini_content'>
        {window === '' &&(
          <>
            {yo.role === 'client' && (
              <>
                <button id='especial' onClick={() => setWindow('login')}>
                  <p> logOut </p>
                  <AiOutlineLogout/>
                </button>
                 
                <Client/>
              </>
            )}  
            { yo.role === 'administrador' && (
              <>
                <button id='especial2' onClick={() => setWindow('login')}>
                  <p> logOut </p>
                  <AiOutlineLogout/>
                </button>
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
