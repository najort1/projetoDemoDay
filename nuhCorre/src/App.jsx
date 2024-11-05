import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/paginaPrincipal';
import LoginPage from './components/paginaLogin';
import CadastroUsuario from './components/paginaCadastro';
import PesquisaVaga from './components/paginaPrincipal/Main';
function App() {

  //Muda o fundo de acordo com a página
  setInterval(()=>{

    if(location.pathname === "/principal"){

      document.body.classList.add('fundo')
      
    }else{
  
      document.body.classList.remove('fundo')
  
    }

  })
  
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/vagas" element={<PesquisaVaga />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
