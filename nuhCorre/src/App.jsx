import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/paginaLogin';
import CadastroUsuario from './components/paginaCadastro';
import PesquisaVaga from './components/paginaPrincipal/Main';
import { Vagas } from './components/paginaVagas/IndexVagas';
import CadastroEmpresa from './components/paginaCadastroEmpresa';

function App() {

  //Muda o fundo de acordo com a página
  setInterval(()=>{

    if(location.pathname === "/"){

      document.body.classList.add('fundo')
      
    }else{
  
      document.body.classList.remove('fundo')
  
    }

  })
  
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<PesquisaVaga />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/cadastroEmpresa" element={<CadastroEmpresa/>} />
          <Route path="/vagas" element={<Vagas/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
