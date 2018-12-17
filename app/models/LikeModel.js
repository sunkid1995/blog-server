import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const likeSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },

  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Posts',
    required: true,
  },

  like: {
    type: Boolean,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },

});

const LikeModels = mongoose.model('Likes', likeSchema);

export default LikeModels;
