import * as Yup from 'yup';
import Usuario from '../models/Usuario_Model';

class Usuario_Controller {
  async adicionarUsuario(req, res) {
    const { username } = req.body;
    try {
      const verificaUsuario = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
      });

      if (!(await verificaUsuario.isValid(req.body))) {
        return res.status(400);
      }

      let user = await Usuario.findOne({ username });

      if (!user) {
        user = await Usuario.create(req.body);
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json('Error');
    }
  }

  async fazerLogin(req, res) {
    try {
      const verificaUsuario = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
      });

      if (!(await verificaUsuario.isValid(req.body))) {
        return res.status(400);
      }

      const usuarios = await Usuario.find();
      const usuario = usuarios.find(
        (user) =>
          user.username === req.body.username &&
          user.password === req.body.password
      );

      if (usuario) {
        return res.status(200).json({ Token: usuario._id });
      }

      return res.status(400).json('Not Found');
    } catch (error) {
      return res.status(400).json('Error');
    }
  }

  async esqueceuSenha(req, res) {
    const { username } = req.params;
    try {
      const user = await Usuario.findOne({ username });

      if (user) {
        return res.status(200).json(user);
      }

      return res.status(400).json('Not Found');
    } catch (error) {
      return res.status(400).json('Error');
    }
  }

  async apagarUsuarios(req, res) {
    try {
      const usuarios = await Usuario.find();
      usuarios.forEach((element) => {
        Usuario.deleteOne({ username: { $gte: element.username } })
          .then(() => {
            console.log('User deleted'); // Success
          })
          .catch((error) => {
            console.log(error); // Failure
          });
      });
      return res.status(200).json({ sucess: 'All users has bem deleted' });
    } catch (error) {
      return res.status(400).json('Error');
    }
  }
}

export default new Usuario_Controller();
