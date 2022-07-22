import asyncHandler from 'express-async-handler';
import Community from '../../models/communityModel.js';

const createCommunity = asyncHandler(async (req, res) => {
	const {
		name,
		communityName,
		description,
		image,
		coverImage,
		rules,
		faqs,
		links,
	} = req.body;
	try {
		const item = await Community({
			owner: req.user._id,
			name,
			communityName,
			description,
			image,
			coverImage,
			rules,
			faqs,
			links,
		});

		const data = await Community.findOne({ communityName: communityName });
		if (data)
			return res.status(400).json({
				status: 'error',
				message:
					'community name already exists, please choose a different name',
			});

		const saved = await item.save();

		return res.status(201).json(saved);
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default createCommunity;
