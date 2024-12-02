import './stylePerfil.css';
import Footer from "../footer/Footer";
import Header from "../header/Header";
import React, { useState } from 'react';

export const Perfil = () => {
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar se estamos no modo de edição
    const [nome, setNome] = useState('Cachorro chupetão'); // Estado para o nome
    const [profissao, setProfissao] = useState('chupar chupeta'); // Estado para a profissão
    const [isPhotoEditing, setIsPhotoEditing] = useState(false);
    const [photoPerfil, setPhotoPerfil] = useState("https://i.pinimg.com/enabled_lo_mid/736x/5c/95/31/5c9531d05f919414e9dff0c974388f67.jpg");
    const imgPadrao = "https://i.pinimg.com/enabled_lo_mid/736x/5c/95/31/5c9531d05f919414e9dff0c974388f67.jpg";
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

    return(

        <>

            <Header/>

                <main id='mainPerfil'>

                    <div id='caixaImg'>
                        {/* Condicionando a exibição da imagem */}
                        <img 
                            src={photoPerfil || imgPadrao} // Exibe uma imagem padrão caso a foto seja removida
                            className='foto-perfil pagPerfil' 
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
                                        value={nome} 
                                        onChange={(e) => setNome(e.target.value)} // Atualiza o nome no estado
                                        className="input-pesquisa h-[64px] w-full rounded-[5px] px-[5px] focus:outline-none
                                        focus:border-b-4 focus:border-b-[#1797f5] transition-all duration-300 ease-in-out"
                                        
                                    />

                                    <label htmlFor='profissao'>Profissão</label>
                                    <input 
                                        type='text' 
                                        name='profissao' 
                                        value={profissao} 
                                        onChange={(e) => setProfissao(e.target.value)} // Atualiza a profissão no estado
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
                            <h2 className="editNome pagPerfilL">{nome}</h2>
                            <button onClick={editNome}><box-icon name='edit' type='solid' color='#ffffff' ></box-icon></button>
                            <h3 className='pagPerfilL'>{profissao}</h3>
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

                </main>


            <Footer/>
        
        </>

    )


}
