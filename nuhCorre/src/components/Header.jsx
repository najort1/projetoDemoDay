<<<<<<< HEAD
export function Header(){
=======
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
                    <button>Entrar</button>
                    <button>Cadastro</button>
                </div>



        </header>

    )

}
>>>>>>> main

    return(

        <header>

            <div id='logo'>
                
                NuhCorre

            </div>
            <div>

                <ul>

                    <li>Sou candidato</li>
                    <li>Sou empresa</li>

                </ul>
                
                <button>Entrar</button>
                <button>Cadastro</button>

            </div>

        </header>

    )

}