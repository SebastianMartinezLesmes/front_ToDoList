import React, {useState, useEffect} from 'react';
import './CreateUser.css';

function CreateUser() {
    
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
    }
  };
  
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


  return (
    <>
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
    </>
  );
  
}

export default CreateUser;
