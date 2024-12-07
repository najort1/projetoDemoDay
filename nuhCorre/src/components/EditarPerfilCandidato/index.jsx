{/*import "./style.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import boxicons from "boxicons";


const EditarPerfilCandidato = () => {
    const [visible, setVisible] = useState(false);

    return (
    <>
      <header className="header-perfil-candidato">
        <div className="logo-perfil-candidato">
          <img src={logo} alt="Logo" />
        </div>
      </header>

      <section className="perfil-candidato">
        <div className="informacoes-usuario">
          <div className="imagem-candidato">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5166/5166640.png "
              alt="Imagem do candidato"
            />
          </div>

          <div className="dados-candidato">
            <h1>Nome do Candidato</h1>
            <h3>Cargo</h3>
          </div>
        </div>
      </section>

      <h3 className="protecao-dados">
        Seus dados pessoais estarão protegidos, nos termos da Lei 13.460/2017.
      </h3>

            <Sidebar visible={visible} onHide={() => setVisible(false)} 
            
            className="w-[50%] h-[50%] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 relative shadow-2xl bg-gray-200 xl:w-[20%]">


              <div className="conteudo-side-bar flex justify-center flex-col">

                <div className="item-side-bar flex flex-row items-center">
                  <box-icon name='home' size='md'></box-icon>
                  <h1 className="item-side-bar font-bold text-2xl">Pagina inicial</h1>
                </div>

                <div className="item-side-bar flex flex-row items-center">
                  <box-icon name='user' size='md'></box-icon>
                  <h1 className="item-side-bar font-bold text-2xl">Perfil</h1>
                </div>

                <div className="item-side-bar flex flex-row items-center">
                  <box-icon name='notepad' size='md'></box-icon>
                  <h1 className="item-side-bar font-bold text-2xl">Vagas</h1>
                </div>
                
              </div>
              

            


            </Sidebar>
            <input type="button" value="Abrir Menu" onClick={() => setVisible(true)} />

      <section className="editar-dados-candidato">
        <h1 className="titulo-editar text-2xl font-bold">Editar Perfil</h1>

        <div className="formulario-editar">
          <div className="input-group">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />
          </div>

          <div className="input-group">
            <label htmlFor="telefone">Telefone</label>
            <input type="tel" id="telefone" />
          </div>

          <div className="input-group">
            <label htmlFor="cpf">CPF</label>
            <input type="text" id="cpf" />
          </div>

          <div className="input-group">
            <label htmlFor="nascimento">Data de Nascimento</label>
            <input type="date" id="nascimento" />
          </div>

          <div className="input-group">
            <label htmlFor="cep">CEP</label>
            <input type="text" id="cep" />
          </div>

          <div className="input-group">
            <label htmlFor="cidade">Cidade</label>
            <input type="text" id="cidade" />
          </div>

          <div className="input-group">
            <label htmlFor="estado">Estado</label>
            <input type="text" id="estado" />
          </div>

          <div className="input-group">
            <label htmlFor="Genero">Genero</label>
            <input type="text" id="Genero" />
          </div>

          <div className="input-group">
            <label htmlFor="linkedin">Fale sobre você</label>
            <textarea id="linkedin" className="fale-sobre-voce" />
          </div>

          <div className="input-group">
            <details className="vulnerabilidade">
              <summary>Vulnerabilidade social</summary>

              <ul className="lista-vulnerabilidade">
                <li>
                  <input type="checkbox" id="vulnerabilidade1" />
                  <label htmlFor="vulnerabilidade1">
                    Imigrantes e refugiados
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="vulnerabilidade2" />
                  <label htmlFor="vulnerabilidade2">Baixa Renda</label>
                </li>
                <li>
                  <input type="checkbox" id="vulnerabilidade3" />
                  <label
                    htmlFor="vulnerabilidade3
                            "
                  >
                    50+
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="vulnerabilidade3" />
                  <label
                    htmlFor="vulnerabilidade3
                            "
                  >
                    Indigena
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="vulnerabilidade3" />
                  <label
                    htmlFor="vulnerabilidade3
                            "
                  >
                    LGBTQIA+
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="vulnerabilidade3" />
                  <label
                    htmlFor="vulnerabilidade3
                            "
                  >
                    Mãe
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="vulnerabilidade3" />
                  <label
                    htmlFor="vulnerabilidade3
                            "
                  >
                    Racial
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="vulnerabilidade3" />
                  <label
                    htmlFor="vulnerabilidade3
                            "
                  >
                    Aposentados
                  </label>
                </li>
              </ul>
            </details>
          </div>
        </div>

        <button className="botao-salvar">Salvar</button>
      </section>
    </>
  );
};

export default EditarPerfilCandidato;*/}


