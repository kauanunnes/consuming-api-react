import Home from './components/Home'
import List from './components/List';
import Nav from './components/Nav'
import Create from './components/Create'
import { Routes, Route } from 'react-router-dom'
import { AppComponent } from './style'


function App() {
  return (
    <AppComponent>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/funcionarios" element={<List name="Funcionários" />} />
        <Route path="/cargos" element={<List name="Cargos" />} />
        <Route path="/setores" element={<List name="Setores" />} />
        <Route path="/user/edit/:id" element={<Create />} />
        <Route path="/create/" element={<Create />} />

      </Routes>
    </AppComponent>
  );
}

export default App;
