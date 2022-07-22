import Topic from '../../models/topicsModel.js';

const getTopics = async (req, res) => {
	const { perpage } = req.meta;
	const { id } = req.params;

	try {
		const data = await Topic.find({ community: id });
		const count = await Topic.count({ community: id });

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getTopics;
