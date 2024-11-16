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

const Login = () => {

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

export default Login;