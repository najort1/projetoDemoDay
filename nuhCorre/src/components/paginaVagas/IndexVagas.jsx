import './vagas.css'
import Header from '../header/Header';
import Footer from '../footer/Footer';
export const Vagas = () => {

    return (

        <>
            <Header />

            <section id='pesquisaVagas'>

                <form>

                    <div class="input-container">
                        <box-icon name="search-alt-2" color="#718cb3"></box-icon>
                        <input type="text" placeholder="Cargo, palavras-chave ou empresa" required />

                    </div>

                    <div class="input-container">
                        <box-icon name='map-pin' color='#718cb3' ></box-icon>
                        <input type='text' placeholder='Cidade, estado ou região' required></input>

                    </div>

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

                                    <h2>Desenvolvedor Backend</h2>
                                    <div>

                                        NaveGuard - Recife, PE<br />
                                        R$ 1.000 - R$2.000 • Hibrido • CLT

                                        <div className='stylePreenchido'>LGBTQIA+</div>

                                    </div>

                                </div>
                                <button className='candidatar'>
                                    <box-icon name='briefcase-alt' color='#ffffff' ></box-icon>
                                    Candidatar-se
                                </button>

                            </div>

                            <p>
                                O NaveGuard está em busca de um Desenvolvedor Backend apaixonado por tecnologia para se juntar
                                à nossa equipe em um ambiente dinâmico e inovador. Se você é um profissional com experiência
                                em construção de soluções escaláveis e eficientes, e está pronto para fazer a diferença em
                                projetos desafiadores, queremos te conhecer!
                            </p>

                        </div>

                    </div>
                    <div class='styleBox'>

                        <div className='principalVaga'>

                            <div className='horizontalNomeBotao'>

                                <div className='seguraTitulo'>

                                    <h2>Desenvolvedor Backend</h2>
                                    <div>

                                        Teia Cultural - Recife, PE<br />
                                        R$ 1.500 - R$2.100 • Remoto • CLT

                                        <div className='stylePreenchido'>PCD+</div>

                                    </div>

                                </div>
                                <button className='candidatar'>
                                    <box-icon name='briefcase-alt' color='#ffffff' ></box-icon>
                                    Candidatar-se
                                </button>

                            </div>

                            <p>

                                Teia Cultural está em busca de um Desenvolvedor Backend para integrar nossa equipe!
                                Se você é apaixonado por tecnologia e quer fazer a diferença em projetos que fortalecem o setor cultural,
                                essa é a oportunidade perfeita para você se juntar a um time criativo e engajado.
                            </p>

                        </div>



                    </div>

                </div>
                <div className='vertical styleBox'>

                    <h2>Grupos</h2>
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

            <Footer />

        </>


    )


}