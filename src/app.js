import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';
import './conexao/variaveis';

class App {
  constructor() {
    this.server = express();
    mongoose.connect(
      'mongodb+srv://segware:segware@segware.f3q0v.mongodb.net/segware?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
