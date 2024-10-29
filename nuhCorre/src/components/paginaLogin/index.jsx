import './login.css';
import Header from '../paginaPrincipal/Header';
import Footer from '../paginaPrincipal/Footer';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ValidarCPF from '../hooks/ValidaCPF';
import validarCNPJ from '../../hooks/validarCNPJ'
import validarCPF from '../../hooks/ValidaCPF'

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

  async function validarEmail(email) {

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
    
  }

  const handleLoginUsuario = async () => {
    if(validarCPF(document.querySelector('input[name="email"]').value)){
      await handleLoginGeneric('Usuario', validarCPF);
    }else{
      await handleLoginGeneric('Usuario', validarEmail);
    }
  };

  const handleLoginEmpresa = async () => {
    if(validarCNPJ(document.querySelector('input[name="email"]').value)){
      await handleLoginGeneric('Empresa', validarCNPJ);
    }else{
      await handleLoginGeneric('Empresa', validarEmail);
    }
  };

  const handleLoginGeneric = async (usuarioTipo, validarFuncao) => {
    console.log('entrou generico');
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
  
      const stringify = JSON.stringify(postData);
      const respostaApi = await axios.post(endpoint, JSON.parse(stringify), {
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
      <div className='principalLogin'>
        <div className="container_login">
          <div className="titulo">
            <h1>Bem vindo, {tipoUsuario}!</h1>
          </div>
          <div className="inputsLogin">
            <label htmlFor="email">{label}</label>
            <input type="email" name="email" className='inputLogin' placeholder={placeHolder} />
            <label htmlFor="senha">Senha:</label>
            <input type="password" name="senha" className='inputLogin' placeholder='Digite sua senha' />
          </div>
          <div className="botoes_container_login">
            <button className='botaoLogin' onClick={handleLogin}>Login</button>
            <button className='botaoLogin' onClick={navigateToCadastro}>Cadastrar</button>
          </div>
          <button className="botaoMudaTipo" onClick={handleMudarTipoUsuario}>{botaoMudar}</button>
          <p className="error">{erroLogin}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
