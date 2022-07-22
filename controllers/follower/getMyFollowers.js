import Follower from '../../models/followerModel.js';

const getMyFollowers = async (req, res) => {
	const { perpage } = req.meta;

	const type = req.query.type || 'followers';

	const query =
		type === 'followings'
			? { user: req.user._id }
			: { following: req.user._id };

	try {
		const data = await Follower.find(query).populate([
			{ path: 'user', select: 'email' },
			{ path: 'following', select: 'email' },
		]);
		const count = await Follower.count(query);

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getMyFollowers;
