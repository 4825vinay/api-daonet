import Member from '../../models/membersModel.js';

const joinCommunity = async (req, res) => {
	const { community } = req.body;

	try {
		const exists = await Member.findOne({
			user: req.user._id,
			community,
		}).populate('community');

		if (exists) {
			return res.status(500).json({
				message: `You have already joined ${exists.community.communityName}`,
			});
		}

		const item = new Member({
			user: req.user._id,
			community,
		});

		const saved = await item.save();

		return res.status(200).json(saved);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default joinCommunity;
