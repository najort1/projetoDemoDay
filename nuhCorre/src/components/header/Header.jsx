import "./styleHeader.css";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Header() {

  //Navegações
  const navigate = useNavigate();

  const navegarParaPaginaPrincipal = () => {//Página principal
    navigate('/principal');
  }

  const navegarParaOLogin = () => {//Página de login
    navigate('/login');
  }

  const navegarParaOCadastro = () => {//Página de cadastro
    navigate('/cadastro');
  }

  const navegarParaPaginaVagas = () => {//Página de vagas
    navigate('/vagas');
  }

  const navegarParaCadastroEmpresa = () => {
    navigate('/cadastro-empresa');
  } 

  return (
    
    <header>
      
      <div id="logoHeader" onClick={navegarParaPaginaPrincipal}>

        <img src={logo} alt='logo' id='imgLogo'/>

      </div>
      
      <div className="conteudoHeader">

        <nav className="listaIdentificador">

          <ul className="identificadorCandidato">

            <li>
              <a href="">Sou candidato</a>
            </li>

            <li>
              <a onClick={navegarParaCadastroEmpresa}>Sou empresa</a>
            </li>

            <li>
              <a href="" onClick={navegarParaPaginaVagas}>Vagas</a>
            </li>

          </ul>

        </nav>

        <div className="botoes">
          <button className="btn" onClick={navegarParaOLogin}>Entrar</button>
          <button className="btn" onClick={navegarParaOCadastro}>Cadastro</button>
        </div>

      </div>

    </header>
  );
}

export default Header;
