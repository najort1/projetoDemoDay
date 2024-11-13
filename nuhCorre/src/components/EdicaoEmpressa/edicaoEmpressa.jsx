import Footer from "../footer/Footer"
import Header from "../header/Header"
import './empressaEdicao.css';

export function EdicaoEmpressa(){

    return(

        <>
        
            <Header/>

                <section className="perfil">

                    <div className="alinhamentoTitulo">

                        <div>

                            <img src='https://i.pinimg.com/280x280_RS/e5/1d/04/e51d04c78c6c26bfa0ca7d7bb94af786.jpg' id='perfil' alt='perfilImg'/>

                        </div>
                        <div className="tituloUsuario">

                            <h2>Cachorro chupetão</h2>
                            <h3>chupar chupeta</h3>

                        </div>

                    </div>

                </section>
                <section id='formEmpresa'>

                    <nav className="linksInterno">

                        <ul>

                            <li>🏠Página Inicial</li>
                            <li className="linkSelecionado">🏠Informações Pessoais</li>
                            <li>🏠Perfil</li>
                            <li>🏠Vagas</li>

                        </ul>


                    </nav>
                    <div className='caixasCentrais'>

                        <div className="textoLei">Seus dados pessoais estarão protegidos, nos termos da Lei 13.460/2017.</div>
                        <div className="caixaInterna">

                            <h1>Informaçoes Pessoais  </h1>
                            <form>

                                <div>

                                    <label for=''>Email corporativo</label>
                                    <input type='email'/>

                                    <label for=''>CNPJ</label>
                                    <input type='text'/>

                                    <label for=''>CEP</label>
                                    <input type='text'/>

                                    <label for=''>Estado</label>
                                    <select>
                                        <option value="" defaultChecked>Selecione seu estado</option>
                                    </select>

                                    <label for=''>Setor de atuação</label>
                                    <select>
                                        <option value="" defaultChecked>Alimentício</option>
                                    </select>
                                    <div style={{fontWeight:600}}>

                                        <label>A empresa possui politicas de inclusão?</label>
                                        <input type='radio'/> Não
                                        <input type='radio' style={{ marginLeft: '40px' }}/> Sim
                                        
                                    </div>

                                    <div id='botoes'>

                                        <input type='submit' value='Salvar informações'/>
                                        <input type='reset' value='Limpar campos'/>

                                    </div>
                                    

                                </div>
                                <div>

                                    <label for=''>Senha</label>
                                    <input type='password'/>

                                    <label for=''>Telefone</label>
                                    <input type='tel'/>

                                    <label for=''>Logradouro</label>
                                    <input type='text'/>

                                    <label for=''>Cidade</label>
                                    <select>
                                        <option value="" defaultChecked>Selecione seu Cidade</option>
                                    </select>
                                    
                                    <label for=''>Descrição da Empresa</label>
                                    <textarea cols={69} rows={10}></textarea>

                                </div>
                                

                            </form>

                        </div>

                    </div>

                </section>

            
        
        </>


    )

}