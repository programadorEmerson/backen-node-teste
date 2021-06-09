import { Schema, model } from 'mongoose';

const UsuarioSchema = new Schema({
  username: String,
  password: String,
});

export default model('Usuario', UsuarioSchema);
