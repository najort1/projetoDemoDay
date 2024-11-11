import './styleFooter.css';

function Footer(){

    return(

        <footer>

            <div className="linksERedes">

                <nav className="listaDeLinks">
                    <ul className='listaLinks'>
                        <li className='linksFooter'><a href=''>Sobre</a></li>
                        <li className='linksFooter'><a href=''>Serviços</a></li>
                        <li className='linksFooter'><a href=''>Suporte</a></li>
                        <li className='linksFooter'><a href=''>Politica de privacidade</a></li>
                    </ul>
                </nav>
    
                <nav className="caixaRedesSociais">
                    <ul className='listaRedesSociais'>
        
                        <li>
        
                            <img width="30" height="30" src="https://img.icons8.com/ffffff/50/facebook-new.png" alt="facebook-new"/>
        
                        </li>
                        <li>
                            <img width="30" height="30" src="https://img.icons8.com/ffffff/material-outlined/24/instagram-new--v1.png" alt="instagram-new--v1"/>
                        </li>
                        <li>
        
                            <img width="30" height="30" src="https://img.icons8.com/ffffff/ios-glyphs/30/linkedin.png" alt="linkedin"/>
                                
                        </li>
        
                    </ul>
                </nav>
    
            </div>

        </footer>

    )

}

export default Footer;