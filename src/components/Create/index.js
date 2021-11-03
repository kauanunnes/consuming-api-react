import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Container } from './style'
import { useEffect, useState } from 'react'


function Create() {
  let { id } = useParams()
  const [jobs, setJobs] = useState({
    loading: false,
    data: []
  })

  function handleCreate(e) {
    console.log(e);
    e.preventDefault()
    let fields = document.querySelectorAll('input')
    
    fields.forEach((field) => {
      if (!field.value) {
        // alert('campo vazio')
        return
      }
    })

    let data = new URLSearchParams({
      name: fields[0].value,
      login: fields[1].value,
      password: fields[2].value,
      phone: fields[3].value,
      job: document.querySelector('select').value,
    })
    console.log(document.querySelector('select').value);

    let token = JSON.parse(localStorage.getItem('infos')).token
    console.log(token);

    const config = {     
        headers: { 'content-type': 'application/x-www-form-urlencoded',
        'authorization': `Bearer ${token}`
      },
        
    }

    try {
      axios.put('http://localhost:3000/user/', data, config)
          .then(response => {
              console.log(response);
              alert('created user')
            return
          })      
    } catch (error) {
      console.log(error);
    }

  }


  useEffect(() => {
    setJobs({
      loading: true,
    })
    axios.get('http://localhost:3000/job/')
      .then(({data}) => {
        console.log(data);
        setJobs({
          loading: false,
          data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  return (
    <Container>
      {jobs.loading ? (
        <h1>carregando</h1>
      ): (
        <form onSubmit={handleCreate}>
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" id="name" placeholder="Seu nome"/>
          <label htmlFor="login">Login</label>
          <input type="text" name="login" id="login" placeholder="Seu login"/>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Sua senha"/>  
          <label htmlFor="tel">Telefone(s):</label>
          <input type="tel" id="tel" name="tel" placeholder="Seu telefone"/>
          <label htmlFor="jobs">Escolha seu cargo</label>
          <select name="jobs" id="jobs" placeholder="Escolha sua posição:">
            <option value="null"defaultValue >Selecione</option>
            
            {jobs.data.map(job => {
              return ( <option value={job.id} key={job.id}>{job.name}</option> )
            })}
          </select>
        <button type="submit">Criar</button>

      </form>
      )}
      
    </Container>
  )
}

export default Create