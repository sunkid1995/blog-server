/**
 * Comment models
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({

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

  comment: {
    type: String,
    default: null,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },

});

const CommentModels = mongoose.model('Comments', CommentSchema);

export default CommentModels;
