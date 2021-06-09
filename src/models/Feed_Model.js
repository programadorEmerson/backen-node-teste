import { Schema, model } from 'mongoose';

const FeedSchema = new Schema({
  titulo: String,
  imagem: String,
  texto: String,
});

export default model('listFeed', FeedSchema);
