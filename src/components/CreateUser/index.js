import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './style'
import { useEffect, useState } from 'react'


function Create() {
  let { id } = useParams()
  const [userData, setUserData] = useState({
    loading: false,
    data: {}
  })

  const [jobs, setJobs] = useState({
    loading: false,
    data: []
  })

  let toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,  
  }

  function handleCreate(e) {
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

    let token = JSON.parse(localStorage.getItem('infos')).token

    const config = {     
        headers: { 
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': `Bearer ${token}`,
        },
    }

      axios.put('http://localhost:3000/user/', data, config)
        .then(response => {
            console.log(response);
            toast.success("Usuário criado com sucesso",toastOptions)
              setTimeout(() => {
                window.location = 'http://localhost:3002/funcionarios/'
              }, 2500)
          return
        })      
        .catch(({response}) => {
          console.log(response);
          if (response.status === 401) {
            toast.error('Você não pode criar outros usuários.', toastOptions)
            return
          }
          toast.error('Algo deu errado.', toastOptions)

        })
  }

  useEffect(() => {
    setUserData({
      loading: true,
    })

    setJobs({
      loading: true,
    })
    
    if (id) {
      axios.get(`http://localhost:3000/user/${id}`)
      .then(({data}) => {
        let user = data[0];
        setUserData({
          loading: false,
          data: user,
        })
        
      })
      .catch(err => {
        console.log(err);
      })

    } else {
      setUserData({
        loading: false,
      })

    }

    axios.get('http://localhost:3000/job/')
      .then(({data}) => {
        setJobs({
          loading: false,
          data
        })
      })
      .catch(err => {
        console.log(err);
      })
    }

  , [id])

    const handleEdit = (e) => {
      e.preventDefault()
      let fields = document.querySelectorAll('input')
      console.log(fields);
      fields.forEach((field) => {
        if (!field.value) {
          // alert('campo vazio')
          return
        }
      })
  
      let data = new URLSearchParams({
        name: fields[1].value,
        login: fields[2].value,
        password: fields[3].value,
        phone: fields[4].value,
        job: document.querySelector('select').value,
      })
  
      let token = JSON.parse(localStorage.getItem('infos')).token
  
      const config = {     
          headers: { 
            'content-type': 'application/x-www-form-urlencoded',
            'authorization': `Bearer ${token}`,
          },
      }

        axios.patch(`http://localhost:3000/user/${id}`, data, config)
          .then(response => {
              console.log(response);
              toast.success("Usuário editado com sucesso", toastOptions)
                setTimeout(() => {
                  window.location = 'http://localhost:3002/funcionarios/'
                }, 2500)
            return
          })      
          .catch(({response}) => {
            console.log(response);
            if (response.status === 401) {
              toast.error('Você não pode editar outros usuários.', toastOptions)
              return
            }
            toast.error('Algo deu errado.', toastOptions)

          })
    }

  return (
    <Container>
      { userData.loading ? (
        <h1>carregando</h1>
      ): (
        <>
        {id? (
          <form onSubmit={handleEdit}>
            <label htmlFor="name">ID</label>
            <input type="text" name="id" id="id" value={id} readOnly/>
            <label htmlFor="name">Nome</label>
            <input type="text" name="name" id="name" defaultValue={userData.data.name}/>
            <label htmlFor="login">Login</label>
            <input type="text" name="login" id="login" defaultValue={userData.data.login}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Sua nova senha"/>  
            <label htmlFor="tel">Telefone(s):</label>
            <input type="tel" id="tel" name="tel" defaultValue={userData.data.phone}/>
            <label htmlFor="jobs">Escolha seu cargo</label>
            <select name="jobs" id="jobs" placeholder="Escolha sua posição:">
              <option value="null">Selecione</option>
              {jobs.loading ? (
                <option value="loading">Carregando</option>
              ) : (
                <>
                  {jobs.data.map(job => {
                    return ( <option value={job.id} key={job.id}>{job.name}</option> )
                  })}
                </>
              )}
            </select>
            <button type="submit">Editar</button>
          </form>

        ) : (
          <>
            <form onSubmit={handleCreate}>
              <label htmlFor="name">Nome</label>
              <input type="text" name="name" id="name" placeholder="Seu nome" />
              <label htmlFor="login">Login</label>
              <input type="text" name="login" id="login" placeholder="Seu login"/>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Sua senha"/>  
              <label htmlFor="tel">Telefone(s):</label>
              <input type="tel" id="tel" name="tel" placeholder="Seu telefone"/>
              <label htmlFor="jobs">Escolha seu cargo</label>
              <select name="jobs" id="jobs" placeholder="Escolha sua posição:">
                <option value="null" defaultValue >Selecione</option>
                {jobs.loading ? (
                  <option value="loading">Carregando</option>
                ) : (
                  <>
                    {jobs.data.map(job => {
                      return ( <option value={job.id} key={job.id}>{job.name}</option> )
                    })}
                  </>
                )}
              </select>
              <button type="submit">Criar</button>
          </form>

        </>
        ) }

          

        </>
      )}
      <ToastContainer />
    </Container>
  )
}

export default Create