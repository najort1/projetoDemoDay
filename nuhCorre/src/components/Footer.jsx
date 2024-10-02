import './styleFooter.css'

function Footer(){

    return(

        <footer>

            <div className="linksERedes">

                    <div className="listaDeLinks">
                    <ul className='listaLinks'>
                        <li id='cima'>Sobre</li>
                        <li id='cima'>Serviços</li>
                        <li id='cima'>Suporte</li>
                    </ul>
                    </div>
    
 
                    <div className="listaDeRedesSociais">
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
                    </div>
    

            </div>

        </footer>

    )

}

export default Footer;