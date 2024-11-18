import Footer from "../footer/Footer";
import Header from "../header/Header";
import './empressaEdicao.css';
import React, { useState } from 'react';

export function EdicaoEmpressa() {
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar se estamos no modo de edição
    const [nome, setNome] = useState('Cachorro chupetão'); // Estado para o nome
    const [profissao, setProfissao] = useState('chupar chupeta'); // Estado para a profissão

    // Função chamada quando o botão "editar" é clicado
    function editNome() {
        setIsEditing(true); // Ativa o modo de edição
    }

    // Função chamada quando o botão "Salvar" é clicado
    function altSub(e) {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        setIsEditing(false); // Desativa o modo de edição após salvar
    }

    // Função chamada quando o botão "Cancelar" é clicado
    function altCancel() {
        setIsEditing(false); // Desativa o modo de edição após cancelar
    }

    return (
        <>
            <Header />

            <section className="perfil">
                <div className="alinhamentoTitulo">
                    <div>
                        <img src='https://i.pinimg.com/280x280_RS/e5/1d/04/e51d04c78c6c26bfa0ca7d7bb94af786.jpg' id='perfil' alt='perfilImg'/>
                        <button className="editImagem"><box-icon name='edit'></box-icon></button>
                    </div>
                    <div className="tituloUsuario">
                        {/* Exibe o nome e profissão ou a caixa de edição */}
                        {isEditing ? (
                            <div className='editBoxNome'>
                                <form onSubmit={altSub}>
                                    <label htmlFor='nome'>Nome</label>
                                    <input 
                                        type='text' 
                                        name='nome' 
                                        value={nome} 
                                        onChange={(e) => setNome(e.target.value)} // Atualiza o nome no estado
                                    />

                                    <label htmlFor='profissao'>Profissão</label>
                                    <input 
                                        type='text' 
                                        name='profissao' 
                                        value={profissao} 
                                        onChange={(e) => setProfissao(e.target.value)} // Atualiza a profissão no estado
                                    />

                                    <div className='botoes'>
                                        <input type='submit' className='submitCancel' value='Salvar alterações' />
                                        <input type='button' onClick={altCancel} className='submitCancel' value='Cancelar' />
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <>
                                <h2 className="editNome">{nome}</h2>
                                <button onClick={editNome}><box-icon name='edit'></box-icon></button>
                                <h3>{profissao}</h3>
                                
                            </>
                        )}
                    </div>
                </div>
            </section>

            <section id='formEmpresa'>
                <nav className="linksInterno">
                    <ul>
                        <li><box-icon name='home'></box-icon> Página Inicial</li>
                        <li className="linkSelecionado"><box-icon name='cog'></box-icon> Informações Pessoais</li>
                        <li><img className='listImg' width="25" height="25" src="https://img.icons8.com/pixels/32/conference-call.png" alt="conference-call"/> Perfil</li>
                        <li><img className='listImg' width="25" height="25" src="https://img.icons8.com/android/24/news.png" alt="news"/> Vagas</li>
                    </ul>
                </nav>

                <div className='caixasCentrais'>
                    <div className="textoLei">Seus dados pessoais estarão protegidos, nos termos da Lei 13.460/2017.</div>
                    <div className="caixaInterna">
                        <h1>Informaçoes Pessoais</h1>

                        {/* Formulário de edição de informações */}
                        <form>
                            <div>
                                <label htmlFor='email'>Email corporativo</label>
                                <input type='email' name='email' />

                                <label htmlFor='cnpj'>CNPJ</label>
                                <input type='text' name='cnpj' />

                                <label htmlFor='cep'>CEP</label>
                                <input type='text' name='cep' />

                                <label htmlFor='estado'>Estado</label>
                                <select name='estado'>
                                    <option value="" defaultChecked>Selecione seu estado</option>
                                </select>

                                <label htmlFor='setor'>Setor de atuação</label>
                                <select name='setor'>
                                    <option value="" defaultChecked>Alimentício</option>
                                </select>

                                <div style={{ fontWeight: 600 }}>
                                    <label>A empresa possui políticas de inclusão?</label>
                                    <input type='radio' name='inclusao' /> Não
                                    <input type='radio' name='inclusao' style={{ marginLeft: '40px' }} /> Sim
                                </div>

                                <div id='botoes'>
                                    <input type='submit' value='Salvar informações' />
                                    <input type='reset' value='Limpar campos' />
                                </div>
                            </div>

                            <div>
                                <label htmlFor='senha'>Senha</label>
                                <input type='password' name='senha' />

                                <label htmlFor='telefone'>Telefone</label>
                                <input type='tel' name='telefone' />

                                <label htmlFor='logradouro'>Logradouro</label>
                                <input type='text' name='logradouro' />

                                <label htmlFor='cidade'>Cidade</label>
                                <select name='cidade'>
                                    <option value="" defaultChecked>Selecione sua Cidade</option>
                                </select>

                                <label htmlFor='descricao'>Descrição da Empresa</label>
                                <textarea name='descricao' cols={55} rows={10}></textarea>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    );
}
