import React, {useState} from 'react';
import './Login.css';

function Login() {
    
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const submitLogin =()=>{
  const data = {
      email: email,
      passwordUser:psw,
  }
  console.log(data);
  }


  return (
    <>
      <div id='head'>
        <h2>login</h2>
      </div>
      <div id='login_form'>
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
      </div>
    </>
  );

}

export default Login;
