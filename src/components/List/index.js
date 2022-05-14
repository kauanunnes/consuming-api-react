import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  Table,
  TableBody, TableCell, TableHead,
  TableRow
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { base_url } from "../../helpers/api";
import { List } from "./style";

function Home(props) {
  const [data, setData] = useState({
    response: [],
    loading: false,
  });

  const [dataJobs, setDataJobs] = useState([]);

  let url;

  let toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (props.name) {
    case "Funcionários":
      url = `${base_url}/user/`;
      break;
    case "Cargos":
      url = `${base_url}/job/`;
      break;
    case "Setores":
      url = `${base_url}/sector/`;
      break;
    default:
      break;
  }

  useEffect(() => {
    setData({ loading: true });

    axios.get(url).then((returned) => {
      axios.get(`${base_url}/job/`).then((returnedJobs) => {
        setData({
          response: returned.data,
          loading: false,
        });

        setDataJobs(returnedJobs.data);
      });
    });
  }, [url]);

  const handleDelete = (e) => {
    let { id } = e.target;
    let { token } = JSON.parse(localStorage.getItem("user"));

    axios({
      method: "delete",
      url: `${url}${id}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        toast.success(res.data, toastOptions);
        setTimeout(() => {
          window.location.reload(false);
        }, 2500);
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          toast.error("Você não pode deletar outros usuários.", toastOptions);
          return;
        }

        toast.error("Algo deu errado.", toastOptions);
      });
  };

  return (
    <List>
      <h1>{data.loading ? "carregando" : props.name}</h1>
      {data.loading ? (
        <></>
      ) : (
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.response.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Link
                    to={`/${
                      props.name === "Funcionários"
                        ? "user"
                        : props.name === "Cargos"
                        ? "position"
                        : "sector"
                    }/edit/${row.id}`}
                  >
                    <Edit color="primary" />
                  </Link>
                </TableCell>
                <TableCell>
                  <DeleteOutline
                    id={row.id}
                    onClick={handleDelete}
                    style={{ cursor: "pointer" }}
                    color="primary"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        // <table>
        //   <tbody>
        //     {data.response.map((value) => {
        //       return (
        //       <tr key={value.id}>
        //         <td>{value.id}</td>
        //         <td>{value.name}</td>
        //         {value.job ? (
        //           <td>{
        //             dataJobs.map(element => {
        //               if (value.job === element.id) {
        //                 return element.name
        //               }
        //               return ''
        //             })
        //           }
        //           </td>
        //         ) : (
        //           <></>
        //         )
        //         }
        //         <td>
        //           <Link to={`/${props.name === 'Funcionários' ? 'user': props.name === 'Cargos' ? 'position' : 'sector' }/edit/${value.id}`}>
        //             <img src={editIcon} alt="edit" />
        //           </Link>
        //         </td>
        //         <td>
        //             <img src={deleteIcon} alt="delete" id={value.id} className="deleteIcon" onClick={handleDelete}/>
        //         </td>
        //       </tr>

        //       )
        //     })}
        //   </tbody>
        // </table>
      )}
      <ToastContainer />
    </List>
  );
}

export default Home;
