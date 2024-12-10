import { useEffect, useRef, useState } from 'react';
import './cadastroEmpresa.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import camaleao from '../../assets/camaleao.png';
import Logo from '../../assets/logo.png';
import olhoAberto from '../../assets/olhoAberto.jpg.png'; // Caminho para o ícone de olho aberto
import olhoFechado from '../../assets/olhoFechado.jpg'; // Caminho para o ícone de olho fechado
import CadastroUsuario from '../paginaCadastro';
import Footer2 from "../footer2/Footer2";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
  } from "@nextui-org/react";
  import boxicons from "boxicons";

const CadastroEmpresa = () => {

    // Referências para error dos inputs
    const erroNome = useRef(null);
    const erroData = useRef(null);
    const erroCNPJ = useRef(null);
    const erroEmail = useRef(null);
    const erroSenha = useRef(null);
    const erroTelefone = useRef(null);
    const errovulnerabilidade = useRef(null);
    const navigate = useNavigate();
    const navegarParaCadastroUsuario = () => { navigate('/cadastro') };
    const navegarParaLoginUsuario = () => { navigate('/login') };
    // Estados para animação para visibilidade da senha
    const [senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [mostrarRequisitos, setMostrarRequisitos] = useState(false);

    const toggleSenhaVisivel = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    const handleFocusSenha = () => {
        setMostrarRequisitos(true); // Vai mostrar quando apertarem no input senha
    };

    const handleBlurSenha = () => {
        setMostrarRequisitos(false); // Vai esconder quando forem apertar em outro input
    };

    // Estilização para quando dá erro em algum campo
    const errorStyling = (mensagem = '', span, tag, booleano) => {
        if (booleano) {
            span.innerHTML = mensagem; // Mensagem a ser exibida
            tag.style.border = '2px solid red'; // Estilização da borda
        } else {
            span.innerHTML = '';
            tag.style.border = 'none';
        }
    };

    // Execução dos erros
    const errorHandling = () => {
        const inputs = Array.from(document.querySelectorAll('input')).slice(0, -1); // Pegando todos os inputs (menos o submit)

        inputs.forEach((element) => {

            // Quando um input entrar em foco ficará com essa estilização
            element.addEventListener('focus', () => {
                element.style.border = 'none';
                element.style.borderBottom = '5px solid #718CB3';
            });

            // Quando sair do foco
            element.addEventListener('blur', () => {

                let data;

                switch (element.name) {
                    case 'name':
                        if (element.validity.valueMissing) {
                            errorStyling('Preencha o campo.', erroNome.current, element, true);
                        } else if (element.validity.patternMismatch) {
                            errorStyling('Preencha apenas com letras.', erroNome.current, element, true);
                        } else {
                            errorStyling(undefined, erroNome.current, element, false);
                        }
                        break;

                    case 'Data':
                        data = new Date(element.value); // Pegando ano digitado
                        if (element.validity.valueMissing) {
                            errorStyling('Preencha o campo.', erroData.current, element, true);
                        } else if (data.getFullYear() >= new Date().getFullYear() || (new Date().getFullYear() - data.getFullYear() < 18)) {
                            errorStyling('Preencha uma data válida.', erroData.current, element, true);
                        } else {
                            errorStyling(undefined, erroData.current, element, false);
                        }
                        break;

                    case 'cnpj':
                        if (element.validity.valueMissing) {
                            errorStyling('Preencha o campo.', erroCNPJ.current, element, true);
                        } else if (element.validity.patternMismatch) {
                            errorStyling('Preencha um CNPJ válido (xxx.xxx.xxx-xx).', erroCNPJ.current, element, true);
                        } else {
                            errorStyling(undefined, erroCNPJ.current, element, false);
                        }
                        break;

                    case 'telefone':
                        if (element.validity.valueMissing) {
                            errorStyling('Preencha o campo.', erroTelefone.current, element, true);
                        } else if (element.validity.patternMismatch) {
                            errorStyling('Preencha um telefone válido (xx) xxxx-xxxx ou (xx) xxxxx-xxxx.', erroTelefone.current, element, true);
                        } else {
                            errorStyling(undefined, erroTelefone.current, element, false);
                        }
                        break;

                    case 'vulnerabilidade':
                        if (element.validity.valueMissing) {
                            errorStyling('Preencha o campo.', errovulnerabilidade.current, element, true);
                        } else if (element.validity.patternMismatch) {
                            errorStyling('Preencha apenas caracteres.', errovulnerabilidade.current, element, true);
                        } else {
                            errorStyling(undefined, errovulnerabilidade.current, element, false);
                        }
                        break;

                    case 'email':
                        if (element.value.length > 50) {
                            errorStyling('O máximo de caracteres é 50.', erroEmail.current, element, true);
                        } else if (element.validity.valueMissing) {
                            errorStyling('Preencha o campo.', erroEmail.current, element, true);
                        } else if (element.validity.patternMismatch) {
                            errorStyling('Utilize letras e números, _ e o tipo de email.', erroEmail.current, element, true);
                        } else {
                            errorStyling(undefined, erroEmail.current, element, false);
                        }
                        break;

                    case 'password':
                        if (element.validity.valueMissing) {
                            errorStyling('Preencha o campo.', erroSenha.current, element, true);
                        } else if (element.value.length < 8 || element.value.length > 20 || element.validity.patternMismatch) {
                            errorStyling('A senha deve ter entre 8 e 20 caracteres, incluindo letras, números e caracteres especiais.', erroSenha.current, element, true);
                        } else {
                            errorStyling(undefined, erroSenha.current, element, false);
                        }
                        break;
                }
            });

            // Formatação do CNPJ
            if (element.name === 'CNPJ') {
                element.addEventListener('input', (e) => {
                    const valorFormatado = formatarCNPJ(e.target.value);
                    e.target.value = valorFormatado;
                });
            }

            // Formatação do telefone
            if (element.name === 'telefone') {
                element.addEventListener('input', (e) => {
                    const valorFormatado = formatarTelefone(e.target.value);
                    e.target.value = valorFormatado;
                });
            }
        });
    };

    // Formatação do CNPJ
    const formatarCNPJ = (cnpj) => {
        cnpj = cnpj.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cnpj.length > 14) cnpj = cnpj.slice(0, 14); // Limita a 14 números
        return cnpj
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    };


    // Formatação do telefone
    const formatarTelefone = (telefone) => {
        telefone = telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (telefone.length > 11) telefone = telefone.slice(0, 11); // Limita a 11 números
        if (telefone.length <= 10) {
            return telefone
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            return telefone
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2');
        }
    };


    useEffect(() => {
        errorHandling();

        return () => {
            const inputs = Array.from(document.querySelectorAll('input')).slice(0, -1);
            inputs.forEach((element) => {
                element.removeEventListener('focus', () => { });
                element.removeEventListener('blur', () => { });
                if (element.name === 'cnpj') {
                    element.removeEventListener('input', () => { });
                }
                if (element.name === 'telefone') {
                    element.removeEventListener('input', () => { });
                }
            });
        };
    },);

    const handleCadastro = async (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário
        const form = document.querySelector('form');
        const formData = new FormData(form);

        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        data.cnpj = data.cnpj.replace(/\D/g, '');

        try {
            const response = await axios.post('http://localhost:8080/auth/empresa/cadastrar', data);
            if (response.status === 201 || response.status === 200) {
                const repostaJson = response.data;
                localStorage.setItem('token', repostaJson.token);
                navigate('/dashboard');
            } else {
                alert(`${response.data.detail}`);
            }
        } catch (error) {
            alert(error.response?.data?.detail || 'Erro ao cadastrar usuário.');
        }
    };


    const paginaInicio = () => {
        navigate('/');
    };

    const paginaLoginEmpresa = () => {
        navigate('/login-Empresa');
    };
    return (
        <>

            <main id='main-cadastroempresa'>

                <div id="expli" className='bg-[#718CB3] dark:bg-[#5b82bbd1]'>
                <div className="header-container-infos flex flex-row gap-4 text-white font-medium justify-start ml-8
                mt-4">
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
                    <div className="titulo_expli">
                        <img src={camaleao} alt="" className="logo-image" />
                        <h2>Sobre a NuhCorre</h2>
                        <p>
                            A NuhCorre é líder em conectar talentos com<br /> oportunidades.
                            Nossa missão é criar um mercado<br /> de trabalho
                            mais inclusivo e acessível para todos.<br />
                        </p>
                        <ul className="check-list">
                            <li>Encontre candidatos próximos a sua empresa!</li>
                            <li>Filtros de vagas personalizados.</li>
                            <li>Suporte personalizado para candidatos e empresas.</li>
                        </ul>
                    </div>
                </div>

                <div className='bg-fundo-claro dark:bg-fundo-escuro' id="caixaCadastroEmpresa">
                    <div className="alinhamentoEmpresa">
                        <img src={Logo} alt='' className="alinhamentoEmpresa" style={{ width: '11vw' }} />
                        <h2 className="alinhamentoEmpresaP dark:text-white" style={{ marginBottom: '10px' }}>Olá empresa, conecte-se conosco!</h2>
                        <span className="alinhamentoEmpresaS" style={{ marginBottom: '15px' }}>Inclusão começa com oportunidades!</span>
                    </div>

                    <form>

                        <div>
                            <label htmlFor="name">Nome fantasia:</label>
                            <input type="text" name="nome" required pattern="^([a-zA-ZÀ-ÖØ-öø-ÿ]|\s)*$" className='dark:bg-black dark:text-white' placeholder="Nome" />
                            <span ref={erroNome} className="erro"></span>
                        </div>

                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" required pattern="^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$" className='dark:text-white dark:bg-black' placeholder="Email" />
                            <span ref={erroEmail} className="erro"></span>
                        </div>

                        <div>
                            <label htmlFor="telefone">Telefone:</label>
                            <input
                                className='dark:bg-black dark:text-white'
                                type="tel"
                                name="telefone"
                                required
                                placeholder="(XX) XXXXX-XXXX"
                                maxLength="15" // Formato máximo: "(99) 99999-9999"
                                onInput={(e) => {
                                    e.target.value = formatarTelefone(e.target.value);
                                    if (e.target.value.replace(/\D/g, '').length > 11) {
                                        e.target.value = e.target.value.slice(0, 15); // Garante corte do excesso
                                    }
                                }}
                            />
                            <span ref={erroTelefone} className="erro"></span>
                        </div>


                        <div>
                            <label htmlFor="cnpj">CNPJ:</label>
                            <input
                                className='dark:bg-black dark:text-white'
                                type="text"
                                name="cnpj"
                                required
                                placeholder="XX.XXX.XXX/XXXX-XX"
                                maxLength="18" // Formato com pontuações ocupa 18 caracteres
                                onInput={(e) => {
                                    e.target.value = formatarCNPJ(e.target.value);
                                    if (e.target.value.replace(/\D/g, '').length > 14) {
                                        e.target.value = e.target.value.slice(0, 18); // Garante corte do excesso
                                    }
                                }}
                            />
                            <span ref={erroCNPJ} className="erro"></span>
                        </div>



                        <div>
                            <label htmlFor="senha">Crie sua senha:</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={senhaVisivel ? 'text' : 'password'}
                                    name="senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                    placeholder="Senha"
                                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$"
                                    onFocus={handleFocusSenha}
                                    onBlur={handleBlurSenha}
                                    className='dark:bg-black'
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
                            <span ref={erroSenha} className="erro"></span>

                            {mostrarRequisitos && (
                                <div className="senha-requisitos" style={{ marginTop: '10px', fontSize: '14px' }}>
                                    <p><strong>A senha deve conter:</strong></p>
                                    <ul>
                                        <li style={{ color: /[a-z]/.test(senha) ? 'green' : 'red' }}>Pelo menos uma letra minúscula</li>
                                        <li style={{ color: /[A-Z]/.test(senha) ? 'green' : 'red' }}>Pelo menos uma letra maiúscula</li>
                                        <li style={{ color: /\d/.test(senha) ? 'green' : 'red' }}>Pelo menos um número</li>
                                        <li style={{ color: /[$*&@#]/.test(senha) ? 'green' : 'red' }}>Pelo menos um caractere especial ($, *, &, @, #)</li>
                                        <li style={{ color: senha.length >= 8 && senha.length <= 20 ? 'green' : 'red' }}>Ter entre 8 e 20 caracteres</li>
                                    </ul>
                                </div>
                            )}

                        </div>

                        <input style={{ marginTop: '10px' }} type="submit" onClick={handleCadastro} />
                        <a href='' style={{ color: '#000', textAlign: 'center', display: 'block', marginTop: '15px' }}>Já tem uma conta? <span style={{ color: '#425BD6' }} onClick={paginaLoginEmpresa}>Faça login</span></a>
                    </form>
                </div>
            </main>
        <Footer2/>
        </>
    );
};

export default CadastroEmpresa;
