import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const likeSchema = new Schema({

  userId: [{
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  }],

  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Posts',
    required: true,
  },

  totalLike: {
    type: Number,
    default: 0,
    required: true,
  },

}, { timestamps: true });

const LikeModels = mongoose.model('Likes', likeSchema);

export default LikeModels;
