import "./style.css";
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

export default EditarPerfilCandidato;
