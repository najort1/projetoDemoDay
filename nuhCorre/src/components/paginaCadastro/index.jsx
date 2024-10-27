import React, { useEffect, useRef, useState } from 'react';
import './cadastro.css';
import Header from '../paginaPrincipal/Header';
import Footer from '../paginaPrincipal/Footer';

const CadastroUsuario = () => {

    //Referências para error dos inputs
    const erroNome = useRef(null);
    const erroData = useRef(null);
    const erroCpf = useRef(null);
    const erroEmail = useRef(null);
    const erroSenha = useRef(null);
    const erroTelefone = useRef(null);
    const errovulnerabilidade = useRef(null);

    //Estados para animação para visibilidade da senha
    const [senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    const toggleSenhaVisivel = () => {
        setSenhaVisivel(!senhaVisivel);
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
                element.style.borderBottom = '5px solid #ff510c';
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
                        } else if(element.validity.patternMismatch) {
                            errorStyling('Preencha apenas com letras.', erroNome.current, element, true);
                        }else{
                            errorStyling(undefined, erroNome.current, element, false);
                        }

                        break;

                    case 'Data':

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

                        }else{

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
    }, []);

    return (
        <>
            <Header />
            <main>
                <div id="caixaCadastro">
                    <h1>Cadastro</h1>
                    <form>

                        <div>
                            <label htmlFor="name">Nome:</label>
                            <input type="text" name="name" required pattern="^([a-zA-ZÀ-ÖØ-öø-ÿ]|\s)*$" placeholder="Nome" />
                            <span ref={erroNome} className="erro"></span>
                        </div>

                        <div>
                            <label htmlFor="Data">Data de Nascimento:</label>
                            <input type="date" name="Data" required placeholder="Data de Nascimento" />
                            <span ref={erroData} className="erro"></span>
                        </div>

                        <div>
                            <label htmlFor="cpf">CPF:</label>
                            <input type="text" name="cpf" pattern='^\d{3}\.\d{3}\.\d{3}-\d{2}$' required placeholder="CPF" />
                            <span ref={erroCpf} className="erro"></span>
                        </div>

                        <div>
                            <label htmlFor="endereco">Endereço:</label>
                            <input type="text" name="endereco" required placeholder="Endereço" />
                            <span className="erro"></span>
                        </div>

                        <div>
                            <label htmlFor="escolaridade">Escolaridade:</label>
                            <input type="text" name="escolaridade" required placeholder="Escolaridade" />
                            <span className="erro"></span>
                        </div>

                        <div>
                            <label htmlFor="sexo">Sexo:</label>
                            <select name="sexo" required>
                                <option value="" disabled selected>Selecione seu sexo</option>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                                <option value="outro">Outro</option>
                            </select>
    
                        </div>

                        <div>
                            <label htmlFor="telefone">Telefone:</label>
                            <input type="tel" name="telefone" pattern="^\(\d{2}\) \d{4,5}-\d{4}$" required placeholder="(XX) XXXX-XXXX" />
                            <span ref={erroTelefone} className="erro"></span>
                        </div>

                        <div>
                            <label htmlFor="vulnerabilidade">Vulnerabilidade:</label>
                            <input type="text" name="vulnerabilidade" pattern='^[a-zA-ZÀ-ÖØ-öø-ÿ]+$' required placeholder="Vulnerabilidade" />
                            <span ref={errovulnerabilidade} className="erro"></span>
                        </div>

                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" required pattern="^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$" placeholder="Email" />
                            <span ref={erroEmail} className="erro"></span>
                        </div>

                        <div>
                            <label htmlFor="senha">Senha:</label>
                            
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={senhaVisivel ? 'text' : 'password'}
                                    name="password"
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
                                    {senhaVisivel ? '-' : '👁'} {/* Ícones para mostrar/esconder */}
                                </button>
                                <span ref={erroSenha} className="erro"></span>
                            </div>
                        </div>

                        <input type="submit" />

                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default CadastroUsuario;