import './styleHeader.css'

function Header(){

    return(

        <header>

            <div id='logo'>

                NuhCorre

            </div>

            

                <ul>
                    <li><a href="">Sou candidato</a></li>
                    <li><a href="">Sou empresa</a></li>
                </ul>

                <div className="botoes">
                    <button className="btn">Entrar</button>
                    <button className="btn">Cadastro</button>
                </div>
            


        </header>

    )

}

export default Header;