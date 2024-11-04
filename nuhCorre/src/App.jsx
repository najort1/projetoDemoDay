import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/paginaPrincipal';
import LoginPage from './components/paginaLogin';
import CadastroUsuario from './components/paginaCadastro';
import PesquisaVaga from './components/paginaPrincipal/Main';
import CadastroEmpresa from './components/paginaCadastroEmpresa';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/vagas" element={<PesquisaVaga />} />
          <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
