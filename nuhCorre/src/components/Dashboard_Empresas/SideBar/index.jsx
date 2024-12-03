import boxicons from "boxicons";
import Chart from "chart.js/auto";
import { Sidebar } from "primereact/sidebar";
import { useEffect, useState } from "react";

import logo from "../../../assets/logo.png";
import { Slider } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { useNavigate } from "react-router-dom";


const SideBar = ({ visible, setVisible }) => {

    const navigate = useNavigate();

    const RedirectCadastrarNovaVaga = () => {
        navigate('/cadastrar-vaga')
    }

    const RedirectPaginaInicial = () => {
        navigate('/dashboard')
    }

    const RedirectCandidatos = () => {
        navigate('/candidatos')
    }

    const RedirectVagas = () => {
        navigate('/vagas')
    }


    
    return (
        <>
              <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-[60%] h-full relative shadow-2xl xl:w-[15%] overflow-auto
    md:w-[30%] backdrop-blur-md"
        content={({ closeIcon, hide }) => (
          <div className="h-full flex flex-col justify-between text-white">
            {/* Logo e botão fechar */}
            <div className="flex justify-between items-center p-4 md:justify-center">
              <img
                src={logo}
                alt="Logo"
                className="w-full h-24 object-cover md:w-[90%]"
              />
              <button
                onClick={hide}
                className="text-3xl hover:text-gray-300 transition-colors"
              >
                <box-icon type="solid" name="x-circle"></box-icon>
              </button>
            </div>

            {/* Itens de navegação */}
            <div className="flex flex-col items-center gap-6">
              <div className="nav-item flex items-center gap-3 text-lg font-medium hover:text-gray-300 transition-colors"
                onClick={RedirectPaginaInicial}
              >
                <box-icon type="solid" name="home"></box-icon>
                <a href="#" className="text-black">
                  Início
                </a>
              </div>
              <div
                className="nav-item flex items-center gap-3 text-lg font-medium hover:text-gray-300 transition-colors"
                onClick={RedirectCadastrarNovaVaga}
              >
                <box-icon name="file-plus" type="solid"></box-icon>
                <a href="#" className="text-black">
                  Nova vaga
                </a>
              </div>
              <div className="nav-item flex items-center gap-3 text-lg font-medium hover:text-gray-300 transition-colors"
                onClick={RedirectCandidatos}
              >
                <box-icon name="user-detail" type="solid"></box-icon>
                <a href="#" className="text-black">
                  Candidatos
                </a>
              </div>
              <div className="nav-item flex items-center gap-3 text-lg font-medium hover:text-gray-300 transition-colors"
                onClick={RedirectVagas}
              >
                <box-icon name="spreadsheet"></box-icon>
                <a href="#" className="text-black">
                  Vagas
                </a>
              </div>
            </div>

            {/* Informações do usuário e botão sair */}
            <div className="flex justify-between items-center p-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIMDsWFBoBCZUhHBwy7G9G65_pJ2SZngH5BQ&s"
                alt="Usuário logado"
                className="rounded-full w-16 object-cover border-2 border-white"
              />
              <button className="text-lg text-black font-bold hover:text-gray-300 transition-colors">
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