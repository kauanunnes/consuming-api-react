import { Button, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context";
import { base_url } from "../../helpers/api";
import { toastOptions } from "../../helpers/options";
import { Container } from "./style";

function Create() {
  const navigate = useNavigate();
  const { logged } = React.useContext(UserContext);
  let { id } = useParams();
  const [userData, setUserData] = useState({
    loading: false,
    data: {},
  });

  const [jobs, setJobs] = useState({
    loading: false,
    data: [],
  });

  function handleCreate(e) {
    e.preventDefault();
    let fields = document.querySelectorAll("input");

    fields.forEach((field) => {
      if (!field.value) {
        toast.error(`Campo ${field.type} não pode ser vazio.`);
        return;
      }
    });

    let data = new URLSearchParams({
      name: fields[0].value,
      login: fields[1].value,
      password: fields[2].value,
      phone: fields[3].value,
      job: document.querySelector("select").value,
    });

    let token = JSON.parse(localStorage.getItem("user")).token;

    const config = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`${base_url}/user/`, data, config)
      .then((response) => {
        console.log(response);
        toast.success("Usuário criado com sucesso", toastOptions);
        navigate("/funcionarios");
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.status === 401) {
          toast.error("Você não pode criar outros usuários.", toastOptions);
          return;
        }
        toast.error("Algo deu errado.", toastOptions);
      });
  }

  useEffect(() => {
    setUserData({
      loading: true,
    });

    setJobs({
      loading: true,
    });

    if (id) {
      axios
        .get(`${base_url}/user/${id}`)
        .then(({ data }) => {
          let user = data[0];
          setUserData({
            loading: false,
            data: user,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUserData({
        loading: false,
      });
    }

    axios
      .get(`${base_url}/job/`)
      .then(({ data }) => {
        setJobs({
          loading: false,
          data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    let fields = document.querySelectorAll("input");
    fields.forEach((field) => {
      if (!field.value) {
        toast.error(`Campo ${field.type} não pode ser vazio.`);
        return;
      }
    });

    let data = new URLSearchParams({
      name: fields[1].value,
      login: fields[2].value,
      password: fields[3].value,
      phone: fields[4].value,
      job: document.querySelector("select").value,
    });

    let token = JSON.parse(localStorage.getItem("user")).token;

    const config = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .patch(`${base_url}/user/${id}`, data, config)
      .then((response) => {
        toast.success("Usuário editado com sucesso", toastOptions);
        navigate("/funcionarios");
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          toast.error("Você não pode editar outros usuários.", toastOptions);
          return;
        }
        toast.error("Algo deu errado.", toastOptions);
      });
  };

  if (!logged) {
    toast.warn(
      "Você não pode criar ou editar algo sem estar logado.",
      toastOptions
    );
    navigate("/");
  }

  return (
    <Container>
      {userData.loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {id ? (
            <form onSubmit={handleEdit}>
              <TextField
                label="ID"
                type="text"
                name="id"
                id="id"
                value={id}
                disabled
              />

              <TextField
                label="Name"
                type="text"
                name="name"
                id="name"
                defaultValue={userData.data.name}
              />

              <TextField
                label="Login"
                type="text"
                name="login"
                id="login"
                defaultValue={userData.data.login}
              />

              <TextField
                label="Password"
                type="password"
                name="password"
                id="password"
                placeholder="Sua nova senha"
              />

              <TextField
                label="Telefone(s)"
                type="tel"
                id="tel"
                name="tel"
                defaultValue={userData.data.phone}
              />
              <label htmlFor="jobs">Escolha seu cargo:</label>
              <select
                name="jobs"
                id="jobs"
                value={userData.data.job_id}
                placeholder="Escolha sua posição:"
              >
                <option value="null" disabled>
                  Selecione
                </option>
                {jobs.loading ? (
                  <option value="loading">Carregando</option>
                ) : (
                  <>
                    {jobs.data.map((job) => {
                      return (
                        <option value={job.id} key={job.id}>
                          {job.name}
                        </option>
                      );
                    })}
                  </>
                )}
              </select>
              <Button variant="contained" type="submit">
                Editar
              </Button>
            </form>
          ) : (
            <>
              <form onSubmit={handleCreate}>
                <TextField
                  label="Name"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Seu nome"
                />

                <TextField
                  label="Login"
                  type="text"
                  name="login"
                  id="login"
                  placeholder="Seu login"
                />

                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Sua senha"
                />

                <TextField
                  label="Telefone(s)"
                  type="tel"
                  id="tel"
                  name="tel"
                  placeholder="Seu telefone"
                />
                <label htmlFor="jobs">Escolha seu cargo:</label>
                <select
                  name="jobs"
                  id="jobs"
                  placeholder="Escolha sua posição:"
                >
                  <option value="null" disabled defaultValue>
                    Selecione
                  </option>
                  {jobs.loading ? (
                    <option value="loading">Carregando</option>
                  ) : (
                    <>
                      {jobs.data.map((job) => {
                        return (
                          <option value={job.id} key={job.id}>
                            {job.name}
                          </option>
                        );
                      })}
                    </>
                  )}
                </select>
                <Button variant="contained" type="submit">
                  Criar
                </Button>
              </form>
            </>
          )}
        </>
      )}
      <ToastContainer />
    </Container>
  );
}

export default Create;
