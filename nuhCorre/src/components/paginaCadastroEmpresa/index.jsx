import { useEffect, useRef, useState } from 'react';
import './cadastroEmpresa.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import camaleao from '../../assets/camaleao.png';
import Logo from '../../assets/logo.png';
import olhoAberto from '../../assets/olhoAberto.jpg.png'; // Caminho para o ícone de olho aberto
import olhoFechado from '../../assets/olhoFechado.jpg'; // Caminho para o ícone de olho fechado

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

    // Estados para animação para visibilidade da senha
    const [senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    const toggleSenhaVisivel = () => {
        setSenhaVisivel(!senhaVisivel);
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
                        } else if(element.validity.patternMismatch) {
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
        return cnpj.replace(/(\d{2})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d)/, '$1/$2')
                    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    };

    // Formatação do telefone
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
                element.removeEventListener('focus', () => {});
                element.removeEventListener('blur', () => {});
                if (element.name === 'cpf') {
                    element.removeEventListener('input', () => {});
                }
                if (element.name === 'telefone') {
                    element.removeEventListener('input', () => {});
                }
            });
        };
    }, );

    const handleCadastro = async () => {
        const form = document.querySelector('form');
        const formData = new FormData(form);
    
        const data = {};
    
        formData.forEach((value, key) => {
            data[key] = value;
        });
    
        try {
            const response = await axios.post('http://localhost:8080/auth/empresa/cadastrar', data);
            const repostaJson = response.data;
    
            if (response.status === 201) {
                const bearer = repostaJson.token;
                localStorage.setItem('token', bearer);
                alert('Usuário cadastrado com sucesso!');
                navigate('/vagas');
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

    const paginaInicio = () => {
        navigate('/');
    };

<<<<<<< Updated upstream
=======
    const paginaCandidato = () => {
        navigate('/cadastro');
    };
    
>>>>>>> Stashed changes
    return (
        <>

            <main id='main-cadastroempresa'>
                
            <div id="expli"> 
                <div className="opcoesHeaderCadastro" style={{fontSize:'19px', marginLeft:'1rem'}}>
<<<<<<< Updated upstream
                    <a onClick={paginaInicio}>Página Inicial </a>
                    <a onClick='#'>Sou Candidato</a>
=======
                    <a onClick={paginaInicio} style={{cursor: 'pointer'}}>Página Inicial </a>
                    <a onClick={paginaCandidato} style={{cursor: 'pointer'}}>Sou Candidato</a>
>>>>>>> Stashed changes
                </div>
                <div className="titulo_expli">
                    <img src={camaleao} alt="" className="logo-image" />
                    <h2>Sobre a NuhCorre</h2>
                    <p>
                        A NuhCorre é líder em conectar talentos com<br/> oportunidades.
                        Nossa missão é criar um mercado<br/> de trabalho 
                        mais inclusivo e acessível para todos.<br/>
                    </p>
                    <ul className="check-list">
                        <li>Encontre candidatos próximos a sua empresa!</li>
                        <li>Filtros de vagas personalizados.</li>
                        <li>Suporte personalizado para candidatos e empresas.</li>
                    </ul>
                </div>
            </div>

            <div id="caixaCadastroEmpresa">
                <div className="alinhamentoEmpresa">
                    <img src={Logo} alt='' className="alinhamentoEmpresa" style={{width: '11vw'}} />
                    <h2 className="alinhamentoEmpresaP" style={{marginBottom:'10px'}}>Olá empresa, conecte-se conosco!</h2>
                    <span className="alinhamentoEmpresaS" style={{marginBottom:'15px'}}>Inclusão começa com oportunidades!</span>
                </div>
                
                <form>

                    <div>
                        <label htmlFor="name">Nome fantasia:</label>
                        <input type="text" name="nome" required pattern="^([a-zA-ZÀ-ÖØ-öø-ÿ]|\s)*$" placeholder="Nome" />
                        <span ref={erroNome} className="erro"></span>
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" required pattern="^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$" placeholder="Email" />
                        <span ref={erroEmail} className="erro"></span>
                    </div>

                    <div>
                        <label htmlFor="telefone">Telefone:</label>
                        <input type="tel" name="telefone" pattern="^\(\d{2}\) \d{4,5}-\d{4}$" required placeholder="(XX) XXXX-XXXX" />
                        <span ref={erroTelefone} className="erro"></span>
                    </div>
                    
                    <div>
                        <label htmlFor="cnpj">CNPJ:</label>
                        <input 
                            type="text" 
                            name="cnpj" 
                            required 
                            pattern="^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$" 
                            placeholder="cnpj" 
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
                                        marginRight:'10px'
                                    }}
                                />
                            </button>
                        </div>
                        <span ref={erroSenha} className="erro"></span>
                    </div>

                    <input style={{marginTop:'10px'}} type="submit" onClick={handleCadastro} />
                    <a href='' style={{color: '#000', textAlign:'center', display: 'block', marginTop:'15px'}}>Já tem uma conta? <span style={{color: '#425BD6'}}>Faça login</span></a>
                </form>
            </div>
        </main>

        </>
    );
};

export default CadastroEmpresa;
