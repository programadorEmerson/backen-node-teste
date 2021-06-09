import { Schema, model } from 'mongoose';

const FeedsSchema = new Schema({
  authorId: String,
  feedId: String,
  content: String,
  like: Boolean,
  love: Boolean,
});

export default model('Feed', FeedsSchema);
