import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context";
import { toastOptions } from "../../helpers/options";
import { Login } from "./style";

function Home() {
  let context = React.useContext(UserContext);
  let user = JSON.parse(localStorage.getItem("user"));
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

  return (
    <Card variant="outlined" sx={{ minWidth: 320 }}>
      <CardContent>
        <Typography textAlign="center" variant="h5">Login</Typography>
        <form autoComplete="off" onSubmit={handleLogin}>
          <TextField label="Login" type="text" name="login" id="login" />
          <TextField label="Password" type="password" name="password" id="password" />
          <Button type="submit" variant="contained">Sign in</Button>
        </form>
        <ToastContainer />
      </CardContent>
    </Card>
  );
}

export default Home;
