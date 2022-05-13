import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context";
import { base_url } from "../../helpers/api";
import { toastOptions } from "../../helpers/options";
import { Container } from "./style";

function Create({ name }) {
  let { id } = useParams();
  const { logged } = React.useContext(UserContext);

  const [data, setData] = useState({
    loading: false,
    data: {},
  });

  const [sectors, setSectors] = useState({
    loading: false,
    data: [],
  });

  let url;

  const navigate = useNavigate();

  switch (name) {
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
    setData({
      loading: true,
    });
    if (id) {
      axios
        .get(`${url}${id}`)
        .then(({ data }) => {
          let res = data[0];
          console.log(res);
          setData({
            loading: false,
            data: res,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setData({
        loading: false,
      });
    }

    setSectors({
      loading: true,
    });
    axios
      .get(`${base_url}/sector/`)
      .then(({ data }) => {
        setSectors({
          loading: false,
          data,
        });
      })
      .catch((err) => {
        toast.error("Algo deu errado.", toastOptions);

        console.log(err);
      });
  }, [id, url]);

  const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  };
  const handleCreate = (e) => {
    e.preventDefault();
    let data = preparingFormData();

    axios
      .put(url, data, config)
      .then(() => {
        toast.success("Criado com sucesso.", toastOptions);
        navigate(name === "Cargos" ? "/cargos" : "/setores");
      })
      .catch((err) => {
        toast.error("Algo deu errado.", toastOptions);
        console.log(err);
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    let data = preparingFormData();
    axios
      .patch(`${url}${id}`, data, config)
      .then(() => {
        toast.success("Editado com sucesso.", toastOptions);
        navigate(name === "Cargos" ? "/cargos" : "/setores");
      })
      .catch((err) => {
        toast.error("Algo deu errado.", toastOptions);
        console.log(err);
      });
  };

  const preparingFormData = () => {
    let nameField = document.querySelector("input#name");
    if (!nameField.value) {
      toast.error("Campo nome está vazio.", toastOptions);
      return;
    }
    let data;

    if (name === "Cargos") {
      data = new URLSearchParams({
        name: nameField.value,
        sector: document.querySelector("select").value,
      });
    } else {
      data = new URLSearchParams({
        name: nameField.value,
      });
    }

    return data;
  };

  if (!logged) {
    toast.warn("Você não pode criar ou editar algo sem estar logado.", toastOptions)
    navigate("/");
  }

  if (data.loading) return <Typography>Carregando....</Typography>;

  return (
    <Container>
      <h1>Crie um {name === "Cargos" ? "cargo" : "setor"}</h1>
      <form autoComplete="off" onSubmit={id ? handleEdit : handleCreate}>
        {id ? (
          <>
            <TextField
              type="text"
              name="id"
              id="id"
              defaultValue={id}
              disabled
            />
            <TextField
              type="text"
              name="name"
              id="name"
              defaultValue={!data.loading ? data.data?.name : "Carregando..."}
              placeholder={
                name === "Cargos" ? "Nome do cargo" : "Nome do setor"
              }
            />
          </>
        ) : (
          <>
            <TextField
              type="text"
              name="name"
              defaultValue={!data.loading ? data.data?.name : "Carregando..."}
              id="name"
              placeholder={
                name === "Cargos" ? "Nome do cargo" : "Nome do setor"
              }
            />
          </>
        )}
        {name === "Cargos" && !sectors.loading ? (
          <>
            <select
              name="jobs"
              defaultValue={data.data?.sector}
              id="jobs"
              placeholder="Escolha um setor:"
            >
              <option value="null">Selecione</option>
              {sectors.data.map((sector) => {
                return (
                  <option value={sector.id} key={sector.id}>
                    {sector.name}
                  </option>
                );
              })}
              )
            </select>
          </>
        ) : (
          <></>
        )}
        <Button type="submit" variant="contained">
          Criar
        </Button>
      </form>
      <ToastContainer />
    </Container>
  );
}

export default Create;
