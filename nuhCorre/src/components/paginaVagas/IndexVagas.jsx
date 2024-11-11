import './vagas.css'
import Header from '../header/Header';
import Footer from '../footer/Footer';
export const Vagas = () => {

    return(

        <>
            <Header/>

            <section id='pesquisaVagas'>

                <form>

                    <input type='text' placeholder='Cargo, palavras-chaves ou empresa' required></input>
                    <input type='text' placeholder='Cidade, estadoo ou região' required></input>
                    <input type='button' value='Achar vagas'></input>

                </form>

            </section>
            <section id='campoDasVagas'>

                <div className='horizontal'>

                    <div class='styleBox'>

                        <form id='selects'>

                            <select>
                                <option value="" defaultChecked>Data de anúncio</option>
                            </select>

                            <select>
                                <option value="" defaultChecked>Remoto</option>
                            </select>
                            <select>
                                <option value="" defaultChecked>Distancia</option>
                            </select>
                            <select>
                                <option value="" defaultChecked>Salario</option>
                            </select>
                            <select>
                                <option value="" defaultChecked>Nivel de escolaridade</option>
                            </select>
                            <select>
                                <option value="" defaultChecked>Setor</option>
                            </select>
                        </form>

                    </div>

                    <div class='styleBox'>

                        <div className='principalVaga'>

                            <div className='horizontalNomeBotao'>

                                <div className='seguraTitulo'>

                                    <h2>Desenvolvedor Frontend</h2>
                                    <div>

                                        Accenture - Recife, PE<br/>
                                        R$ 2.000 - R$4.000 • Hibrido • CLT

                                        <div className='stylePreenchido'>PCD</div>

                                    </div>

                                </div>
                                <button className='candidatar'>Candidatar-se</button>

                            </div>
                            
                            <p>
                                A Accenture procura um Desenvolvedor Frontend para criar interfaces responsivas usando HTML, CSS e JavaScript. É <br/>
                                necessário experiência com frameworks como React, Angular ou Vue.js. Oferece trabalho remoto e oportunidades de <br/>
                                crescimento. Se você ama tecnologia e design, venha fazer parte da nossa equipe!
                            </p>

                        </div>


                    </div>

                </div>
                <div className='vertical styleBox'>

                    <h2>Grupos/<br/>Vulnerabilidades</h2>
                    <ul>

                        <li>PCD</li>
                        <li>Mulheres</li>
                        <li>Mães</li>
                        <li>Imigrantes e Refugiados</li>
                        <li>LGBTQIA+</li>
                        <li>Grupos Étnicos e Raciais</li>

                    </ul>

                </div>

            </section>

            <Footer/>
        
        </>


    )

    
}