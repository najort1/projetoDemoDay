import LoginPage from './components/paginaLogin';
import CadastroUsuario from './components/paginaCadastro';
import CadastroEmpresa from './components/paginaCadastroEmpresa';
import { EdicaoEmpressa } from './components/EdicaoEmpressa/edicaoEmpressa';
import EditarPerfilCandidato from './components/EditarPerfilCandidato';
import { PesquisaVagaTelaInicial } from './components/paginaPrincipal/Main';
import { Vagas } from './components/paginaVagas/IndexVagas';
import DashBoardPrincipal from './components/Dashboard_Empresas/PaginaPrincipal';
import LoginPageEm from './components/paginaloginempresa';
import { Sobre } from './components/paginaSobre/sobre';
import { Contato } from './components/paginaContato/indexContato';
import NotFound from './components/PageNotFound';
import { Perfil } from './components/paginaPerfil/perfil';
import CadastrarVaga from './components/Dashboard_Empresas/CadastrarVaga';

const routes = [
  { path: "/", element: <PesquisaVagaTelaInicial /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/cadastro", element: <CadastroUsuario /> },
  { path: "/cadastroEmpresa", element: <CadastroEmpresa /> },
  { path: "/edicaoEmpressa", element: <EdicaoEmpressa /> },
  { path: "/editar-perfil-candidato", element: <EditarPerfilCandidato /> },
  { path: "/vagas", element: <Vagas /> },
  { path: "/dashboard", element: <DashBoardPrincipal /> },
  { path: "/loginEmpresa", element: <LoginPageEm /> },
  { path: "/sobre", element: <Sobre /> },
  { path: "/contato", element: <Contato/> },
  { path: "/perfil", element: <Perfil/> },
  { path: "/cadastrar-vaga", element: <CadastrarVaga/> },
  { path: "*", element: <NotFound /> }
];

export default routes;
