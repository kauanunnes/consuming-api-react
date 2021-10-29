import { Login } from './style'
import { createBrowserHistory } from 'history';

import axios from 'axios'

function Home() {
  let history = createBrowserHistory();
  function handleLogin(e) {
    console.log(e);
    e.preventDefault()
    const fields = document.querySelectorAll('input')
    fields.forEach((field) => {
      if (!field.value) {
        // alert('campo vazio')
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
              window.location.href = "http://localhost:3002/cargos/";             
             return
          })      
    } catch (error) {
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
    </Login>
  )
}

export default Home;