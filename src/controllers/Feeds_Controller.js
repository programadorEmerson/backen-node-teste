import FeedsList from '../models/Feeds_Model';
import Usuario from '../models/Usuario_Model';

class Feeds_Controller {
  async listarFeeds(req, res) {
    const { feedId } = req.params;
    try {
      const feeds = await FeedsList.find({ feedId });
      return res.status(200).json(feeds);
    } catch (error) {
      return res.status(400).json('Error');
    }
  }

  async adicionarPostagem(req, res) {
    const { username } = req.headers;
    try {
      const user = await Usuario.findOne({ username });
      FeedsList.create(req.body);
      return res.status(200).json({
        authorId: user._id,
        feedId: req.body.feedId,
        content: req.body.content,
        like: false,
        love: false,
      });
    } catch (error) {
      return res.status(400).json('Error');
    }
  }

  async darLike(req, res) {
    const { _id } = req.body;
    try {
      await FeedsList.updateOne({ _id }, req.body);
      return res.status(200).json('Ok');
    } catch (error) {
      return res.status(400).json('Error');
    }
  }

  async apagarPostagens(req, res) {
    try {
      const usuarios = await FeedsList.find();
      usuarios.forEach((element) => {
        FeedsList.deleteOne({ feedId: { $gte: element.feedId } })
          .then(() => {
            console.log('Post deleted'); // Success
          })
          .catch((error) => {
            console.log(error); // Failure
          });
      });
      return res.status(200).json({ sucess: 'All posts has bem deleted' });
    } catch (error) {
      return res.status(400).json('Error');
    }
  }
}

export default new Feeds_Controller();
