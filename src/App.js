import Home from './components/Home'
import List from './components/List';
import Nav from './components/Nav'
import CreateUser from './components/CreateUser'
import { Routes, Route } from 'react-router-dom'
import { AppComponent } from './style'
import { ToastContainer } from 'react-toastify';
import Create from './components/Create';


function App() {
  return (
    <AppComponent>
      <Nav />
      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/funcionarios" element={<List name="Funcionários" />} />
          <Route path="/cargos" element={<List name="Cargos" />} />
          <Route path="/setores" element={<List name="Setores" />} />
          <Route path="/user/edit/:id" element={<CreateUser />} />
          <Route path="/create/" element={<CreateUser />} />
          <Route path="/create/setores" element={<Create name="Setores" />} />
          <Route path="/create/cargos" element={<Create name="Cargos"/>} />
          <Route path="/sector/edit/:id" element={<Create name="Setores" />} />
          <Route path="/position/edit/:id" element={<Create name="Cargos"/>} />
        </Routes>

      </div>
    </AppComponent>
  );
}

export default App;
