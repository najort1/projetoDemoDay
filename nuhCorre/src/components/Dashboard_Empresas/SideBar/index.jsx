import boxicons from "boxicons";
import Chart from "chart.js/auto";
import { Sidebar } from "primereact/sidebar";
import { useEffect, useState } from "react";

import logo from "../../../assets/logo.png";
import logoWhite from "../../../assets/logoBranca.png";
import { Slider } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import useDarkMode from "../../../hooks/useDarkMode";

import { useNavigate } from "react-router-dom";


const SideBar = ({ visible, setVisible }) => {

    const navigate = useNavigate();
    const isDarkMode = useDarkMode();
    const [photoPerfil, setPhotoPerfil] = useState({photo: null, error: false});
    const imgPadrao = 'https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png';
    
    const RedirectCadastrarNovaVaga = () => {
        navigate('/cadastrar-vaga')
    }

    const RedirectPaginaInicial = () => {
        navigate('/dashboard')
    }

    const EditarPerfil = () => { navigate('/edicao-Empresa') }

    const RedirectCandidatos = () => {
        navigate('/candidatos')
    }

    const RedirectVagas = () => {
        navigate('/vagas')
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    const fetchActualPhoto = async () => {
      try {
  
          const token = localStorage.getItem('token');
          const decoded = jwtDecode(token);
          let cnpj = decoded.cnpjEmpresa;
          cnpj = cnpj.replace(/[^\d]+/g,'');
  
          const response = await axios.get('http://localhost:8080/imagem/empresa/' + cnpj,
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

  useEffect(() => {
      fetchActualPhoto();
  }
  , []);



    
    return (
        <>
              <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-[60%] h-full relative shadow-2xl xl:w-[15%] overflow-auto
    md:w-[30%] backdrop-blur-md
      dark:bg-gray-800
    "
        content={({ closeIcon, hide }) => (
          <div className="h-full flex flex-col justify-between text-white">
            {/* Logo e botão fechar */}
            <div className="flex justify-between items-center p-4 md:justify-center">
              <img
                src={!isDarkMode ? logo : logoWhite}
                alt="Logo"
                className="w-full h-24 object-cover md:w-[90%]"
              />
              <button
                onClick={hide}
                className="text-3xl hover:text-gray-300 transition-colors
                
                "
              >
                {!isDarkMode ? ( <box-icon type="solid" name="x-circle"></box-icon> ) : ( <box-icon type="solid" name="x-circle" color='#ffffff'></box-icon> )}
              </button>
            </div>

            {/* Itens de navegação */}
            <div className="flex flex-col items-center gap-6">
              <div className="nav-item flex items-center gap-3 text-lg font-medium hover:text-gray-300 transition-colors"
                onClick={RedirectPaginaInicial}
              >
                {!isDarkMode ? ( <box-icon type="solid" name="home"></box-icon> ) : ( <box-icon type="solid" name="home" color='#ffffff'></box-icon> )}
                <a href="#" className="text-black
                  dark:text-white
                ">
                  Início
                </a>
              </div>
              <div
                className="nav-item flex items-center gap-3 text-lg font-medium hover:text-gray-300 transition-colors"
                onClick={RedirectCadastrarNovaVaga}
              >
                {!isDarkMode ? ( <box-icon type="solid" name="file-plus"></box-icon> ) : ( <box-icon type="solid" name="file-plus" color='#ffffff'></box-icon> )}
                <a href="#" className="text-black
                  dark:text-white
                ">
                  Nova vaga
                </a>
              </div>
              <div className="nav-item flex items-center gap-3 text-lg font-medium hover:text-gray-300 transition-colors"
                onClick={RedirectCandidatos}
              >
                {!isDarkMode ? ( <box-icon type="solid" name="user-detail"></box-icon> ) : ( <box-icon type="solid" name="user-detail" color='#ffffff'></box-icon> )}
                <a href="#" className="text-black
                  dark:text-white
                ">
                  Candidatos
                </a>
              </div>
              <div className="nav-item flex items-center gap-3 text-lg font-medium hover:text-gray-300 transition-colors"
                onClick={RedirectVagas}
              >
                {!isDarkMode ? ( <box-icon type="solid" name="spreadsheet"></box-icon> ) : ( <box-icon type="solid" name="spreadsheet" color='#ffffff'></box-icon> )}
                <a href="#" className="text-black
                  dark:text-white
                ">
                  Vagas
                </a>
              </div>

              <div className="nav-item flex items-center gap-3 text-lg font-medium hover:text-gray-300 transition-colors"
                onClick={EditarPerfil}
              >
                {!isDarkMode ? ( <box-icon type="solid" name="edit"></box-icon> ) : ( <box-icon type="solid" name="edit" color='#ffffff'></box-icon> )}
                <a href="#" className="text-black
                  dark:text-white
                ">
                  Editar perfil
                </a>

              </div>

            </div>

            {/* Informações do usuário e botão sair */}
            <div className="flex justify-between items-center p-4">
              <img
                src={photoPerfil.photo ? photoPerfil.photo : imgPadrao}
                alt="Usuário logado"
                className="rounded-full w-16 h-16 object-cover border-2 border-white"
              />
              <button className="text-lg text-black font-bold hover:text-gray-300 transition-colors
                dark:text-white
              "
              onClick={handleLogout}>
                Sair
              </button>
            </div>
          </div>
        )}
      ></Sidebar>
        </>
    )
}

export default SideBar