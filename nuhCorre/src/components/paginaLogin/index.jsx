<<<<<<< HEAD
import { useEffect, useRef, useState } from 'react';
import '../paginaCadastro/cadastro.css';
import './login.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validarCNPJ from '../../hooks/validarCNPJ';
import validarCPF from '../../hooks/ValidaCPF';
import logo from '../../assets/Logo NuhCorre.png';


const LoginPage = () => {
  const [tipoLogin, setTipoLogin] = useState('email');
  const [erroLogin, setErroLogin] = useState('');
  const naimport './login.css';
  import Header from '../header/Header';
  import Footer from '../footer/Footer';
  import axios from 'axios';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import validarCNPJ from '../../hooks/validarCNPJ';
  import validarCPF from '../../hooks/ValidaCPF';
  import logo from '../../assets/Logo NuhCorre.png';
  
  
  const LoginPage = () => {
    const [tipoLogin, setTipoLogin] = useState('email');
    const [erroLogin, setErroLogin] = useState('');
    const navigate = useNavigate();
    const [tipoUsuario, setTipoUsuario] = useState('Usuario');
    const [placeHolder, setPlaceHolder] = useState('Digite seu email ou cpf');
    const [label, setLabel] = useState('Email ou CPF:');
    const [botaoMudar, setBotaoMudar] = useState('Empresas');
  
    const urlApi = 'http://localhost:8080';
  
    const navigateToCadastro = () => navigate('/cadastro');
  
    const handleLogin = async () => {
      tipoUsuario === 'Usuario' ? await handleLoginUsuario() : await handleLoginEmpresa();
    };
  
    const validarEmail = (email) => {
      if (email === '') {
        setErroLogin('Campo email ou cpf vazio.');
        return false;
      }
  
      if (!email.includes('@') || !email.includes('.')) {
        setErroLogin('Email inválido.');
        return false;
      }
  
      setTipoLogin('email');
      return true;
    };
  
    const handleLoginUsuario = async () => {
      const emailValue = document.querySelector('input[name="email"]').value;
      if (validarCPF(emailValue)) {
        await handleLoginGeneric('Usuario', validarCPF);
      } else {
        await handleLoginGeneric('Usuario', validarEmail);
      }
    };
  
    const handleLoginEmpresa = async () => {
      const emailValue = document.querySelector('input[name="email"]').value;
      if (validarCNPJ(emailValue)) {
        await handleLoginGeneric('Empresa', validarCNPJ);
      } else {
        await handleLoginGeneric('Empresa', validarEmail);
      }
    };
  
    const handleLoginGeneric = async (usuarioTipo, validarFuncao) => {
      const email = document.querySelector('input[name="email"]').value;
      const senha = document.querySelector('input[name="senha"]').value;
  
      if (!validarFuncao(email)) {
        setErroLogin('Email ou CPF inválido.');
        return;
      }
  
      let tipoLogin = 'email';
      let postData = { email, senha };
  
      if (usuarioTipo === 'Usuario') {
        tipoLogin = validarFuncao === validarCPF ? 'cpf' : 'email';
        if (tipoLogin === 'cpf') {
          postData = { cpf: email, senha };
        }
      } else if (usuarioTipo === 'Empresa') {
        tipoLogin = validarFuncao === validarCNPJ ? 'cnpj' : 'email';
        if (tipoLogin === 'cnpj') {
          postData = { cnpj: email, senha };
        }
      }
  
      try {
        const endpoint = usuarioTipo === 'Usuario' 
          ? `${urlApi}/auth/login/${tipoLogin}` 
          : `${urlApi}/auth/empresa/login/${tipoLogin}`;
  
        const respostaApi = await axios.post(endpoint, postData, {
          responseType: 'json',
          validateStatus: (status) => status <= 500,
        });
  
        if (respostaApi.status === 500) {
          setErroLogin(respostaApi.data.detail);
        } else {
          localStorage.setItem('token', respostaApi.data.token);
          window.location.href = '/';
        }
      } catch (error) {
        console.error(error);
        setErroLogin('Erro ao realizar login. Tente novamente.');
      }
    };
  
    const handleMudarTipoUsuario = () => {
      const novoTipo = tipoUsuario === 'Usuario' ? 'Empresa' : 'Usuario';
      setTipoUsuario(novoTipo);
      setLabel(novoTipo === 'Usuario' ? 'Email ou CPF:' : 'E-mail ou CNPJ:');
      setPlaceHolder(novoTipo === 'Usuario' ? 'Digite seu email ou cpf' : 'Digite seu E-mail ou CNPJ');
      setBotaoMudar(novoTipo === 'Usuario' ? 'Empresas' : 'Usuários');
    };
  
    return (
      <>
        <Header />
        <div className="principalLogin">
          <div className="container_login">
            <div className="logo">
              <img src={logo} alt="Logo NuhCorre" />
            </div>
            <h2>Acesse sua conta</h2>
            <p className="welcome">Bem-vindo de volta! Estamos felizes em vê-lo.</p>
  
            <div className="inputsLogin">
              <label htmlFor="email">{label}</label>
              <input type="text" name="email" className="inputLogin" placeholder={placeHolder} />
              <label htmlFor="senha">Senha</label>
              <input type="password" name="senha" className="inputLogin" placeholder="Digite sua senha" />
            </div>
  
            <button className="botaoLogin" onClick={handleLogin}>Entrar</button>
            <p className="esqueceuSenha">
              <a href="#" onClick={navigateToCadastro}>Recupere aqui</a>
            </p>
  
            <button className="botaoMudaTipo" onClick={handleMudarTipoUsuario}>{botaoMudar}</button>
            <p className="error">{erroLogin}</p>
          </div>
  
          <div className="container_info">
            <div className="info_logo">
              <img src={logo} alt="Logo NuhCorre" />
            </div>
            <h3>Seu corre sempre valorizado</h3>
            <h2>Sobre a NuhCorre</h2>
            <p>A NuhCorre é líder em conectar talentos com oportunidades. Nossa missão é criar um mercado de trabalho mais inclusivo e acessível para todos.</p>
            <ul>
              <li>✓ Mais de 1 milhão de vagas preenchidas</li>
              <li>✓ Presente em todo o Brasil</li>
              <li>✓ Suporte personalizado para candidatos e empresas</li>
            </ul>
          </div>
        </div>
        <Footer />
      </>
    );
  };
  
  export default LoginPage;
  vigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState('Usuario');
  const [placeHolder, setPlaceHolder] = useState('Digite seu email ou cpf');
  const [label, setLabel] = useState('Email ou CPF:');
  const [botaoMudar, setBotaoMudar] = useState('Empresas');

  const urlApi = 'http://localhost:8080';

  const navigateToCadastro = () => navigate('/cadastro');

  const handleLogin = async () => {
    tipoUsuario === 'Usuario' ? await handleLoginUsuario() : await handleLoginEmpresa();
  };

  const validarEmail = (email) => {
    if (email === '') {
      setErroLogin('Campo email ou cpf vazio.');
      return false;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErroLogin('Email inválido.');
      return false;
    }

    setTipoLogin('email');
    return true;
  };

  const handleLoginUsuario = async () => {
    const emailValue = document.querySelector('input[name="email"]').value;
    if (validarCPF(emailValue)) {
      await handleLoginGeneric('Usuario', validarCPF);
    } else {
      await handleLoginGeneric('Usuario', validarEmail);
    }
  };

  const handleLoginEmpresa = async () => {
    const emailValue = document.querySelector('input[name="email"]').value;
    if (validarCNPJ(emailValue)) {
      await handleLoginGeneric('Empresa', validarCNPJ);
    } else {
      await handleLoginGeneric('Empresa', validarEmail);
    }
  };

  const handleLoginGeneric = async (usuarioTipo, validarFuncao) => {
    const email = document.querySelector('input[name="email"]').value;
    const senha = document.querySelector('input[name="senha"]').value;

    if (!validarFuncao(email)) {
      setErroLogin('Email ou CPF inválido.');
      return;
    }

    let tipoLogin = 'email';
    let postData = { email, senha };

    if (usuarioTipo === 'Usuario') {
      tipoLogin = validarFuncao === validarCPF ? 'cpf' : 'email';
      if (tipoLogin === 'cpf') {
        postData = { cpf: email, senha };
      }
    } else if (usuarioTipo === 'Empresa') {
      tipoLogin = validarFuncao === validarCNPJ ? 'cnpj' : 'email';
      if (tipoLogin === 'cnpj') {
        postData = { cnpj: email, senha };
      }
    }

    try {
      const endpoint = usuarioTipo === 'Usuario' 
        ? `${urlApi}/auth/login/${tipoLogin}` 
        : `${urlApi}/auth/empresa/login/${tipoLogin}`;

      const respostaApi = await axios.post(endpoint, postData, {
        responseType: 'json',
        validateStatus: (status) => status <= 500,
      });

      if (respostaApi.status === 500) {
        setErroLogin(respostaApi.data.detail);
      } else {
        localStorage.setItem('token', respostaApi.data.token);
        window.location.href = '/';
      }
    } catch (error) {
      console.error(error);
      setErroLogin('Erro ao realizar login. Tente novamente.');
    }
  };

  const handleMudarTipoUsuario = () => {
    const novoTipo = tipoUsuario === 'Usuario' ? 'Empresa' : 'Usuario';
    setTipoUsuario(novoTipo);
    setLabel(novoTipo === 'Usuario' ? 'Email ou CPF:' : 'E-mail ou CNPJ:');
    setPlaceHolder(novoTipo === 'Usuario' ? 'Digite seu email ou cpf' : 'Digite seu E-mail ou CNPJ');
    setBotaoMudar(novoTipo === 'Usuario' ? 'Empresas' : 'Usuários');
  };
import Logo from '../../assets/logo.png';
=======
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
>>>>>>> main

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

<<<<<<< HEAD
  return (
    <>
      <Header />
      <div className="principalLogin">
        <div className="container_login">
          <div className="logo">
            <img src={logo} alt="Logo NuhCorre" />
          </div>
          <h2>Acesse sua conta</h2>
          <p className="welcome">Bem-vindo de volta! Estamos felizes em vê-lo.</p>

          <div className="inputsLogin">
            <label htmlFor="email">{label}</label>
            <input type="text" name="email" className="inputLogin" placeholder={placeHolder} />
            <label htmlFor="senha">Senha</label>
            <input type="password" name="senha" className="inputLogin" placeholder="Digite sua senha" />
          </div>

          <button className="botaoLogin" onClick={handleLogin}>Entrar</button>
          <p className="esqueceuSenha">
            <a href="#" onClick={navigateToCadastro}>Recupere aqui</a>
          </p>

          <button className="botaoMudaTipo" onClick={handleMudarTipoUsuario}>{botaoMudar}</button>
          <p className="error">{erroLogin}</p>
        </div>

        <div className="container_info">
          <div className="info_logo">
            <img src={logo} alt="Logo NuhCorre" />
          </div>
          <h3>Seu corre sempre valorizado</h3>
          <h2>Sobre a NuhCorre</h2>
          <p>A NuhCorre é líder em conectar talentos com oportunidades. Nossa missão é criar um mercado de trabalho mais inclusivo e acessível para todos.</p>
          <ul>
            <li>✓ Mais de 1 milhão de vagas preenchidas</li>
            <li>✓ Presente em todo o Brasil</li>
            <li>✓ Suporte personalizado para candidatos e empresas</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );

=======
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
>>>>>>> main
};

export default Login;
