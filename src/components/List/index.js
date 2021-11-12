import { List } from './style'
import editIcon from './assets/edit.svg'
import deleteIcon from './assets/delete.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Home(props) {
  const [data, setData] = useState({
    response: [],
    loading: false,
    
  })

  const [dataJobs, setDataJobs] = useState([])

  let url;

  let toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,  

  }

  switch (props.name) {
    case 'Funcionários':
      url = 'http://localhost:3000/user/'   
      break;
    case 'Cargos':
      url = 'http://localhost:3000/job/'
      break;
    case 'Setores':
      url = 'http://localhost:3000/sector/'
      break;
    default:
      break;
  }

  useEffect(() => {
    setData({loading: true})

    axios.get(url)
      .then((returned) => {
        axios.get('http://localhost:3000/job/')
          .then((returnedJobs) => {
            setData({
              response: returned.data,
              loading: false
            })

            setDataJobs(returnedJobs.data)
          })
      })
  }, [url])

  const handleDelete = (e) => {
    let { id } = e.target
    let {token} = JSON.parse(localStorage.getItem('infos'))

    axios({
      method: 'delete',
      url: `${url}${id}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': `Bearer ${token}`,
      }
    })

      .then(res => {
        console.log(res);
        toast.success(res.data, toastOptions)
          setTimeout(() => {
            window.location.reload(false)
          }, 2500)
      })
      .catch(({response}) => {
        
        if (response.status === 401) {
          toast.error('Você não pode deletar outros usuários.', toastOptions)
          return
        }

        toast.error('Algo deu errado.', toastOptions)

      })
  }

  return (
    <List>
      <h1>{data.loading ? 'carregando' : props.name}</h1>
      {
        data.loading ? (
          <></>
          ) : (
            <table>
              <tbody>
                {data.response.map((value) => {
                  return (
                  <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    {value.job ? (                    
                      <td>{
                        dataJobs.map(element => {
                          if (value.job === element.id) {
                            return element.name
                          }
                          return ''
                        })
                      }
                      </td>
                    ) : (
                      <></>
                    )
                    }
                    <td>
                      <Link to={`/${props.name === 'Funcionários' ? 'user': props.name === 'Cargos' ? 'position' : 'sector' }/edit/${value.id}`}>
                        <img src={editIcon} alt="edit" />
                      </Link>
                    </td>
                    <td>
                        <img src={deleteIcon} alt="delete" id={value.id} className="deleteIcon" onClick={handleDelete}/>
                    </td>
                  </tr>
     
                  )
                })}
              </tbody>
            </table>
        )
      }
      <ToastContainer />

    </List>
  );
}

export default Home;