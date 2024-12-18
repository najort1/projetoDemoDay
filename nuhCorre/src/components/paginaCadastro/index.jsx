import { useEffect, useRef, useState } from 'react';
import './cadastro.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo1 from '../../assets/camaleao.png';
import Logo2 from '../../assets/logo.png';
import olhoAberto from '../../assets/olhoAberto.jpg.png'; // Caminho para o ícone de olho aberto
import olhoFechado from '../../assets/olhoFechado.jpg'; // Caminho para o ícone de olho fechado
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Footer2 from '../footer2/Footer2';

const CadastroUsuario = () => {

    //Referências para error dos inputs
    const erroNome = useRef(null);
    const erroData = useRef(null);
    const erroCpf = useRef(null);
    const erroEmail = useRef(null);
    const erroSenha = useRef(null);
    const erroTelefone = useRef(null);
    const errovulnerabilidade = useRef(null);
    const navigate = useNavigate();


    //Estados para animação para visibilidade da senha
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

    //Estilização para quando dá erro em algum campo
    const errorStyling = (mensagem = '', span, tag, booleano) => {
        if (booleano) {
            span.innerHTML = mensagem;//mensagem a ser exibida
            tag.style.border = '2px solid red';//estilização da borda
        } else {
            span.innerHTML = '';
            tag.style.border = 'none';
        }
    };

    //Execução dos erros
    const errorHandling = () => {

        const inputs = Array.from(document.querySelectorAll('input')).slice(0, -1);//Pegando todos os inputs(menos o submit)

        inputs.forEach((element) => {

            //Quando um input entrar em foco ficará com essa estilização
            element.addEventListener('focus', () => {
                element.style.border = 'none';
                element.style.borderBottom = '5px solid #718CB3';
            });

            //Quando sair do foco
            element.addEventListener('blur', () => {

                let data;

                /*
                    valueMissing - O campo etá vazio
                    patternMismatch - validando o pattern
                
                */

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

                    case 'dataNascimento':

                        data = new Date(element.value);//Pagando ano digitado

                        if (element.validity.valueMissing) {
                            errorStyling('Preencha o campo.', erroData.current, element, true);
                        } else if (data.getFullYear() >= new Date().getFullYear() || (new Date().getFullYear() - data.getFullYear() < 18)) {
                            errorStyling('Preencha uma data valida.', erroData.current, element, true);
                        } else {
                            errorStyling(undefined, erroData.current, element, false);
                        }

                        break;

                    case 'cpf':

                        if (element.validity.valueMissing) {
                            errorStyling('Preencha o campo.', erroCpf.current, element, true);
                        } else if (element.validity.patternMismatch) {
                            errorStyling('Preencha um CPF válido (xxx.xxx.xxx-xx).', erroCpf.current, element, true);
                        } else {
                            errorStyling(undefined, erroCpf.current, element, false);
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

            // Formata o CPF enquanto o usuário digita
            if (element.name === 'cpf') {
                element.addEventListener('input', (e) => {
                    const valorFormatado = formatarCPF(e.target.value);
                    e.target.value = valorFormatado;
                });
            }

            // Formata o telefone enquanto o usuário digita
            if (element.name === 'telefone') {
                element.addEventListener('input', (e) => {
                    const valorFormatado = formatarTelefone(e.target.value);
                    e.target.value = valorFormatado;
                });
            }
        });
    };

    //Formatação do cpf
    const formatarCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
        return cpf.replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{2})$/, '$1-$2');
    };

    //Formatação do número de telefone
    const formatarTelefone = (telefone) => {
        telefone = telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (telefone.length <= 10) {
            return telefone.replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            return telefone.replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(\d{4})(\d{2})$/, '$1-$2');
        }
    };

    useEffect(() => {
        errorHandling();

        return () => {
            const inputs = Array.from(document.querySelectorAll('input')).slice(0, -1);
            inputs.forEach((element) => {
                element.removeEventListener('focus', () => { });
                element.removeEventListener('blur', () => { });
                if (element.name === 'cpf') {
                    element.removeEventListener('input', () => { });
                }
                if (element.name === 'telefone') {
                    element.removeEventListener('input', () => { });
                }
            });
        };
    },);

    const handleCadastro = async () => {

        if(erroNome.current.innerHTML !== '' || erroData.current.innerHTML !== '' || erroCpf.current.innerHTML !== '' || erroEmail.current.innerHTML !== '' || erroSenha.current.innerHTML !== '' || erroTelefone.current.innerHTML !== '' || errovulnerabilidade.current.innerHTML !== ''){
            alert('Preencha os campos corretamente.');
            return;
        }

        const form = document.querySelector('form');
        const formData = new FormData(form);

        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await axios.post('http://localhost:8080/auth/cadastrar', data);
            const repostaJson = response.data;

            if (response.status === 201 || response.status === 200) {
                const bearer = repostaJson.token;
                localStorage.setItem('token', bearer);
                navigate('/editar-perfil-candidato')
            } else {
                alert(`${repostaJson.detail}`);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.detail);
            } else {
                alert('Erro ao cadastrar usuário.');
            }
        }
    };

    /* Navegação */
    const paginaInicio = () => {
        navigate('/');
    };

    const paginaLogin = () => {
        navigate('/login');
    };

    const paginaLoginEmpresa = () => {
        navigate('/login-Empresa');
    };

    const cadastroEmpresa = () => {
        navigate('/cadastro-Empresa');
    };

    return (
        <>

            <main id='main-cadastrousuario'>

                <div id='expliu' className='bg-[#718CB3] dark:bg-[#5b82bbd1]'>
                    <div className='opcoesHeaderCadastro' style={{ fontSize: '19px', marginLeft: '1rem', marginTop: '1rem' }}>
                        <a onClick={paginaInicio}>Página Inicial </a>
                        <Dropdown>
                            <DropdownTrigger>
                                <a href="#" className="text-white font-bold text-lg">Sou empresa</a>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onClick={cadastroEmpresa}>
                                    <div className="item-dropdown-empresa flex items-center gap-2">
                                        <box-icon name='user-plus' color='#000000' size='md' type='solid' ></box-icon>
                                        <p className="text-black font-bold text-lg">Cadastro</p>
                                    </div>
                                </DropdownItem>
                                <DropdownItem onClick={paginaLoginEmpresa}>
                                    <div className="item-dropdown-empresa flex items-center gap-2">
                                        <box-icon name='door-open' color='#000000' size='md' type='solid' ></box-icon>
                                        <p className="text-black font-bold text-lg">Login</p>
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <div className='titulo_expliu'>
                        <img src={Logo1} alt='' className="logo-imageu" />
                        <h2>Sobre a NuhCorre</h2>
                        <p>
                            A NuhCorre é lider em conectar talentos com<br />
                            oportunidades. Nossa missão é criar um mercado de<br />
                            trabalho mais inclusivo e acessivel para todos.
                        </p>
                        <ul className="check-list">

                            <li>Encontre vagas próximas a você! </li>
                            <li>Presente em todo o Brasil.</li>
                            <li>Suporte personalizado para candidatos e empresas.</li>
                        </ul>

                    </div>
                </div>
                <div className='bg-fundo-claro dark:bg-fundo-escuro' id="caixaCadastroUsuario">
                    <div className='alinhamentousuario'>

                        <img src={Logo2} alt='' className='alinhamentousuario' style={{ width: '11vw' }} />
                        <h2 className='alinhamentousuarioP dark:text-white' style={{ marginBottom: '10px' }}>Olá candidato, conecte-se conosco!</h2>
                        <span className='alinhamentousuarioS' style={{ marginBottom: '15px' }}>Cada pessoa importa, cada talento conta!</span>

                    </div>

                    <form>

                        <div>
                            <label htmlFor="name" className='dark:text-white'>Nome completo:</label>
                            <input type="text" name="nome" required pattern="^([a-zA-ZÀ-ÖØ-öø-ÿ]|\s)*$" placeholder="Nome completo" className='dark:text-white dark:bg-black'/>
                            <span ref={erroNome} className="erro"></span>
                        </div>

                        <div>
                            <label htmlFor="email" className='dark:text-white'>Email:</label>
                            <input type="email" name="email" required pattern="^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$" className='dark:text-white dark:bg-black' placeholder="Email" />
                            <span ref={erroEmail} className="erro"></span>
                        </div>

                        <div>
                            <label htmlFor="telefone" className='dark:text-white'>Telefone:</label>
                            <input type="tel" name="telefone" pattern="^\(\d{2}\) \d{4,5}-\d{4}$" className='dark:bg-black dark:text-white' required placeholder="(XX) XXXX-XXXX" />
                            <span ref={erroTelefone} className="erro"></span>
                        </div>

                        <div>
                            <label htmlFor="dataNascimento" className='dark:text-white'>Nascimento:</label>
                            <input type="date" name="dataNascimento" className='dark:text-white dark:bg-black' required />
                            <span ref={erroData} className="erro"></span>
                        </div>

                        <div>
                            <label htmlFor="senha" className='dark:text-white'>Crie uma senha:</label>

                            <div style={{ position: 'relative' }}>
                                <input
                                    type={senhaVisivel ? 'text' : 'password'}
                                    name="senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                    placeholder="Senha"
                                    className='dark:bg-black dark:text-white'
                                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$"
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
                                    value='Criar conta'
                                    
                                >

                                    <img
                                        src={senhaVisivel ? olhoAberto : olhoFechado}
                                        alt="Alternar visibilidade da senha"
                                        style={{
                                            width: '24px',
                                            height: '24px',
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

                        <input type="submit" onClick={handleCadastro} />
                        <a href=''className='dark:text-white' style={{textAlign: 'center', display: 'block' }}>Já tem uma conta? <span style={{ color: '#718CB3' }} onClick={paginaLogin}>Faça login</span></a>
                    </form>
                </div>
            </main>
            <Footer2 />
        </>
    );
};

export default CadastroUsuario;