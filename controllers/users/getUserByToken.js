import User from '../../models/userModel.js';

const getUserByToken = async (req, res) => {
	try {
		let data = await User.findById(req.user._id).select('-password');
		if (!data) return res.status(404).json({ message: 'User Not Found' });
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getUserByToken;
