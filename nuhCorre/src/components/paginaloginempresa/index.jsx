import { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo1 from '../../assets/camaleao.png';
import Logo2 from '../../assets/logo.png';
import olhoAberto from '../../assets/olhoAberto.jpg.png';
import olhoFechado from '../../assets/olhoFechado.jpg';
import Footer2 from "../footer2/Footer2";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
  } from "@nextui-org/react";
  import boxicons from "boxicons";


const LoginEmpresa = () => {
    const [emailCnpj, setEmailCnpj] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const navigate = useNavigate();
    const navegarParaCadastroUsuario = () => { navigate('/cadastro') };
    const navegarParaLoginUsuario = () => { navigate('/login') };
    const [erro, setErro] = useState('');

    const toggleSenhaVisivel = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCnpj);
        const isCnpjValid = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(emailCnpj);

        if (!isEmailValid && !isCnpjValid) {
            alert('Por favor, insira um e-mail ou CNPJ válido.');
            return;
        }

        const data = {
            email: isEmailValid ? emailCnpj : '',
            cnpj: isCnpjValid ? emailCnpj : '',
            senha: senha,
        };

        try {
            const response = await axios.post('http://localhost:8080/auth/empresa/login/email', data);
            if (response.status === 200) {
                const bearer = response.data.token;
                localStorage.setItem('token', bearer);
                navigate('/dashboard'); 
            } else {
                setErro(response.data.detail);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErro(error.response.data.detail);
            } else {
                alert('Erro de conexão com o servidor.');
            }
        }
    };

    const paginaInicio = () => {
        navigate('/');
    };

    const paginaCadastroLogin = () => {
        navigate('/cadastro-Empresa');
    };

    return (
        <>
        <main id='main-loginempresa'>
            <div id='expliu-loginempresa' className='container-informacoes-projeto w-[50%] bg-[#718CB3] flex flex-col h-dvh bg-[#718CB3] dark:bg-[#5b82bbd1]'>
            <div className="header-container-infos flex flex-row gap-4 text-white font-medium justify-end ml-8 mt-4
                ">
              <Dropdown>
                <DropdownTrigger>
                  <h1 className="text-white text-white text-bold text-xl">
                    Sou usuário
                  </h1>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onClick={navegarParaCadastroUsuario}>
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
                  <DropdownItem onClick={navegarParaLoginUsuario}>
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

                <div className='expliu-loginempresa'>
                    <img src={Logo1} alt='' className="logo-image-loginempresa" />
                    <h2>Bem-vindo à NuhCorre </h2>
                    <p>
                        Conecte-se com talentos e encontre as melhores <br/>soluções
                        para sua empresa. Faça parte da nossa<br/> rede de sucesso!
                    </p>
                    <ul className="check-list-loginempresa">
                        <li>✔ Encontre os melhores talentos para sua equipe.</li>
                        <li>✔ Facilidade e segurança no gerenciamento de vagas.</li>
                        <li>✔ Suporte personalizado para candidatos e empresas.</li>
                    </ul>
                </div>
            </div>

            <div className='bg-fundo-claro dark:bg-fundo-escuro' id="caixaLoginEmpresa">
                <div className='alinhamentoLoginEmpresa'>
                    <img src={Logo2} alt='' className='alinhamentoLoginEmpresaLogo' style={{ width: '11vw' }} />
                    <h2 className='alinhamentoLoginEmpresaTitulo' style={{ marginBottom: '10px' }}>Faça login na sua conta</h2>
                    <span className='alinhamentoLoginEmpresaTexto' style={{ marginBottom: '15px' }}>Gerencie vagas e encontre os melhores talentos.</span>
                </div>

                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="emailCnpj">Email ou CNPJ:</label>
                        <input
                            type="text"
                            name="emailCnpj"
                            value={emailCnpj}
                            onChange={(e) => setEmailCnpj(e.target.value)}
                            required
                            placeholder="Email ou CNPJ"
                            className='dark:text-white dark:bg-black'
                        />
                    </div>

                    <div>
                        <label htmlFor="senha">Senha:</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={senhaVisivel ? 'text' : 'password'}
                                name="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                placeholder="Digite sua senha"
                                className='dark:text-white dark:bg-black'
                            />
                            <button
                                type="button"
                                onClick={toggleSenhaVisivel}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <img
                                    src={senhaVisivel ? olhoAberto : olhoFechado}
                                    alt="Alternar visibilidade da senha"
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        position: 'relative'
                                        
                                    }}
                                />
                            </button>
                        </div>
                    </div>

                    <input type="submit" value="Entrar" />
                    <a href="/recuperar-senha" style={{ color: '#000', textAlign: 'center', display: 'block' }}>Esqueceu sua senha? <span style={{ color: '#425BD6' }}>Recupere aqui</span></a>
                    <p className="erro-realizar-login text-red-400 font-bold text-center">{erro}</p>

                </form>
            </div>
        </main>
        <Footer2/>
        </>
    );
};

export default LoginEmpresa; 


















