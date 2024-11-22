import { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo1 from '../../assets/camaleao.png';
import Logo2 from '../../assets/logo.png';
import olhoAberto from '../../assets/olhoAberto.jpg.png';
import olhoFechado from '../../assets/olhoFechado.jpg';

const LoginEmpresa = () => {
    const [emailCnpj, setEmailCnpj] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const navigate = useNavigate();

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
            emailCnpj,
            senha
        };

        try {
            const response = await axios.post('http://localhost:8080/auth/login', data);
            if (response.status === 200) {
                const bearer = response.data.token;
                localStorage.setItem('token', bearer);
                alert('Login realizado com sucesso!');
                navigate('/dashboard'); // Ajuste a rota para onde deseja redirecionar após o login
            } else {
                alert('Erro ao realizar login. Verifique suas credenciais.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.detail || 'Erro ao realizar login.');
            } else {
                alert('Erro de conexão com o servidor.');
            }
        }
    };

    const paginaInicio = () => {
        navigate('/');
    };

    return (
        <main id='main-loginempresa'>
            <div id='expliu-loginempresa'>
                <div className='opcoesHeaderLoginEmpresa' style={{ fontSize: '19px', marginLeft: '1rem' }}>
                    <a href="#" onClick={paginaInicio}>Página Inicial</a>
                    <a href="#">Sou Empresa</a>
                </div>

                <div className='titulo_expliu-loginempresa'>
                    <img src={Logo1} alt='' className="logo-image-loginempresa" />
                    <h2>Bem-vindo à NuhCorre </h2>
                    <p>
                        Conecte-se com talentos e encontre as melhores soluções<br />
                        para sua empresa. Faça parte da nossa rede de sucesso!
                    </p>
                    <ul className="check-list-loginempresa">
                        <li>Encontre os melhores talentos para sua equipe.</li>
                        <li>Facilidade e segurança no gerenciamento de vagas.</li>
                        <li>Suporte personalizado para candidatos e empresas.</li>
                    </ul>
                </div>
            </div>

            <div id="caixaLoginEmpresa">
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
                                    }}
                                />
                            </button>
                        </div>
                    </div>

                    <input type="submit" value="Entrar" />
                    <a href="/recuperar-senha" style={{ color: '#000', textAlign: 'center', display: 'block' }}>Esqueceu sua senha? <span style={{ color: '#718CB3' }}>Recupere aqui</span></a>
                </form>
            </div>
        </main>
    );
};

export default LoginEmpresa;
