import User from '../models/userModel.js';
import express from 'express';
import _ from 'lodash';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { protect } from '../middleware/auth.js';
import getUserByToken from '../controllers/users/getUserByToken.js';

const router = express.Router();

//const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

router.post('/login', async (req, res) => {
	try {
		const { error } = loginValidate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(400)
				.send({ status: 'error', message: 'User does not exist' });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res
				.status(400)
				.send({ status: 'error', message: 'Wrong password' });

		const token = user.generateAuthToken();
		return res.status(200).json({ token: `Bearer ${token}` });
	} catch (e) {
		return res.status(500).send({ status: 'error', message: e.message });
	}
});

router.post('/register', async (req, res) => {
	const { error } = await registerValidate(req.body);
	if (error)
		return res
			.status(400)
			.send({ message: error.details[0].message, error: error });

	if (req.body.password != req.body.confirm)
		return res.status(400).send({ message: 'Passwords do not match' });

	try {
		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res.status(400).send({
				status: 'error',
				message: 'This email address is already registered',
			});

		user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']));
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);

		await user.save();

		const token = user.generateAuthToken();
		return res
			.status(200)
			.header('x-auth-token', token)
			.json({ token: `Bearer ${token}` });
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
});

function loginValidate(user) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email().messages({
			'any.required': 'Email is required',
			'string.email': 'Invalid Email, please enter a valid email address',
		}),
		password: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(user);
}

function registerValidate(user) {
	const schema = Joi.object({
		name: Joi.string().min(2).max(50),
		email: Joi.string().max(255).required().email().messages({
			'any.required': 'Email is required',
			'string.email': 'Invalid Email, please enter a valid email address',
		}),
		password: Joi.string().min(8).max(255).required().messages({
			'any.required': 'Password is required',
			'string.min': 'Password must be at least 8 characters long',
		}),
		confirm: Joi.ref('password'),
		role: Joi.string(),
	});
	return schema.validate(user);
}

router.get('/self', protect, getUserByToken);

export default router;
