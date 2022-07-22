import Member from '../../models/membersModel.js';
import Post from '../../models/postsModel.js';

const createPost = async (req, res) => {
	const { title, description, type, community, topic } = req.body;
	try {
		const item = await Post({
			user: req.user._id,
			title,
			description,
			type,
			community,
			topic,
		});

		const isMember = await Member.findOne({ user: req.user._id, community });

		// if (!isMember) {
		// 	return res.status(401).json({
		// 		status: 'error',
		// 		message: 'Join the community to post something',
		// 	});
		// }

		const saved = await item.save();

		return res.status(201).json(saved);
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
};

export default createPost;
