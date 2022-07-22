import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
		},
		wallet: {
			type: String,
			//required: true,
		},
		bio: {
			type: String,
		},
		website: {
			type: String,
		},
		nfts: [],

		email: { type: String, required: true, trim: true, unique: true },
		role: {
			type: String,
			required: true,
			trim: true,
			default: 'user',
		},
		password: { type: String, required: true, minlength: 8, maxlength: 1024 },
	},

	{
		timestamps: true,
	}
);

schema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			wallet: this.wallet,
			role: this.role,
		},
		process.env.JWT_PRIVATE_KEY
	);
	return token;
};

const User = mongoose.model('User', schema);
export default User;
