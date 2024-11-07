import "./styleHeader.css"; 
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica se a página atual é "CadastroEmpresa"
  const isCadastroEmpresaPage = location.pathname === '/cadastro-empresa';

  const navegarParaOLogin = () => {
    navigate('/login');
  };

  const navegarParaOCadastro = () => {
    navigate('/cadastro');
  };

  const navegarParaPaginaPrincipal = () => {
    navigate('/vagas');
  };

  return (
    <header>
      <div id="logo" onClick={navegarParaPaginaPrincipal}>
        {!isCadastroEmpresaPage ? (
          // Exibe a logo para outras páginas
          <img src={logo} alt="logo" id="imgLogo" />
        ) : (
          // Exibe "Página Inicial" e "Sou Candidato" no lugar da logo para a página CadastroEmpresa
          <div className="opcoesHeaderCadastro" style={{width:'40cm', fontSize:'19px', marginLeft:'2cm'}}>
            <a onClick={navegarParaPaginaPrincipal}>Página Inicial </a>
            <a> | </a>
            <a onClick={() => navigate('/candidato')}>Sou Candidato</a>
          </div>
        )}
      </div>
      
      <div className="conteudoHeader">
        {!isCadastroEmpresaPage ? (
          // Conteúdo padrão do Header para outras páginas
          <>
            <div className="listaIdentificador">
              <ul className="identificadorCandidato">
                <li>
                  <a href="">Sou candidato</a>
                </li>
                <li>
                  <a onClick={() => navigate('/cadastro-empresa')}>Sou empresa</a>
                </li>
              </ul>
            </div>
            <div className="botoes">
              <button className="btn" onClick={navegarParaOLogin}>Entrar</button>
              <button className="btn" onClick={navegarParaOCadastro}>Cadastro</button>
            </div>
          </>
        ) : (
          // Conteúdo do Header para a página CadastroEmpresa
          <div className="headerCadastroEmpresa">
            
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
