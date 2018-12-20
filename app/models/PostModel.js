import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    required: false,
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

  created_at: {
    type: Date,
    default: Date.now(),
  },

});

/**
 * Set mặc định chữ cái đầu vào title là chữ in hoa
 */

PostSchema.path('title').set((value) => {
  return value[0].toUpperCase() + value.slice(1);
});

const PostModels = mongoose.model('Posts', PostSchema);

export default PostModels;
