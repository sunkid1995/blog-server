import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
  },

  image: {
    type: String,
  },

  content: {
    type: String,
  },

  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
});

const PostModels = mongoose.model('Posts', PostSchema);

export default PostModels;
