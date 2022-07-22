import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
			trim: true,
		},
		people: [],
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		signature: { type: String },
		opened: { type: String },
		isSender: { type: Boolean },

		status: String,
		msgStatus: String,
	},
	{
		timestamps: true,
	}
);

const Message = mongoose.model('Message', schema);

export default Message;
