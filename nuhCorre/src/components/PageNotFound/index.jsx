import { useEffect } from 'react';
import camaleao from '../../assets/camaleao.png';
import './notfound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate();

    const voltarInicio = () => { navigate('/') }

    useEffect(() => {
        const body = document.body;

        function createStar() {
            const right = 0; // Começa do lado esquerdo
            const top = Math.random() * window.innerHeight; // Aleatório na altura da janela
            const star = document.createElement('div');
            star.classList.add('star');
            body.appendChild(star);

            star.style.top = `${top}px`;

            let currentRight = right;
            const interval = setInterval(() => {
                if (currentRight >= window.innerWidth) {
                    star.remove();
                    clearInterval(interval); // Limpa o intervalo quando a estrela sai da tela
                } else {
                    currentRight += 3; // Move a estrela para a direita
                    star.style.right = `${currentRight}px`;
                }
            }, 10);
        }

        const starInterval = setInterval(createStar, 100);

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(starInterval);
    }, []);

    return (
        <div className="tudoNotFound">
            <div className="text">
                <div className='text-2xl'>Ops !</div>
                <h1 className="error404">Error 404</h1>
                <hr />
                <div>Querido usuario, parece que você se perdeu no site. A página que você está procurando não existe.</div>
            </div>

            <button onClick={voltarInicio} className="btnVoltar text-white bg-gradient-to-r from-violet-600 to-indigo-600 font-bold p-4 rounded-full">Voltar para o início</button>

            <div className="camaleao">
                <img src={camaleao} alt="Camaleão" className="src" />
            </div>
        </div>
    );
};

export default NotFound;
