import Follower from '../../models/followerModel.js';

const followUser = async (req, res) => {
	const { id } = req.params;

	try {
		if (req.user._id === id) {
			return res.status(500).json({
				message: `You can not follow yourself`,
			});
		}
		const exists = await Follower.findOne({
			user: req.user._id,
			following: id,
		});

		if (exists) {
			return res.status(500).json({
				message: `You are already following this user`,
			});
		}

		const item = new Follower({ user: req.user._id, following: id });

		const saved = await item.save();

		return res.status(200).json(saved);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default followUser;
