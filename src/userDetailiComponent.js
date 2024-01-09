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
  
  const [yo, setYo] = useState({}); // Proporciona un valor inicial si es necesario