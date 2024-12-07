import Footer from "../footer/Footer";
import Header from "../header/Header";
import './empressaEdicao.css';
import './caixasEdicoes.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function EdicaoEmpressa() {
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar se estamos no modo de edição
    const [isPhotoEditing, setIsPhotoEditing] = useState(false);
    const [photoPerfil, setPhotoPerfil] = useState("https://i.pinimg.com/enabled_lo_mid/736x/5c/95/31/5c9531d05f919414e9dff0c974388f67.jpg");
    const imgPadrao = "https://i.pinimg.com/enabled_lo_mid/736x/5c/95/31/5c9531d05f919414e9dff0c974388f67.jpg";

    const [informacoes, setInformacoes] = useState({
        email: '',
        cnpj: '',
        cep: '',
        estado: '',
        setor: '',
        inclusao: '',
        telefone: '',
        logradouro: '',
        cidade: '',
        descricao: '',
        nome: ''
    });


    // Função chamada quando o botão "editar" é clicado
    function editNome() {
        setIsEditing(true); // Ativa o modo de edição
    }

    function editPhoto() {
        setIsPhotoEditing(true); // Ativa o modo de edição
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

    function cancelPhoto() {
        setIsPhotoEditing(false);
    }

    function removePhoto() {
        setPhotoPerfil(null); // Define como null para remover a foto de perfil
    }


    const handleEditarInformacoes = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put('http://localhost:8080/dados/empresa', informacoes,
                {
                    validateStatus: function (status) {
                        return status <= 500;
                    },
                    headers: {

                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }

                }

            );

            const data = response.data;

            if(response.status === 200) {
                console.log(data);
            }else{
                console.error(data);
            }
        } catch (error) {
            console.error(error);
        }

    }

    const returnUserInfo = async () => {

        // {
        //     "cnpj": "05.424.215/0001-53",
        //     "nome": "Pietro e Eliane Vidros ME",
        //     "telefone": "(12) 99463-1702",
        //     "email": "fiscal1@pietroeelianevidrosme.com.br",
        //     "descricao": null,
        //     "categoria": null,
        //     "dataCadastro": "2024-11-28",
        //     "ativo": true,
        //     "verificado": false,
        //     "premium": false,
        //     "enderecos": [
        //         {
        //             "id": 1,
        //             "cep": "79083340",
        //             "cidade": "Campo Grande",
        //             "estado": "MS",
        //             "rua": "Jardim Aero Rancho",
        //             "numero": "16"
        //         }
        //     ]
        // }

        try {
            const response = await axios.get('http://localhost:8080/dados/empresa',
                {
                    validateStatus: function (status) {
                        return status <= 500;
                    },
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }

                }
            );


            const data = response.data;

            if(response.status === 200) {
                setInformacoes({
                    email: data.email,
                    cnpj: data.cnpj,
                    cep: data.enderecos[0].cep,
                    estado: data.enderecos[0].estado,
                    setor: data.categoria,
                    inclusao: 'Sim',
                    telefone: data.telefone,
                    logradouro: data.enderecos[0].rua,
                    cidade: data.enderecos[0].cidade,
                    descricao: data.descricao,
                    nome: data.nome
                });
            }else{
                console.error(data);

            }

        } catch (error) {
            console.error(error);
        }

    }

    useEffect   (() => {
        returnUserInfo();
    }
    ,[]);

    return (
        <>
            <Header />

            {/* Adicionando a sobreposição escura quando estamos no modo de edição */}
            {isEditing && <div className="dark-overlay"></div>}
            {isPhotoEditing && <div className="dark-overlay"></div>}

            <section className="perfil">
                <div className="alinhamentoTitulo">
                    <div>
                        {/* Condicionando a exibição da imagem */}
                        <img 
                            src={photoPerfil || imgPadrao} // Exibe uma imagem padrão caso a foto seja removida
                            className='foto-perfil' 
                            alt='perfilImg'
                        />
                        <button className="editImagem" onClick={editPhoto}><box-icon name='edit' type='solid' color='#ffffff' ></box-icon></button>
                    </div>
                    <div className="tituloUsuario">
                        {/* Exibe o nome e profissão ou a caixa de edição */}
                        {isEditing ? (
                            <div className='editBoxNome editBox'>
                                <form onSubmit={altSub}>
                                    <h2>Editar</h2>
                                    <label htmlFor='nome'>Nome</label>
                                    <input 
                                        type='text' 
                                        name='nome' 
                                        value={informacoes.nome} 
                                        onChange={(e) => setInformacoes({ ...informacoes, nome: e.target.value })}
                                        className="input-pesquisa h-[64px] w-full rounded-[5px] px-[5px] focus:outline-none
                                        focus:border-b-4 focus:border-b-[#1797f5] transition-all duration-300 ease-in-out"
                                        
                                    />
                                    <div className='botoes'>

                                        <input type='submit' className='submitCancel "bg-[#718CB3] h-[64px] w-24 border-0 focus:outline-none
                                        transition-all duration-300 ease-in-out transform hover:scale-105"' value='Salvar' />

                                        <input type='button' onClick={altCancel} className='submitCancel "bg-[#718CB3] h-[64px] w-24 border-0 focus:outline-none
                                        transition-all duration-300 ease-in-out transform hover:scale-105"' value='Cancelar' />

                                    </div>
                                </form>
                            </div>
                        ) : ('')}
                        <>
                            <h2 className="editNome">{informacoes.nome}</h2>
                            <button onClick={editNome}><box-icon name='edit' type='solid' color='#ffffff' ></box-icon></button>
                        </>

                        {isPhotoEditing ? (
                            <div className='editBox boxPhoto'>
                                <div className='boxTitle'> 
                                    <h2>Editar Foto</h2>
                                    <button onClick={cancelPhoto}><box-icon type='solid' name='x-circle'></box-icon></button>
                                </div>

                                <div className='mainBox'>
                                    <img src={photoPerfil || imgPadrao} alt='perfil' className='foto-perfil' />
                                    
                                    <span id='msgEdit'>Use uma foto no perfil para as empresas e pessoas conhece-lo.</span>

                                    <div className="btn-group">
                                        {/* O input file escondido */}
                                        <input 
                                            type="file" 
                                            id="fileUpload" 
                                            onChange={(e) => {
                                                const file = e.target.files[0];  // Acessa o primeiro arquivo selecionado
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setPhotoPerfil(reader.result); // Atualiza o estado com a URL do arquivo selecionado
                                                    };
                                                    reader.readAsDataURL(file); // Lê o arquivo como uma URL base64
                                                }
                                            }}
                                        />
                                        {/* Botão personalizado que dispara o input file */}
                                        <label htmlFor="fileUpload" className="custom-file-upload">
                                            Editar
                                        </label>

                                        {/* Botão de remover */}
                                        <button className="btn btn-warning" onClick={removePhoto}>Remover</button>
                                    </div>

                                </div>

                            </div>
                        ):('')}
                    </div>
                </div>
            </section>

            <section id='formEmpresa' className="bg-[#F9FAF] dark:bg-[#313935]">
                <nav className="linksInterno">
                    <ul>
                        <li><box-icon name='home'></box-icon> Página Inicial</li>
                        <li className="linkSelecionado"><box-icon name='cog' color='white'></box-icon> Informações Pessoais</li>
                        <li><img className='listImg' width="25" height="25" src="https://img.icons8.com/pixels/32/conference-call.png" alt="conference-call"/> Perfil</li>
                        <li><img className='listImg' width="25" height="25" src="https://img.icons8.com/android/24/news.png" alt="news"/> Vagas</li>
                    </ul>
                </nav>

                <div className='caixasCentrais'>
                    <div className="textoLei">Seus dados pessoais estarão protegidos, nos termos da Lei 13.460/2017.</div>
                    <div className="caixaInterna bg-white dark:bg-[#6a6a6a]">
                        <h1 className="dark:text-white">Dados Pessoais</h1>

                        {/* Formulário de edição de informações */}
                        <form>
                            <div>
                                <label htmlFor='email' className="dark:text-white">Email corporativo</label>
                                <input type='email' name='email' className='dark:bg-[#818181]'
                                disabled
                                    value={informacoes.email} 
                                    onChange={(e) => setInformacoes({ ...informacoes, email: e.target.value })}
                                />

                                <label htmlFor='cnpj' className="dark:text-white">CNPJ</label>
                                <input type='text' name='cnpj' className='dark:bg-[#818181]'
                                disabled
                                    value={informacoes.cnpj} 
                                    onChange={(e) => setInformacoes({ ...informacoes, cnpj: e.target.value })}
                                />

                                <label htmlFor='cep' className="dark:text-white">CEP</label>
                                <input type='text' name='cep' className='dark:bg-[#818181]'
                                    value={informacoes.cep} 
                                    onChange={(e) => setInformacoes({ ...informacoes, cep: e.target.value })}
                                />

                                <label htmlFor='estado'>Estado</label>
                                <input type='text' name='estado' 
                                    value={informacoes.estado}
                                    onChange={(e) => setInformacoes({ ...informacoes, estado: e.target.value })}
                                />

                                <div style={{ fontWeight: 600 }}>
                                    <label id='labelEmpresa' className="dark:text-white">A empresa possui políticas de inclusão?</label>
                                    <input type='radio' name='inclusao' className='dark:bg-[#818181]'/> <span className="dark:text-white">Não</span>
                                    <input type='radio' name='inclusao' className='dark:bg-[#818181]' style={{ marginLeft: '40px' }} /><span className="dark:text-white">Sim</span>
                                </div>

                                <div id='botoes'>
                                    <input type='submit' value='Salvar informações' className="bg-[#718CB3] h-[64px] w-24 border-0 focus:outline-none
                                     transition-all duration-300 ease-in-out transform hover:scale-105" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor='senha' className="dark:text-white">Senha</label>
                                <input type='password' name='senha' className='bg-white dark:bg-[#818181]'/>

                                <label htmlFor='telefone'>Telefone</label>
                                <input type='tel' name='telefone' />

                                <label htmlFor='logradouro'>Logradouro</label>
                                <input type='text' name='logradouro'className='dark:bg-[#818181]' 
                                    value={informacoes.logradouro}
                                    onChange={(e) => setInformacoes({ ...informacoes, logradouro: e.target.value })}
                                />

                                <label htmlFor='cidade' className="dark:text-white">Cidade</label>
                                <input type='text' name='cidade' className='dark:bg-[#818181]'
                                    value={informacoes.cidade}
                                    onChange={(e) => setInformacoes({ ...informacoes, cidade: e.target.value })}
                                />

                                <label htmlFor='descricao' className="dark:text-white">Descrição da Empresa</label>
                                <textarea name='descricao' className='dark:bg-[#818181]'cols={55} rows={10}></textarea>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}
