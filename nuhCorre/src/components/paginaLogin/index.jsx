import { useEffect, useRef, useState } from "react";
import Header from "../header/Header";
import Footer2 from "../footer2/Footer2";
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

import olhoFechado from "../../assets/olhoFechado.jpg";
import olhoAberto from "../../assets/olhoAberto.jpg.png";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import boxicons from "boxicons";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [erroApi, setErroApi] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();

  const navegarParaLoginUsuario = () => { navigate('/login') };
  const navegarParaCadastroUsuario = () => { navigate('/cadastro') };
  const navegarParaCadastroEmpresa = () => { navigate('/cadastroEmpresa') };
  const navegarParaLoginEmpresa = () => { navigate('/loginEmpresa') };


  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length > 4 && /[a-zA-Z]/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let errors = {};

    if (!validateEmail(email)) {
      errors.email = " * Email inválido";
      valid = false;
    }

    if (!validatePassword(password)) {
      errors.password =
        "* A senha deve ter mais de 6 caracteres e conter pelo menos uma letra";
      valid = false;
    }

    setErrors(errors);

    if (valid){

      const respostaLogin = await axios.post('http://localhost:8080/auth/login/email', {
        email: email,
        senha: password
      },{
        validateStatus: function (status) {
          return status <= 500;
        }
      });

      if(respostaLogin.status === 200){
        localStorage.setItem('token', respostaLogin.data.token);
        return;
      }else{
        console.log("erro")
        setErroApi(respostaLogin.data.detail);
      }

    }else{
      setErroApi("Preencha os campos corretamente");
    }

  };

  /* Navegação */
  const paginaInicio = () => {
    navigate('/');
  };

   const paginaCadastro = () => {
    navigate('/cadastro');
  };

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
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={`input-login h-12 border rounded-xl border-2 border-solid ${errors.email ? 'border-red-500 shadow-md shadow-red-500' : 'border-sky-500'}`}
                  />
                  {errors.email && <p className="text-red-500">{errors.email}</p>}
                  
                  <div className="relative">
                    <input
                      type={mostrarSenha ? "text" : "password"}
                      placeholder="Senha"
                      onChange={(e) => setPassword(e.target.value)}
                      className={`input-login h-12 border rounded-xl border-2 border-solid w-full ${errors.password ? 'border-red-500 shadow-md shadow-red-500' : 'border-sky-500'}`}
                    />
                    <img
                      src={mostrarSenha ? olhoAberto : olhoFechado}
                      alt="olho"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-4"
                    />
                  </div>
                  {errors.password && <p className="text-red-500">{errors.password}</p>}
                  
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
                  <span onClick={paginaCadastro} className="cadastre-se text-blue-800 hover:cursor-pointer">
                    Cadastre-se
                  </span>
                </h2>
                <p className="erro-api text-center font-bold text-red-400">{erroApi}</p>
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
                <Image isZoomed width={250} alt="NuhCorre" src={Logo}></Image>
                <h2 className="texto">Acesse sua conta</h2>
                <h3 className="texto-usuario text-gray-400">
                  Bem-vindo de volta! Estamos felizes em vê-lo.
                </h3>
              </div>
              <div className="form-login w-full h-full p-4">
                <form className="flex flex-col gap-4 items-center w-full" onSubmit={handleSubmit}>
                  <div className="form-input flex flex-col gap- w-[100%]">
                    <label htmlFor="email" className="text-black">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Digite seu email"
                      onChange={(e) => setEmail(e.target.value)}
                      className={`input-login shadow-xl h-12 p-2 border-sky-500 border rounded-xl border-2 border-solid ${errors.email ? 'border-red-400' : 'border-sky-500'}`}
                    />
                  </div>

                  <div className="relative w-[100%]">
                    <label htmlFor="senha" className="text-black">Senha </label>
                      <input
                        type={mostrarSenha ? "text" : "password"}
                        placeholder="Digite sua senha"
                        name="senha"
                        onChange={(e) => setPassword(e.target.value)}
                        className={`input-login shadow-xl w-full h-12 p-2 border-sky-500 border rounded-xl  border-2 border-solid ${errors.password ? 'border-red-400' : 'border-sky-500'}`}
                      />
                      <img
                        src={mostrarSenha ? olhoAberto : olhoFechado}
                        alt="olho"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                        className="absolute right-4 top-2/3 transform -translate-y-1/2 cursor-pointer w-4"
                      />

                </div>

                  <button
                    type="submit"
                    className="botao-login h-12 rounded-xl bg-[#5B82BB] text-white font-bold w-[100%]"
                  >
                    Entrar
                  </button>
                  <div className="texto-cadastro flex justify-center items-center flex-col font-bold">
                    <h2 className="texto">
                      Ainda não tem uma conta?{" "}
                      <span className="cadastre-se text-blue-800 hover:cursor-pointer">
                        Cadastre-se
                      </span>
                    </h2>
                    <div className="erros flex flex-col gap-4 items-center justify-center">
                      <p className="erro-api text-center font-bold text-red-400">{erroApi}</p>
                      <p className="erro-api text-center font-bold text-red-400">{errors.email}</p>
                      <p className="erro-api text-center font-bold text-red-400">{errors.password}</p>
                    </div>


                  </div>
                </form>
              </div>
            </div>

            <div className="container-informacoes-projeto w-[50%] bg-[#718CB3] flex flex-col h-dvh">
              <div className="header-container-infos flex flex-row gap-4 text-white font-medium justify-end mt-4">
                <Dropdown>
                  <DropdownTrigger>
                    <h1 className="text-white text-white text-bold">
                      Sou empresa
                    </h1>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem onClick={navegarParaCadastroEmpresa}>
                      <div className="item-dropdown-usuario flex flex-row items-center gap-2">
                        <box-icon
                          name="user-plus"
                          color="#000000"
                          size="sm"
                          type="solid"
                        ></box-icon>
                        <p className="text-black font-bold text-sm">Cadastro</p>
                      </div>
                    </DropdownItem>
                    <DropdownItem onClick={navegarParaLoginEmpresa}>
                      <div className="item-dropdown-usuario flex flex-row items-center gap-2">
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
                <h1 className="texto-header text-bold font-white" onClick={paginaInicio}>
                  Página inicial
                </h1>
              </div>

              <div className="imagem-projeto flex mt-8 ml-8 flex justify-center">
                <Image width={150} alt="NuhCorre" src={Camaleao}></Image>
              </div>

              <div className="explica-o-nuhcorre flex flex-col gap-4 ml-4 dark:bg-[#5b82bbd1]">
                <h1 className="titulo-informacoes-projeto text-white font-bold text-2xl mb-2">
                  Sobre a NuhCorre
                </h1>
                <p className="texto text-white font-medium mb-4">
                  A NuhCorre é lider em conectar talentos com oportunidades.
                  Nossa missão é criar um mercado de trabalho mais inclusivo e
                  acessivel para todos
                </p>

                <ul className="qualidades-nuh-corre">
                  <li className="item-qualidade-nuh-corre flex flex-row gap-2 text-white font-medium">
                    <span className="check">✓</span>
                    <p className="texto">
                      Encontre canditados próximos a você!
                    </p>
                  </li>

                  <li className="item-qualidade-nuh-corre flex flex-row gap-2 text-white font-medium">
                    <span className="check">✓</span>
                    <p className="texto">Presente em todo o Brasil</p>
                  </li>

                  <li className="item-qualidade-nuh-corre flex flex-row gap-2 text-white font-medium">
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
              <form className="flex flex-col gap-4 items-center w-full" onSubmit={handleSubmit}>
                <div className="form-input flex flex-col gap-2 w-[73%]">
                  <label htmlFor="email" className="text-black">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Digite seu email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={`input-login h-12 p-2 shadow-md border-[#2F6FCC] border rounded-xl border-2 border-solid ${errors.email ? 'border-red-400 shadow-md' : 'border-sky-500'}`}
                  />
                  {errors.email && <p className="text-red-500 text-center">{errors.email}</p>}
                </div>

                <div className="relative w-[73%]">
                    <input
                      type={mostrarSenha ? "text" : "password"}
                      placeholder="Senha"
                      onChange={(e) => setPassword(e.target.value)}
                      className={`input-login h-12 border rounded-xl border-2 border-solid w-full ${errors.password ? 'border-red-500 shadow-md' : 'border-[#2F6FCC]'}`}
                    />
                    <img
                      src={mostrarSenha ? olhoAberto : olhoFechado}
                      alt="olho"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-4"
                    />
              </div>
              {errors.password && <p className="text-red-500 w-64 text-center">{errors.password}</p>}
    
                <button
                  type="submit"
                  className="botao-login h-12 rounded-xl bg-[#718CB3] text-white font-bold w-[73%]"
                >
                  Entrar
                </button>
                <div className="texto-cadastro flex justify-center items-center flex-col font-bold">
                  <h2 className="texto">
                    Ainda não tem uma conta?{" "}
                    <span onClick={paginaCadastro} className="cadastre-se text-blue-800 hover:cursor-pointer">
                      Cadastre-se
                    </span>
                  </h2>
                  <p className="erro-api text-center font-bold text-red-400">{erroApi}</p>

                </div>
              </form>
            </div>
          </div>

          <div className="container-informacoes-projeto w-[50%] bg-[#718CB3] flex flex-col h-dvh dark:bg-[#5b82bbd1]">
            <div className="header-container-infos flex flex-row gap-4 text-white font-medium justify-end mr-8 mt-4 dark:bg-[#5b82bbd1]">
              <Dropdown>
                <DropdownTrigger>
                  <h1 className="text-white text-white text-bold text-xl">
                    Sou empresa
                  </h1>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onClick={navegarParaCadastroEmpresa}>
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
                  <DropdownItem onClick={navegarParaLoginEmpresa}>
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
              <h1 className="texto-header text-bold font-white text-xl" onClick={paginaInicio}>
                Página inicial
              </h1>
            </div>

            <div className="explica-o-nuhcorre flex flex-col justify-center h-full dark:bg-[#5b82bbd1]">
              <div className="imagem-projeto flex mt-8 ml-8 flex justify-center items-center">
                <Image width={170} alt="NuhCorre" src={Camaleao}></Image>
              </div>
              <h1 className="titulo-informacoes-projeto text-white font-bold text-4xl mb-4 ml-[20%]">
                Bem-vindo à NuhCorre
              </h1>
              <p className="texto text-white font-medium mb-8 w-[50%] ml-[20%]">
                A NuhCorre é lider em conectar talentos com oportunidades. Nossa
                missão é criar um mercado de trabalho mais inclusivo e acessivel
                para todos
              </p>

              <ul className="qualidades-nuh-corre ml-[20%]">
                <li className="item-qualidade-nuh-corre flex gap-1 text-white font-medium">
                  <span className="check">✓</span>
                  <p className="texto">Encontre vagas próximas a você!</p>
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

      <Footer2/>
    </>
  );
};

export default Login;

