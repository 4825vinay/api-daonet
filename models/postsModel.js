import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		topic: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Topic',
		},
		community: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Community',
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		type: { type: String, required: true },

		images: [],
		link: { type: String },
		pollOptions: [],
		pollLength: { type: String },
		upVotes: { type: Number, default: 0, required: true },
		downVotes: { type: Number, default: 0, required: true },
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model('Post', schema);

export default Post;
