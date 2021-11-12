import { Login } from './style'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useEffect } from 'react';

function Home() {

  let user = JSON.parse(localStorage.getItem('infos'))

  useEffect(() => {
    if(user) {
      window.location.href = "http://localhost:3002/funcionarios/";             
    }
  }, [user])

  let toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,  

  }

  function handleLogin(e) {
    console.log(e);
    e.preventDefault()
    const fields = document.querySelectorAll('input')
    fields.forEach((field) => {
      if (!field.value) {
        toast.error(`${field.name} is empty`, toastOptions);
        return
      }
    })

    let data = new URLSearchParams({
      login: fields[0].value,
      password: fields[1].value
    })

    const config = {     
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }

    try {
      axios.post('http://localhost:3000/user/login', data, config)
          .then(response => {
              console.log(response);
              const userData = JSON.stringify({
                token: response.data.token,
                name: response.data.name,
                job: response.data.job,
              })
              localStorage.setItem('infos', userData)
              toast.success('Logado com sucesso!', toastOptions);
              setTimeout(() => {
                window.location.href = "http://localhost:3002/cargos/";             
              }, 2500)
             return
          })      
    } catch (error) {
      toast.error('Algo deu errado.', toastOptions)

      console.log(error);
    }

  }
  return (
    <Login>
      <h1>Logue-se</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="login">Login</label>
        <input type="text" name="login" id="login"/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password"/>
        <button>Entrar</button>
      </form>
      <ToastContainer />
    </Login>
  )
}

export default Home;