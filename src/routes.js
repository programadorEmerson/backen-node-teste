import { Router } from 'express';
import Usuario from './controllers/Usuario_Controller';
import FeedList from './controllers/Feed_Controller';
import FeedsList from './controllers/Feeds_Controller';

const routes = new Router();

// Opções dos usuários
routes.post('/sign-up', Usuario.adicionarUsuario);
routes.post('/sign-in', Usuario.fazerLogin);
routes.post('/delete-all-users', Usuario.apagarUsuarios);
routes.get('/forgot-password/:username', Usuario.esqueceuSenha);

routes.get('/feeds/:feedId', FeedsList.listarFeeds);
routes.get('/feed/texto', FeedList.textoOpinar);
routes.post('/feed', FeedsList.adicionarPostagem);

routes.post('/createFeedList', FeedList.adicionarFeed);
routes.post('/reaction', FeedsList.darLike);
routes.get('/list-feed', FeedList.listarFeeds);
routes.post('/delete-all-posts', FeedsList.apagarPostagens);

export default routes;
