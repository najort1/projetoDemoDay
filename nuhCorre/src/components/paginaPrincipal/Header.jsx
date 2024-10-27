import "./styleHeader.css";
import { useNavigate } from 'react-router-dom';

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
      
      <div id="logo" onClick={navegarParaPaginaPrincipal}>NuhCorre</div>
      
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
