import Comment from '../../models/commentsModel.js';

const createComment = async (req, res) => {
	const { post, description, type, reply } = req.body;
	try {
		const item = await Comment({
			user: req.user._id,
			description,
			type,
			post,
			reply,
		});

		const saved = await item.save();

		return res.status(201).json(saved);
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
};

export default createComment;
