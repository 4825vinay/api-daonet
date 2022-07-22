import Community from '../../models/communityModel.js';

const myCreatedCommunities = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	try {
		const data = await Community.find({ owner: req.user._id })
			.sort(sort)
			.limit(perpage)
			.skip(skip)
			.populate({ path: 'owner', select: '-password' });
		const count = await Community.count({ owner: req.user._id });

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default myCreatedCommunities;
