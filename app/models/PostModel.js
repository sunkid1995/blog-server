import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: false,
  },

  content: {
    type: String,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },

  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Likes',
    },
  ],

  comments: [
    {
      comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comments',
      },

      user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    },
  ],

}, {
  timestamps: true,
});

/**
 * Set mặc định chữ cái đầu vào title là chữ in hoa
 */

PostSchema.path('title').set((value) => {
  return value[0].toUpperCase() + value.slice(1);
});

const PostModels = mongoose.model('Posts', PostSchema);

export default PostModels;
