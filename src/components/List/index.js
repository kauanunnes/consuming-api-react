import { List } from './style'
import editIcon from './assets/edit.svg'
import deleteIcon from './assets/delete.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Home(props) {

  const [data, setData] = useState({
    response: [],
    loading: false,
    show: false
  })

  const [show, setShow] = useState(false)


  const [dataJobs, setDataJobs] = useState([])

  const handleArrowClick = (e) => {
    const situation = show
    setShow(!situation)
    e.target.classList.toggle('active') 
  }

  let url;

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
  }, [])

  return (
    <List>
      <h1>{props.name}</h1>
      {
        data.loading ? (
          <h1>carregando</h1>
          ) : (
            show ? data.loading ? (
            <h1>carregando...</h1>
          ):(
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
                        })
                      }
                      </td>
                    ) : (
                      <></>
                    )
                    }
                    <td>
                      <Link to={`/user/edit/${value.id}`}>
                        <img src={editIcon} alt="edit" />
                      </Link>
                    </td>
                    <td>
                      <Link to={`/user/delete/${value.id}`}>
                        <img src={deleteIcon} alt="delete" className="deleteIcon"/>
                      </Link>
                    </td>
                  </tr>
     
                  )
                })}
              </tbody>
            </table>
    
          )
    : (
        <></>
      )
  
        )
      }
      <div id="img">
        <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleArrowClick}>
          <path d="M5.81079 8L13.3784 19L20.9459 8H5.81079Z" fill="#324C73" fillOpacity="0.96"/>
        </svg>
      </div>
      
    </List>
  );
}

export default Home;