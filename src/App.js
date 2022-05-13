import { Navigate, Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import CreateUser from "./components/CreateUser";
import Home from "./components/Home";
import List from "./components/List";
import Nav from "./components/Nav";
import { AppComponent } from "./style";
import { UserContext } from "./context";
import React from "react";

function App() {
  const { logged } = React.useContext(UserContext);
  return (
    <AppComponent>
      <Nav />
      <div className="body">
        <Routes>
          <Route
            path="/"
            element={
              logged ? <Navigate replace to="/funcionarios" /> : <Home />
            }
          />
          <Route path="/funcionarios" element={<List name="Funcionários" />} />
          <Route path="/cargos" element={<List name="Cargos" />} />
          <Route path="/setores" element={<List name="Setores" />} />
          <Route path="/user/edit/:id" element={<CreateUser />} />
          <Route path="/create/" element={<CreateUser />} />
          <Route path="/create/setores" element={<Create name="Setores" />} />
          <Route path="/create/cargos" element={<Create name="Cargos" />} />
          <Route path="/sector/edit/:id" element={<Create name="Setores" />} />
          <Route path="/position/edit/:id" element={<Create name="Cargos" />} />
        </Routes>
      </div>
    </AppComponent>
  );
}

export default App;
