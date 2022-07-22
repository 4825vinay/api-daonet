import Post from '../../models/postsModel.js';

const getMyPosts = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	const query = { user: req.user._id };

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

export default getMyPosts;
