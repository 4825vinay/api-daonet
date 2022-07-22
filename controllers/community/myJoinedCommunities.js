import Member from '../../models/membersModel.js';

const myJoinedCommunities = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	try {
		const data = await Member.find({ user: req.user._id })
			.sort(sort)
			.limit(perpage)
			.skip(skip)
			.populate('community');

		const count = await Member.count({ user: req.user._id });

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default myJoinedCommunities;
