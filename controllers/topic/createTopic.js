import asyncHandler from 'express-async-handler';
import Community from '../../models/communityModel.js';
import Topic from '../../models/topicsModel.js';

const createTopic = asyncHandler(async (req, res) => {
	const { name, category, privacy } = req.body;
	try {
		const communityData = await Community.findById(req.body.community);

		if (communityData.owner != req.user._id) {
			return res.status(401).json({
				status: 'error',
				message: 'You are not authorized make this change',
			});
		}

		const exists = await Topic.findOne({ name, community: req.body.community });
		if (exists)
			return res.status(400).json({
				status: 'error',
				message: 'topic already exists',
			});

		if (!communityData) {
			return res.status(404).json({
				status: 'error',
				message: 'Community Does not exist',
			});
		}

		const item = await Topic({
			createdBy: req.user._id,
			community: req.body.community,
			name,
			category,
			privacy,
		});

		const saved = await item.save();

		return res.status(201).json(saved);
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default createTopic;
