import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		post: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Post',
		},
		description: { type: String, required: true },
		type: { type: String, required: true, default: 'comment' },
		upVotes: { type: Number, default: 0 },
		downVotes: { type: Number, default: 0 },
		reply: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
		},
	},

	{
		timestamps: true,
	}
);

const Comment = mongoose.model('Comment', schema);

export default Comment;
