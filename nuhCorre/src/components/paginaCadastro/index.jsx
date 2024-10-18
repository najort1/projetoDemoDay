import React, { useEffect, useRef } from 'react';
import './cadastro.css';

const CadastroUsuario = () => {
    const erroNome = useRef(null);
    const erroCnpj = useRef(null);
    const erroEmail = useRef(null);
    const erroSenha = useRef(null);

    const errorStyling = (mensagem = '', span, tag, booleano) => {
        if (booleano) {
            span.innerHTML = mensagem;
            tag.style.border = '2px solid red';
        } else {
            span.innerHTML = '';
            tag.style.border = 'none';
        }
    };

    const errorHandling = () => {
        // Selecionando todos os inputs, exceto o botão de submit
        const inputs = Array.from(document.querySelectorAll('input')).slice(0, -1);

        inputs.forEach((element) => {
            // Quando estiver em foco, estiliza os inputs
            element.addEventListener('focus', () => {
                element.style.border = 'none';
                element.style.borderBottom = '5px solid #ff510c';
            });

            // Validando quando o foco sai
            element.addEventListener('blur', () => {
                switch (element.name) {
                    case 'name':
                        if (element.validity.valueMissing) {
                            errorStyling('Preencha o campo.', erroNome.current, element, true);
                        } else {
                            errorStyling(undefined, erroNome.current, element, false);
                        }

                        if (element.validity.patternMismatch) {
                            errorStyling('Preencha apenas com letras.', erroNome.current, element, true);
                        }
                        break;
                    case 'cnpj':
                        if (element.validity.valueMissing) {
                            errorStyling('Preencha o campo.', erroCnpj.current, element, true);
                        } else {
                            errorStyling(undefined, erroCnpj.current, element, false);
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

                    default:
                        break;
                }
            });
        });
    };

    useEffect(() => {
        errorHandling();

        // Cleanup: remove event listeners quando o componente desmontar
        return () => {
            const inputs = Array.from(document.querySelectorAll('input')).slice(0, -1);
            inputs.forEach((element) => {
                element.removeEventListener('focus', () => {});
                element.removeEventListener('blur', () => {});
            });
        };
    }, []);

    return (
        <>
            <div id="caixaCadastro">
                <h1>Cadastro</h1>
                <form>
                    <div>
                        <label htmlFor="name">Nome da empresa:</label>
                        <input type="text" name="name" required pattern="^([a-zA-ZÀ-ÖØ-öø-ÿ]|\s)*$" placeholder="Nome da empresa" />
                        <span ref={erroNome} className="erro"></span>
                    </div>
                    <div>
                        <label htmlFor="cnpj">CNPJ:</label>
                        <input type="text" name="cnpj" required placeholder="CNPJ" />
                        <span ref={erroCnpj} className="erro"></span>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" required pattern="^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$" placeholder="Email" />
                        <span ref={erroEmail} className="erro"></span>
                    </div>
                    <div>
                        <label htmlFor="senha">Senha:</label>
                        <input type="password" name="password" required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$" placeholder="Senha" />
                        <span ref={erroSenha} className="erro"></span>
                    </div>
                    <input type="submit" />
                </form>
            </div>
        </>
    );
};

export default CadastroUsuario;
