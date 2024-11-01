import "./styleHeader.css";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Header() {

  const navigate = useNavigate();

  const navegarParaOLogin = () => {
    navigate('/login');
  }

  const navegarParaOCadastro = () => {
    navigate('/cadastro');
  }

  const navegarParaPaginaPrincipal = () => {
    navigate('/vagas');
  }

  return (
  
    <header>
      
      <div id="logo" onClick={navegarParaPaginaPrincipal}>

        <img src={logo} alt='logo' id='imgLogo'/>
      </div>
      
      <div className="conteudoHeader">
        <div className="listaIdentificador">
          <ul className="identificadorCandidato">
            <li>
              <a href="">Sou candidato</a>
            </li>
            <li>
              <a href="">Sou empresa</a>
            </li>
          </ul>
        </div>

        <div className="botoes">
          <button className="btn" onClick={navegarParaOLogin}>Entrar</button>
          <button className="btn" onClick={navegarParaOCadastro}>Cadastro</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
