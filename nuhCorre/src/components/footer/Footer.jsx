import './styleFooter.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica qual página está ativa
  const isServicosPage = location.pathname === '/servicos';
  const isPoliticaPage = location.pathname === '/politica-de-privacidade';
  
  const navegarParaServicos = () => {
    navigate('/servicos');
  };

  const navegarParaPolitica = () => {
    navigate('/politica-de-privacidade');
  };

  return (
    <footer className="bg-[#5b82bbd1] h-14 w-full flex justify-evenly items-center p-4 bottom-0">
      <div className="items-textuais flex flex-row gap-4 text-white font-bold text-sm hover:cursor-pointer">

        <div className="item-footer">
          <p
            className={`text-footer ${isServicosPage ? 'link-ativo-footer' : ''}`}
            onClick={navegarParaServicos}
          >
            Serviços
          </p>
        </div>

        <div className="item-footer">
          <p
            className={`text-footer ${isPoliticaPage ? 'link-ativo-footer' : ''}`}
            onClick={navegarParaPolitica}
          >
            Política de Privacidade
          </p>
        </div>
      </div>

      <div className="items-redes-sociais flex flex-row hover:cursor-pointer gap-2">
        <div className="item-footer">
          <box-icon name="facebook-circle" color="#FFFFFF" size="md" type="logo"></box-icon>
        </div>

        <div className="item-footer">
          <box-icon name="instagram-alt" color="#FFFFFF" size="md" type="logo"></box-icon>
        </div>

        <div className="item-footer">
          <box-icon name="linkedin-square" color="#FFFFFF" size="md" type="logo"></box-icon>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
