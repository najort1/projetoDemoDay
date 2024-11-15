import { useEffect, useRef, useState } from "react";
import "../paginaCadastro/cadastro.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Camaleao from "../../assets/camaleao.png";
import { Image } from "@nextui-org/react";
import {
  TabletView,
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  isTablet,
  isDesktop,
} from "react-device-detect";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import boxicons from "boxicons";

const Login = () => {
  return (
    <>
      {isMobile && !isTablet && (
        <MobileView>
          <Header />
          <div
            className="containerPrincipal shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                w-full
                
                xl:w-1/3
                md:w-[70%]

                "
          >
            <div className="container-login">
              <div className="logo-login flex justify-center items-center flex-col font-bold gap-2 mb-6">
                <Image isZoomed width={150} alt="NuhCorre" src={Logo}></Image>
                <h2 className="texto">Acesse sua conta</h2>
                <h3 className="texto-usuario text-gray-400">
                  Bem-vindo de volta! Estamos felizes em vê-lo.
                </h3>
              </div>
              <div className="form-login w-full h-full p-4">
                <form className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Email"
                    className="input-login h-12 border-sky-500 border rounded-xl border-solid"
                  />
                  <input
                    type="password"
                    placeholder="Senha"
                    className="input-login h-12 border-sky-500 border rounded-xl border-solid"
                  />
                  <button
                    type="submit"
                    className="botao-login h-12 rounded-xl bg-[#5B82BB] text-white font-bold"
                  >
                    Entrar
                  </button>
                </form>
              </div>
            </div>

            <div className="container-cadastro m-8">
              <div className="texto-cadastro flex justify-center items-center flex-col font-bold">
                <h2 className="texto">
                  Ainda não tem uma conta?{" "}
                  <span className="cadastre-se text-blue-800 hover:cursor-pointer">
                    Cadastre-se
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </MobileView>
      )}

      {isMobile && isTablet && (
        <>
          <div className="tudo-conteudo-principal w-full h-full flex flex-row items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="container-login w-[50%] shadow-2xl h-dvh flex flex-col">
              <div className="logo-login flex justify-center items-center flex-col font-bold gap-2 mb-6">
                <Image isZoomed width={150} alt="NuhCorre" src={Logo}></Image>
                <h2 className="texto">Acesse sua conta</h2>
                <h3 className="texto-usuario text-gray-400">
                  Bem-vindo de volta! Estamos felizes em vê-lo.
                </h3>
              </div>
              <div className="form-login w-full h-full p-4">
                <form className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Email"
                    className="input-login h-12 border-sky-500 border rounded-xl border-solid"
                  />
                  <input
                    type="password"
                    placeholder="Senha"
                    className="input-login h-12 border-sky-500 border rounded-xl border-solid"
                  />
                  <button
                    type="submit"
                    className="botao-login h-12 rounded-xl bg-[#5B82BB] text-white font-bold"
                  >
                    Entrar
                  </button>
                </form>
              </div>
            </div>

            <div className="container-informacoes-projeto w-[50%] bg-[#718CB3] flex flex-col h-dvh">
              <div className="header-container-infos flex flex-row gap-4 text-white font-medium justify-end">
                <Dropdown>
                  <DropdownTrigger>
                    <h1 className="text-white text-bold">Sou usuário</h1>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>
                      <div className="item-dropdown-usuario flex items-center gap-2">
                        <box-icon
                          name="user-plus"
                          color="#000000"
                          size="sm"
                          type="solid"
                        ></box-icon>
                        <p className="text-black font-bold">Cadastro</p>
                      </div>
                    </DropdownItem>
                    <DropdownItem>
                      <div className="item-dropdown-usuario flex items-center gap-2">
                        <box-icon
                          name="door-open"
                          color="#000000"
                          size="sm"
                          type="solid"
                        ></box-icon>
                        <p className="text-black font-bold">Login</p>
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger>
                    <h1 className="text-white text-white text-bold">
                      Sou empresa
                    </h1>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>
                      <div className="item-dropdown-usuario flex items-center gap-2">
                        <box-icon
                          name="user-plus"
                          color="#000000"
                          size="sm"
                          type="solid"
                        ></box-icon>
                        <p className="text-black font-bold text-sm">Cadastro</p>
                      </div>
                    </DropdownItem>
                    <DropdownItem>
                      <div className="item-dropdown-usuario flex items-center gap-2">
                        <box-icon
                          name="door-open"
                          color="#000000"
                          size="sm"
                          type="solid"
                        ></box-icon>
                        <p className="text-black font-bold text-sm">Login</p>
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <h1 className="texto-header text-bold font-white">
                  Página inicial
                </h1>
              </div>

              <div className="imagem-projeto flex mt-8 ml-8 flex justify-center">
                <Image width={150} alt="NuhCorre" src={Camaleao}></Image>
              </div>

              <div className="explica-o-nuhcorre flex flex-col gap-4 ml-4">
                <h1 className="titulo text-white font-bold text-2xl">
                  Sobre a NuhCorre
                </h1>
                <p className="texto text-white font-medium">
                  A NuhCorre é lider em conectar talentos com oportunidades.
                  Nossa missão é criar um mercado de trabalho mais inclusivo e
                  acessivel para todos
                </p>

                <ul className="qualidades-nuh-corre">
                  <li className="item-qualidade-nuh-corre flex gap-2 text-white font-medium">
                    <span className="check">✓</span>
                    <p className="texto">
                      Encontre canditados próximos a você!
                    </p>
                  </li>

                  <li className="item-qualidade-nuh-corre flex gap-2 text-white font-medium">
                    <span className="check">✓</span>
                    <p className="texto">Presente em todo o Brasil</p>
                  </li>

                  <li className="item-qualidade-nuh-corre flex gap-2 text-white font-medium">
                    <span className="check">✓</span>
                    <p className="texto">
                      Supore personalizado para candidatos e empresa
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      <BrowserView>
        <div className="tudo-conteudo-principal w-full h-full flex flex-row">
          <div className="container-login w-[50%] shadow-2xl h-dvh flex flex-col gap-8 justify-center items-center">
            <div className="logo-login font-bold gap-2 text-center flex flex-col items-center">
              <Image isZoomed width={150} alt="NuhCorre" src={Logo}></Image>
              <h2 className="texto">Acesse sua conta</h2>
              <h3 className="texto-usuario text-gray-400">
                Bem-vindo de volta! Estamos felizes em vê-lo.
              </h3>
            </div>
            <div className="form-login p-4 w-full">
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Email"
                  className="input-login h-12 border-sky-500 border rounded-xl border-solid"
                />
                <input
                  type="password"
                  placeholder="Senha"
                  className="input-login h-12 border-sky-500 border rounded-xl border-solid"
                />
                <button
                  type="submit"
                  className="botao-login h-12 rounded-xl bg-[#5B82BB] text-white font-bold"
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>

          <div className="container-informacoes-projeto w-[50%] bg-[#718CB3] flex flex-col h-dvh">
            <div className="header-container-infos flex flex-row gap-4 text-white font-medium justify-end mr-8">
              <Dropdown>
                <DropdownTrigger>
                  <h1 className="text-white text-bold text-2xl">Sou usuário</h1>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>
                    <div className="item-dropdown-usuario flex items-center gap-2">
                      <box-icon
                        name="user-plus"
                        color="#000000"
                        size="sm"
                        type="solid"
                      ></box-icon>
                      <p className="text-black font-bold">Cadastro</p>
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="item-dropdown-usuario flex items-center gap-2">
                      <box-icon
                        name="door-open"
                        color="#000000"
                        size="sm"
                        type="solid"
                      ></box-icon>
                      <p className="text-black font-bold ">Login</p>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger>
                  <h1 className="text-white text-white text-bold text-2xl">
                    Sou empresa
                  </h1>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>
                    <div className="item-dropdown-usuario flex items-center gap-2">
                      <box-icon
                        name="user-plus"
                        color="#000000"
                        size="sm"
                        type="solid"
                      ></box-icon>
                      <p className="text-black font-bold text-sm">Cadastro</p>
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div className="item-dropdown-usuario flex items-center gap-2">
                      <box-icon
                        name="door-open"
                        color="#000000"
                        size="sm"
                        type="solid"
                      ></box-icon>
                      <p className="text-black font-bold text-sm">Login</p>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <h1 className="texto-header text-bold font-white text-2xl">
                Página inicial
              </h1>
            </div>

            <div className="imagem-projeto flex mt-8 ml-8 flex justify-center">
              <Image width={150} alt="NuhCorre" src={Camaleao}></Image>
            </div>

            <div className="explica-o-nuhcorre flex flex-col ml-4">
              <h1 className="titulo text-white font-bold text-4xl">
                Sobre a NuhCorre
              </h1>
              <p className="texto text-white font-medium">
                A NuhCorre é lider em conectar talentos com oportunidades. Nossa
                missão é criar um mercado de trabalho mais inclusivo e acessivel
                para todos
              </p>

              <ul className="qualidades-nuh-corre ">
                <li className="item-qualidade-nuh-corre flex gap-1 text-white font-medium">
                  <span className="check">✓</span>
                  <p className="texto">Encontre canditados próximos a você!</p>
                </li>

                <li className="item-qualidade-nuh-corre flex gap-1 text-white font-medium">
                  <span className="check">✓</span>
                  <p className="texto">Presente em todo o Brasil</p>
                </li>

                <li className="item-qualidade-nuh-corre flex gap-1 text-white font-medium">
                  <span className="check">✓</span>
                  <p className="texto">
                    Supore personalizado para candidatos e empresa
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </BrowserView>
    </>
  );
};

export default Login;
