import React, {useState} from 'react';
import './CreateUser.css';

function CreateUser() {
    
//funcionalidad para crear usuarios
    const [emailC, setEmailC] = useState("");
    const [nameC, setNameC] = useState("");
    const [pswC, setPswC] = useState("");

    let [msnNameC,setMsnNameC] = useState(false);
    let [msnEmailC,setMsnEmailC] = useState(false);
    let [MsnPswC,setMsnPswC] = useState(false);

    const createUser = () =>{
    const data = {
        idUser: usuariosDB.length+1,
        role: 'cliente',
        nameUser: nameC,
        email: emailC,
        passwordUser: pswC,
        state: 'activo',
    }
    if(nameC === ""|| emailC ==='' ||pswC ===''){
      if(nameC === ''){ setMsnNameC(true); } else{ setMsnNameC(false); }
      if(emailC === ''){ setMsnEmailC(true); } else{ setMsnEmailC(false); }
      if(pswC === ''){ setMsnPswC(true); } else{ setMsnPswC(false); }
    }else{
      setUsuariosDB((prevTareas) => [...prevTareas, data]);
      console.log(data);
      setMsnNameC(false);
      setMsnEmailC(false);
      setMsnPswC(false);
      setEmailC('');
      setNameC('');
      setPswC('');
    }
// Actualizar el estado (setTareasDB_2) para que React sepa que ha cambiado
      
    }
  
//array de prueba Usuarios
 const [usuariosDB,setUsuariosDB] = useState([
    {  idUser: 2,  nameUser: 'lucas',  state: 'activo'},
    {  idUser: 3,  nameUser: 'pablo',  state: 'activo'},
    {  idUser: 4,  nameUser: 'pedro',  state: 'activo'},
    {  idUser: 5,  nameUser: 'judas',  state: 'activo'},
  ])


  return (
    <>
      <div id='head'>
        <h2>crear usuario</h2>
      </div>
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
