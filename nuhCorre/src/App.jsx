import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/paginaPrincipal';
import LoginPage from './components/paginaLogin';
import CadastroUsuario from './components/paginaCadastro';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
        </Routes>
      </Router>
    </>
  )
}

export default App