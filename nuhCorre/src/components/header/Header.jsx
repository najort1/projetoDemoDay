import "./styleHeader.css"; 
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {Image} from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import boxicons from "boxicons";
import { EdicaoEmpressa } from "../EdicaoEmpressa/edicaoEmpressa";


function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica se a página atual é "CadastroEmpresa"
  const isCadastroEmpresaPage = location.pathname === '/cadastroEmpresa';
  const isCadastroPage = location.pathname === '/cadastro';
  const isLogin= location.pathname === '/login';
  const isEditarEmpressa= location.pathname === '/edicaoEmpressa';
  const isVagas= location.pathname === '/vagas';

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
    <header className={`header-principal 
    ${isCadastroPage ? 'degrade' : ''}
    ${isCadastroEmpresaPage ? 'degrade' : ''}
    ${isLogin ? 'degradeReverso' : ''}
    ${isEditarEmpressa ? 'headerBranco' : ''}
     `}>

      <div id="logo" onClick={navegarParaPaginaPrincipal}>
        {!isCadastroEmpresaPage && !isCadastroPage && !isLogin?(
          // Exibe a logo para outras páginas
          <img src={logo} alt="logo" id="imgLogo" />
        ) : (
          // Exibe "Página Inicial" e "Sou Candidato" no lugar da logo para a página CadastroEmpresa
          <div className="opcoesHeaderCadastro" style={{fontSize:'19px', marginLeft:'2cm'}}>
            
            <a onClick={cadastroEmpresa}>Sou empresa </a>
            <a onClick={cadastroUsuario}>Sou Candidato</a>
            <a onClick={PaginaDeVagas}>vagas</a>
            <a onClick={navegarParaPaginaPrincipal}>Página inicial</a>
            
          </div>
        )}
      </div>

      <div className="conteudoHeader">
        {!isCadastroEmpresaPage && !isCadastroPage && !isLogin && !isEditarEmpressa && !isVagas? (
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
                <li>
                  <a onClick={PaginaDeVagas}>Vagas</a>
                </li>

              </ul>
            </div>

            {!isVagas? (
            <div className="botoes">
              <button className="btn" onClick={navegarParaOLogin}>Entrar</button>
              <button className="btn" onClick={cadastroUsuario}>Cadastro</button>
            </div>
            ):('')}
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