{/*Dudu seu código é o de cima, caso queira voltar na versão anterior */}

import Footer from "../footer/Footer";
import Header from "../header/Header";
import React, { useState } from 'react';
import "./style.css";

export default function EditarPerfilCandidato() {
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
                            <h2 className="editNome">{nome}</h2>
                            <button onClick={editNome}><box-icon name='edit' type='solid' color='#ffffff' ></box-icon></button>
                            <h3>{profissao}</h3>
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
                        <form>
                            <div>
                                <label htmlFor='email' className="dark:text-white">Email</label>
                                <input type='email' name='email' className='dark:bg-[#818181]'/>

                                <label htmlFor='data' className="dark:text-white">Data nascimento</label>
                                <input type='date' name='data' className='dark:bg-[#818181]'/>

                                <label htmlFor='cep' className="dark:text-white">CEP</label>
                                <input type='text' name='cep' className='dark:bg-[#818181]' />

                                <label htmlFor='estado' className="dark:text-white">Estado</label>
                                <select name='estado' className='dark:bg-[#818181]'>
                                    <option value="" defaultChecked>Selecione seu estado</option>
                                </select>

                                <label htmlFor='vunerabilidades' className="dark:text-white">Vulnerabilidade Social</label>
                                
                                <div className="flex column">

                                  <div style={{marginRight:'10px'}}>

                                    <div className="lista"><input type='checkbox' className="checkBox"/>Imigrantes e refugiados</div>
                                    <div className="lista"><input type='checkbox' className="checkBox"/>50+</div>
                                    <div className="lista"><input type='checkbox' className="checkBox"/>LGBTQIA+</div>
                                    <div className="lista"><input type='checkbox' className="checkBox"/>Racial</div>

                                  </div>
                                  <div>

                                    <div className="lista"><input type='checkbox' className="checkBox"/>Baixa Renda</div>
                                    <div className="lista"><input type='checkbox' className="checkBox"/>Indigena</div>
                                    <div className="lista"><input type='checkbox' className="checkBox"/>Mãe</div>
                                    <div className="lista"><input type='checkbox' className="checkBox"/>Aposentados</div>

                                  </div>

                                </div>

                                <div id='botoes'>
                                    <input type='submit' value='Salvar informações' className="bg-[#718CB3] h-[64px] w-24 border-0 focus:outline-none
                                     transition-all duration-300 ease-in-out transform hover:scale-105 dark:bg-[#818181]" />
                                    <input type='reset' value='Limpar campos' className="bg-[#718CB3] h-[64px] w-24 border-0 focus:outline-none
                                     transition-all duration-300 ease-in-out transform hover:scale-10 dark:bg-[#818181]5" />
                                     
                                </div>
                            </div>

                            <div>
                                <label htmlFor='senha' className="dark:text-white">Senha</label>
                                <input type='password' name='senha' className='bg-white dark:bg-[#818181]'/>

                                <label htmlFor='telefone'className="dark:text-white">Telefone</label>
                                <input type='tel' name='telefone' className='dark:bg-[#818181]'/>

                                <label htmlFor='genero'>Gênero</label>
                                <input type='text' name='genero'className='dark:bg-[#818181]' />

                                <label htmlFor='cidade' className="dark:text-white">Cidade</label>
                                <select name='cidade' className='dark:bg-[#818181]'>
                                    <option value="" defaultChecked>Selecione sua Cidade</option>
                                </select>

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
