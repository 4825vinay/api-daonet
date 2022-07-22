import Post from '../../models/postsModel.js';

const getPostsFromTopic = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;
	const { id } = req.params;
	const type = req.query.type ? req.query.type : 'topic';

	const query = type === 'topic' ? { topic: id } : { community: id };

	try {
		const data = await Post.find(query).sort(sort).limit(perpage).skip(skip);

		const count = await Post.count(query);

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getPostsFromTopic;
