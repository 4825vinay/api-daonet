import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		community: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Community',
		},
	},
	{
		timestamps: true,
	}
);

const Member = mongoose.model('Member', schema);
export default Member;
