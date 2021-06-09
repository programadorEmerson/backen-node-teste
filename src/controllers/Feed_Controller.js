import FeedList from '../models/Feed_Model';

class Feed_Controller {
  async listarFeeds(req, res) {
    try {
      const listaFeed = await FeedList.find();
      return res.status(200).json(listaFeed);
    } catch (error) {
      return res.status(400).json('Error');
    }
  }

  async textoOpinar(req, res) {
    const { _id } = req.headers;
    try {
      const listaFeed = await FeedList.find({ _id });
      return res.status(200).json(listaFeed[0].texto);
    } catch (error) {
      return res.status(400).json('Error');
    }
  }

  async adicionarFeed(req, res) {
    try {
      FeedList.create(req.body);
      return res.status(200).json(req.body);
    } catch (error) {
      return res.status(400).json('Error');
    }
  }
}

export default new Feed_Controller();
