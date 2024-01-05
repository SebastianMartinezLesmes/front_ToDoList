import React, {useState, useEffect} from 'react';
import './Login.css';

function Login() {

  useEffect(() => {
    // Llamamos a la función getUser al montar el componente
    getUser();
  }, []);
      
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");

  let [msnEmail,setMsnEmail] = useState(false);
  let [msnPsw,setMsnPsw] = useState(false);
  let [msnYo,setMsnYo] = useState(false);

  const submitLogin =()=>{
    const data = {
      email: email,
      passwordUser:psw,
    }

    if( email ==='' ||psw ===''){
      if(email === ''){ setMsnEmail(true); } else{ setMsnEmail(false);  setMsnYo(false);}
      if(psw === ''){ setMsnPsw(true); } else{ setMsnPsw(false); setMsnYo(false); }
    }else{
      setUsuariosDB((prevTareas) => [...prevTareas, data]);
      console.log(data);
      setMsnEmail(false);
      setMsnPsw(false);
      setEmail('');
      setPsw('');

      // Buscar el usuario con el correo electrónico y la contraseña proporcionados
      const usuarioEncontrado = usuariosDB.find(
        (u) => u.email === email && u.passwordUser === psw
      );

      // Si se encuentra el usuario, actualiza el estado 'yo' con los datos del usuario
      if (usuarioEncontrado) {
        setYo(usuarioEncontrado);
        setMsnYo(false);
        console.log('Usuario encontrado:', usuarioEncontrado);
      } else {
        console.log('Usuario no encontrado');
        setMsnYo(true);
      };
    }

  }
  const [yo,setYo] = useState({}); 

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

  return (
    <>
      <div id='head'>
        <h2>login</h2>
        <p>Soy: {yo.nameUser}//{yo.idUser}</p>

      </div>
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
                <a href="https://tse2.mm.bing.net/th/id/OIP.HtBwbRvZsv7Qu1Ty9974BwHaE2?rs=1&pid=ImgDetMain"><p> ¿Crear un usuario? </p></a>
            </div>
          </form>
      </div>
    </>
  );

}

export default Login;
