import Follower from '../../models/followerModel.js';

const unfollowUser = async (req, res) => {
	const { id } = req.params;

	try {
		if (req.user._id === id) {
			return res.status(500).json({
				message: `You can not follow/unfollow yourself`,
			});
		}
		const exists = await Follower.findOne({
			user: req.user._id,
			following: id,
		});

		if (!exists) {
			return res.status(500).json({
				message: `You don't follow this user`,
			});
		}

		const data = await Follower.deleteOne({
			id: exists._id,
		});

		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default unfollowUser;
