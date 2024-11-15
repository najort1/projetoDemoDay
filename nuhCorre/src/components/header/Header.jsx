import "./styleHeader.css"; 
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {Image} from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import boxicons from "boxicons";


function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica se a página atual é "CadastroEmpresa"
  const isCadastroEmpresaPage = location.pathname === '/cadastroEmpresa';
  const isCadastroPage = location.pathname === '/cadastro';
  const isLogin= location.pathname === '/login';

  const navegarParaOLogin = () => {
    navigate('/login');
  };

  const cadastroUsuario = () => {
    navigate('/cadastro');
  };

  const cadastroEmpresa = () => {
    navigate('/cadastroEmpresa');
  };

  const edicaoEmpressa = () => {
    navigate('/edicaoEmpressa');
  };

  const navegarParaPaginaPrincipal = () => {
    navigate('/');
  };

  const PaginaDeVagas = () => {
    navigate('/vagas');
  };  

  return (
    <header className="header-principal">
      <div id="logo" onClick={navegarParaPaginaPrincipal}>
        {!isCadastroEmpresaPage ? (
          // Exibe a logo para outras páginas
          <img src={logo} alt="logo" id="imgLogo" />
        ) : (
          // Exibe "Página Inicial" e "Sou Candidato" no lugar da logo para a página CadastroEmpresa
          <div className="opcoesHeaderCadastro" style={{fontSize:'19px', marginLeft:'2cm'}}>
            <a onClick={navegarParaPaginaPrincipal}>Página Inicial </a>
            <a> | </a>
            <a onClick={cadastroUsuario}>Sou Candidato</a>
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
                  <a onClick={cadastroUsuario}>Sou candidato</a>
                </li>
                <li>
                  <a onClick={cadastroEmpresa}>Sou empresa</a>
                </li>
                <li>
                  <a onClick={edicaoEmpressa}>EdicaoEmpressa</a>
                </li>
              </ul>
            </div>
            <div className="botoes">
              <button className="btn" onClick={navegarParaOLogin}>Entrar</button>
              <button className="btn" onClick={cadastroUsuario}>Cadastro</button>
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