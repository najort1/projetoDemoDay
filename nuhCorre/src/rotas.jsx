import LoginPage from './components/paginaLogin';
import CadastroUsuario from './components/paginaCadastro';
import CadastroEmpresa from './components/paginaCadastroEmpresa';
import { EdicaoEmpressa } from './components/EdicaoEmpressa/edicaoEmpressa';
import EditarPerfilCandidato from './components/EditarPerfilCandidato';
import { PesquisaVagaTelaInicial } from './components/paginaPrincipal/Main';
import { Vagas } from './components/paginaVagas/IndexVagas';
import DashBoardPrincipal from './components/Dashboard_Empresas/PaginaPrincipal';
import LoginPageEm from './components/paginaloginempresa';

const routes = [
  { path: "/", element: <PesquisaVagaTelaInicial /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/cadastro", element: <CadastroUsuario /> },
  { path: "/cadastroEmpresa", element: <CadastroEmpresa /> },
  { path: "/edicaoEmpressa", element: <EdicaoEmpressa /> },
  { path: "/editarPerfilCandidato", element: <EditarPerfilCandidato /> },
  { path: "/vagas", element: <Vagas /> },
  { path: "/dashboard", element: <DashBoardPrincipal /> },
  { path: "/loginEmpresa", element: <LoginPageEm /> },
];

export default routes;
