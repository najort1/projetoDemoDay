import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './rotas';

function App() {
  // Muda o fundo de acordo com a página
  setInterval(() => {
    if (location.pathname === "/") {
      document.body.classList.add('fundo');
    } else {
      document.body.classList.remove('fundo');
    }
  });

  return (
    <Router>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
