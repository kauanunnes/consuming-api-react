import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { base_url } from '../../helpers/api';
import { Container } from "./style";



function Create({name}) {
  let { id } = useParams()

  const [data, setData] = useState({
    loading: false,
    data: {}
  })

  const [sectors, setSectors] = useState({
    loading: false,
    data: []
  })

  let url;

  switch (name) {
    case 'Cargos':
      url = `${base_url}/job/`
      break;
    case 'Setores':
      url = `${base_url}/sector/`
      break;
    default:
      break;
  }
  
  let toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,  
  }

  useEffect(() => {
    setData({
      loading: true,
    })
    if (id) {
      axios.get(`${url}${id}`)
      .then(({data}) => {
        let res = data[0];
        setData({
          loading: false,
          data: res,
        })
        
      })
      .catch(err => {
        console.log(err);
      })

    } else {
      setData({
        loading: false,
      })
    }

    
    setSectors({
      loading: true,
    })
    axios.get(`${base_url}/sector/`)
      .then(({data}) => {
        setSectors({
          loading: false,
          data
        })
      })
      .catch(err => {
        toast.error('Algo deu errado.', toastOptions)

        console.log(err);
      })
  }, [])
  
  const config = {     
      headers: { 
        'content-type': 'application/x-www-form-urlencoded',
      },
  }
  const handleCreate = (e) => {
    e.preventDefault()
    let data = preparingFormData()

    axios.put(url, data, config)
      .then(() => {
        toast.success('Criado com sucesso.', toastOptions)
        setTimeout(() => {
          window.location = `http://localhost:3002/${name === 'Cargos' ?'cargos':'setores'}/`
        }, 2500)
      })
      .catch(err => {
        toast.error('Algo deu errado.', toastOptions)
        console.log(err);
      })
  }

  const handleEdit = (e) => {
    e.preventDefault()
    let data = preparingFormData()
    axios.patch(`${url}${id}`, data, config)
      .then(() => {
        toast.success('Editado com sucesso.', toastOptions)
        setTimeout(() => {
          window.location = `http://localhost:3002/${name === 'Cargos' ?'cargos':'setores'}/`
        }, 2500)
      })
      .catch(err => {
        toast.error('Algo deu errado.', toastOptions)
        console.log(err);
      })
  }

  const preparingFormData = () => {
    let nameField = document.querySelector('input#name')
    if (!nameField.value) {
      toast.error('Campo nome está vazio.', toastOptions)
      return
    }
    let data;

    if (name === 'Cargos') {
      data = new URLSearchParams({
        name: nameField.value,
        sector: document.querySelector('select').value 
      })
    } else {
      data = new URLSearchParams({
        name: nameField.value,
      })
    }

    return data 
  }

  return (
    <Container>
      <h1>Crie um {name === 'Cargos' ? 'cargo' : 'setor'}</h1>
      <form onSubmit={id ? handleEdit : handleCreate}>
        {id ? (
          <>
            <label htmlFor="id">ID:</label>
            <input type="text" name="id" id="id" defaultValue={id} readOnly/>
            {data.loading ? (
              <>
                <label htmlFor="name">Nome:</label> 
                <input type="text" name="name" id="name" placeholder={name === 'Cargos' ? 'Nome do cargo' : 'Nome do setor'}/>
              </>
            ) : (
              <>
                <label htmlFor="name">Nome:</label>
                <input type="text" name="name" id="name" defaultValue={data.data.name}/>
              </>
            )}
          </>
        ) : (
          <>
            <label htmlFor="name">Nome:</label>
            <input type="text" name="name" id="name" placeholder={name === 'Cargos' ? 'Nome do cargo' : 'Nome do setor'}/>
          </>
        )}
        {name === 'Cargos' ? (
          <>
            <label htmlFor="jobs">Escolha um setor</label>
            <select name="jobs" id="jobs" placeholder="Escolha um setor:">
              <option value="null" defaultValue >Selecione</option>
              {sectors.loading ? (
                <option value="loading">Carregando</option>
              ) : (
                <>
                  {sectors.data.map(sector => {
                    return ( <option value={sector.id} key={sector.id}>{sector.name}</option> )
                  })}
                </>
              )}
            </select>
          </>
        ) : (
          <></>
        )}
        <button>Criar</button>
      </form>
      <ToastContainer />
    </Container>
  )
}

export default Create