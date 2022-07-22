import Member from '../../models/membersModel.js';

const leaveCommunity = async (req, res) => {
	const { id } = req.params;

	try {
		const exists = await Member.findOne({
			user: req.user._id,
			community: id,
		});

		if (!exists) {
			return res.status(500).json({
				message: `You are not a member of this community yet`,
			});
		}

		const data = await Member.deleteOne({
			id: exists._id,
		});

		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default leaveCommunity;
