import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		communityName: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		approvalStatus: { type: String, required: true, default: 'pending' },
		approvedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		image: {
			type: String,
			//required: true,
		},
		coverImage: {
			type: String,
			//required: true,
		},
		rules: [
			{
				title: { type: String, required: true },
				details: { type: String, required: true },
			},
		],
		faqs: [
			{
				title: { type: String, required: true },
				details: { type: String, required: true },
			},
		],
		links: [{ title: { type: String }, href: { type: String } }],
	},
	{
		timestamps: true,
	}
);

const Community = mongoose.model('Community', schema);

export default Community;
