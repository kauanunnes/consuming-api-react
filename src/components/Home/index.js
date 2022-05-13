import { Login } from "./style";
import { base_url } from "../../helpers/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React, { useEffect } from "react";
import { UserContext } from "../../context";
import { toastOptions } from "../../helpers/options";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {
  
  let context = React.useContext(UserContext);
  let user = JSON.parse(localStorage.getItem("infos"));
  console.log(context);
  useEffect(() => {
    if (user) {
      window.location.href = "/funcionarios";
    }
  }, [user]);

  function handleLogin(e) {
    e.preventDefault();
    const fields = document.querySelectorAll("input");
    fields.forEach((field) => {
      if (!field.value) {
        toast.error(`${field.name} is empty`, toastOptions);
        return;
      }
    });
    let data = new URLSearchParams({
      login: fields[0].value,
      password: fields[1].value,
    });
    context.userLogin(data);
  }

  // if (context.logged) {
  //   navigate("/cargos");
  //   return null
  // }

  return (
    <Login>
      <h1>Logue-se</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="login">Login</label>
        <input type="text" name="login" id="login" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button>Entrar</button>
      </form>
      <ToastContainer />
    </Login>
  );
}

export default Home;
