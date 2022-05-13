import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url, config } from "./helpers/api";
import { toastOptions } from "./helpers/options";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [logged, setLogged] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function userLogin(user) {
    try {
      const { data } = await axios.post(`${base_url}/user/login`, user, config);
      const userData = JSON.stringify({
        token: data.token,
        name: data.name,
        job: data.job,
      });
      setUser(data);
      setLogged(true);
      navigate("/cargos");
      localStorage.setItem("user", userData);
      toast.success("Logado com sucesso!", toastOptions);
    } catch (error) {
      toast.error("Algo deu errado.", toastOptions);
      console.log(error);
    }
  }

  const userLogout = () => {
    localStorage.removeItem("user");
    setLogged(false);
    setUser(null);
    toast.warn("Usuário deslogado.", toastOptions);
    navigate("/");
  };

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      setLogged(true);
    } else {
      setUser(null);
      setLogged(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, userLogin, logged, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
