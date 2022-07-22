import Community from '../../models/communityModel.js';

const getCommunityById = async (req, res) => {
	const { id } = req.params;

	try {
		const data = await Community.findById(req.params.id);

		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getCommunityById;
