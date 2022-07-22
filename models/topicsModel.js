import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		community: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Community',
		},
		name: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		privacy: { type: String, required: true },
		image: {
			type: String,
			//required: true,
		},
		coverImage: {
			type: String,
			//required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Topic = mongoose.model('Topic', schema);

export default Topic;
