import Comment from '../../models/commentsModel.js';

const getComments = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;
	const { id } = req.params;
	const type = req.query.type ? req.query.type : 'comment';

	const query =
		type === 'comment'
			? { post: id, type: 'comment' }
			: { reply: id, type: 'reply' };

	try {
		const data = await Comment.find(query).sort(sort).limit(perpage).skip(skip);

		const count = await Comment.count(query);

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getComments;
