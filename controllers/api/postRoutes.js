const router = require('express').Router();
// Import the Posts model from the models folder
const { Posts } = require('../../models');

// If a POST request is made to /api/posts, a new post is created. If there is an error, the function returns with a 400 error.
router.post('/', async (req, res) => {
    try {
        const newPost = await Posts.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// If a DELETE request is made to /api/posts/:id, that project is deleted.
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Posts.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get('/:id', async (req, res) => {
//     try {
//         const postData = await Posts.findByPk(req.params.id);

//         if (!postData) {
//             res.status(404).json({ message: 'No post found with this id!' });
//             return;
//         }

//         res.status(200).json(postData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// If a PUT request is made to /api/posts/edit/:id, that post is updated.
router.put('/update/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content } = req.body;

        const postData = await Posts.findByPk(postId);

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        postData.title = title;
        postData.content = content;
        postData.date_created = new Date();

        await postData.save();

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
