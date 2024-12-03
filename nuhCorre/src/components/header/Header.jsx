import "./styleHeader.css"; 
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Image } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import boxicons from "boxicons";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import useDarkMode from "../../hooks/useDarkMode";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDarkMode = useDarkMode();

  // Verifica se a página atual é "CadastroEmpresa"
  const isCadastroEmpresaPage = location.pathname === '/cadastroEmpresa';
  const isHomePage = location.pathname === '/';
  const isContatoPage = location.pathname === '/contato';
  const isCadastroUsuarioPage = location.pathname === '/cadastro';
  const isLoginPage = location.pathname === '/login';

  const navegarParaOLogin = () => {
    navigate('/login');
  };

  const cadastroUsuario = () => {
    navigate('/cadastro');
  };

  const cadastroEmpresa = () => {
    navigate('/cadastroEmpresa');
  };

  const navegarParaPaginaPrincipal = () => {
    navigate('/');
  };

  const edicaoEmpressa = () => {
    navigate('/edicaoEmpressa');
  };

  const paginaLoginEmpresa = () => {
    navigate('/loginEmpresa');
  };

  const navegarParaContato = () => {
    navigate('/contato');
  };

  return (
    <header className="pagina-principal 
      top-0 left-0 w-full h-20 bg-[#5b82bbd1] flex justify-between items-center p-4
    ">
      <div className="logo flex items-center gap-2">
        <Image
          isZoomed
          width={150}
          alt="NuhCorre"
          src={logo}
          onClick={navegarParaPaginaPrincipal}
        />
        <ThemeSwitcher />
      </div>

      <div className="tipos-usuarios">
        <ul className="flex items-center gap-4">
          <li 
            className={`hover:cursor-pointer ${isHomePage ? 'link-ativo' : ''}`} 
            onClick={navegarParaPaginaPrincipal}
          >
            <a href="#" className="text-white font-bold text-lg">Inicio</a>
          </li>
          <li 
            className={`hover:cursor-pointer ${isContatoPage ? 'link-ativo' : ''}`} 
            onClick={navegarParaContato}
          >
            <a href="#" className="text-white font-bold text-lg">Contato</a>
          </li>
          <li 
            className={`hover:cursor-pointer ${isCadastroUsuarioPage ? 'link-ativo' : ''}`} 
            onClick={cadastroUsuario}
          >
            <Dropdown>
              <DropdownTrigger>
                <a href="#" className="text-white font-bold text-lg">Sou usuário</a>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={cadastroUsuario}>
                  <div className="item-dropdown-usuario flex items-center gap-2">
                    {!isDarkMode ? (<box-icon name='user-plus' color='#000000' size='md' type='solid' ></box-icon>) : ( <box-icon name='user-plus' color='#ffffff' size='md' type='solid' ></box-icon>)}
                    <p className="text-black font-bold text-lg dark:text-white">Cadastro</p>
                  </div>
                </DropdownItem>
                <DropdownItem onClick={navegarParaOLogin}>
                  <div className="item-dropdown-usuario flex items-center gap-2">
                    {!isDarkMode ? (<box-icon name='door-open' color='#000000' size='md' type='solid' ></box-icon>) : (<box-icon name='door-open' color='#ffffff' size='md' type='solid' ></box-icon>)}
                    <p className="text-black font-bold text-lg dark:text-white">Login</p>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <li 
            className={`hover:cursor-pointer ${isCadastroEmpresaPage ? 'link-ativo' : ''}`} 
            onClick={cadastroEmpresa}
          >
            <Dropdown>
              <DropdownTrigger>
                <a href="#" className="text-white font-bold text-lg">Sou empresa</a>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={cadastroEmpresa}>
                  <div className="item-dropdown-empresa flex items-center gap-2">
                    {!isDarkMode ? (<box-icon name='user-plus' color='#000000' size='md' type='solid' ></box-icon>) : (<box-icon name='user-plus' color='#ffffff' size='md' type='solid' ></box-icon>)}
                    <p className="text-black font-bold text-lg dark:text-white">Cadastro</p>
                  </div>
                </DropdownItem>
                <DropdownItem onClick={paginaLoginEmpresa}>
                  <div className="item-dropdown-empresa flex items-center gap-2">
                    {!isDarkMode ? (<box-icon name='door-open' color='#000000' size='md' type='solid' ></box-icon>) : (<box-icon name='door-open' color='#ffffff' size='md' type='solid' ></box-icon>)}
                    <p className="text-black font-bold text-lg dark:text-white">Login</p>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </div>
      <nav className="nav">
        <input id="menu" type="checkbox" />
        <label htmlFor="menu">Menu</label>
        <ul className="menu">
          {/* Link "Inicio" */}
          <li
            className={`hover:cursor-pointer ${isHomePage ? 'link-ativo' : ''}`}
            onClick={navegarParaPaginaPrincipal}
          >
            <a href="#" className="text-white font-bold text-lg">Inicio</a>
          </li>
          <li className={`hover:cursor-pointer ${isCadastroUsuarioPage ? 'link-ativo' : ''}`} onClick={cadastroUsuario}>
            <Dropdown>
              <DropdownTrigger>
                  <a href="#" className="text-white font-bold text-lg">Usuário</a>
                </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={cadastroUsuario}>
                  <div className="item-dropdown-usuario flex items-center gap-2">
                    <box-icon name='user-plus' color='#000000' size='md' type='solid' ></box-icon>
                    <p className="text-black font-bold text-lg">Cadastro</p>
                  </div>
                </DropdownItem>
                <DropdownItem onClick={navegarParaOLogin}>
                  <div className="item-dropdown-usuario flex items-center gap-2">
                    <box-icon name='door-open' color='#000000' size='md' type='solid' ></box-icon>
                    <p className="text-black font-bold text-lg">Login</p>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <li className={`hover:cursor-pointer ${isCadastroEmpresaPage ? 'link-ativo' : ''}`} onClick={cadastroEmpresa}>
            <Dropdown>
              <DropdownTrigger>
                <a href="#" className="text-white font-bold text-lg">Empresa</a>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={cadastroEmpresa}>
                  <div className="item-dropdown-empresa flex items-center gap-2">
                    <box-icon name='user-plus' color='#000000' size='md' type='solid'></box-icon>
                    <p className="text-black font-bold text-lg">Cadastro</p>
                  </div>
                </DropdownItem>
                <DropdownItem onClick={paginaLoginEmpresa}>
                  <div className="item-dropdown-empresa flex items-center gap-2">
                    <box-icon name='door-open' color='#000000' size='md' type='solid'></box-icon>
                    <p className="text-black font-bold text-lg">Login</p>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <li className={`hover:cursor-pointer ${isContatoPage ? 'link-ativo' : ''}`}onClick={navegarParaContato}>
            <a href="#" className="text-white font-bold text-lg">Contato</a>
          </li>
        </ul>
      </nav>

    </header>
  );
}

export default Header;
