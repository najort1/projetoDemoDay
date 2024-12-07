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
import CadastrarVaga from './components/Dashboard_Empresas/CadastrarVaga';
import Candidatos from './components/Dashboard_Empresas/Candidatos';
import FormularioDeVagas from './components/paginaVagasEmpresa';


const routes = [
  { path: "/", element: <PesquisaVagaTelaInicial /> },//
  { path: "/login", element: <LoginPage /> },//
  { path: "/cadastro", element: <CadastroUsuario /> },//
  { path: "/cadastro-Empresa", element: <CadastroEmpresa /> },//
  { path: "/edicao-Empresa", element: <EdicaoEmpressa /> },//
  { path: "/editar-perfil-candidato", element: <EditarPerfilCandidato /> },//
  { path: "/vagas", element: <Vagas /> },
  { path: "/dashboard", element: <DashBoardPrincipal /> },
  { path: "/login-Empresa", element: <LoginPageEm /> },//
  { path: "/sobre", element: <Sobre /> },//
  { path: "/contato", element: <Contato/> },//
  { path: "/cadastrar-vaga", element: <CadastrarVaga/> },
  { path: "/candidatos", element: <Candidatos/> },
  { path: "*", element: <NotFound /> },
  { path: "/formulario-de-vagas", element: <FormularioDeVagas/>},
];

export default routes;
