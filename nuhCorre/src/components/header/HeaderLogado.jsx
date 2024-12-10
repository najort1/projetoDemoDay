import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logoBranca.png';
import { Image } from "@nextui-org/react";
import boxicons from "boxicons";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import useDarkMode from "../../hooks/useDarkMode";
import { jwtDecode } from 'jwt-decode';
import { useEffect,useState } from 'react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    User,
  } from "@nextui-org/react";
import axios from 'axios';

function HeaderLogado(
) {
  const navigate = useNavigate();
  const location = useLocation();
  const isDarkMode = useDarkMode();
  const [photoPerfil, setPhotoPerfil] = useState({photo: null, error: false});
  const [nome, setNome] = useState('');
  const imgPadrao = 'https://i.pinimg.com/enabled_lo_mid/736x/5c/95/31/5c9531d05f919414e9dff0c974388f67.jpg';


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    };

  const fetchActualPhoto = async () => {
    try {

        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        let cnpj = decoded.usuarioId;
        setNome(decoded.sub);
  
        const response = await axios.get('http://localhost:8080/imagem/usuario/' + cnpj,
            {
                validateStatus: function (status) {
                    return status <= 500;
                },
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }

            }
        );

        const data = response.data;

        if(response.status === 403){
            localStorage.removeItem('token');
            navigate('/login');
        }

        if(response.status === 200) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPerfil({photo: reader.result, error: false});
            };
            reader.readAsDataURL(data);
        }else if(response.status === 404){
            setPhotoPerfil({photo: imgPadrao, error: true});
        }
        
        else{
            console.error(data);

        }



    } catch (error) {
        console.error(error);
    }
}


  const navegarParaPaginaPrincipal = () => {navigate('/');};
  const navegarParaPaginaEndereco = () => {navigate('/cadastrar-endereco');};
    const navegarParaPaginaPerfil = () => {navigate('/editar-perfil-candidato');};

  useEffect(() => {
    fetchActualPhoto();
  }
    , []);

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

      <div className="usuario-e-opcoes">

      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={photoPerfil.photo}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="text-black font-bold
                dark:text-white
            ">Logado como:</p>
            <p className="text-black font-bold
                dark:text-white
            ">{nome}</p>
          </DropdownItem>

          <DropdownItem
            onClick={navegarParaPaginaPerfil}
            color='primary'
          >
            <div className="item-dropdown-header-logado">
                <p className="texto-informacao-item text-black font-bold
                    dark:text-white
                ">
                    Editar perfil
                </p>
            </div>
          </DropdownItem>
          <DropdownItem
            onClick={navegarParaPaginaEndereco}
            color='primary'
          >
            <div className="item-dropdown-header-logado">
            <p className="texto-informacao-item text-black font-bold
                dark:text-white
            ">
                    Cadastrar endereco
                </p>
            </div>
          </DropdownItem>
          <DropdownItem
            onClick={handleLogout}
            color='danger'
          >
            <div className="item-dropdown-header-logado">
            <p className="texto-informacao-item text-black font-bold
                dark:text-white
            ">
                    Sair da conta
                </p>
            </div>
          </DropdownItem>

        </DropdownMenu>
        </Dropdown>
      </div>



    </header>
  );
}

export default HeaderLogado;
