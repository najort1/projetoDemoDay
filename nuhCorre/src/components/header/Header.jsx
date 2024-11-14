import "./styleHeader.css"; 
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {Image} from "@nextui-org/react";


function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica se a página atual é "CadastroEmpresa"
  const isCadastroEmpresaPage = location.pathname === '/cadastroEmpresa';

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
      </div>

      <div className="tipos-usuarios">
        <ul className="flex items-center gap-4">
          <li className="hover:cursor-pointer" onClick={navegarParaPaginaPrincipal}>
            <a href="#" className="text-white font-bold text-lg">Inicio</a>
          </li>
          <li className="hover:cursor-pointer" onClick={cadastroUsuario}>
            <a href="#" className="text-white font-bold text-lg">Sou candidato</a>
          </li>
          <li className="hover:cursor-pointer" onClick={cadastroEmpresa}>
            <a href="#" className="text-white font-bold text-lg">Sou empresa</a>
          </li>
          </ul>
      </div>


    </header>
  );
}

export default Header;