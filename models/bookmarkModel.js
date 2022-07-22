import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		post: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Post',
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const Bookmark = mongoose.model('Bookmark', schema);

export default Bookmark;
