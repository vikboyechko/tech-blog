const router = require('express').Router();
const { Posts, Users, Comments } = require('../models');
const withAuth = require('../utils/auth'); // custom helper for authentication

// GET all posts for homepage
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Posts.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['username'],
                },
            ],
        });
        // Serialize data so the template can read it
        const posts = dbPostData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one post
router.get('/posts/:id', async (req, res) => {
    try {
        const dbPostData = await Posts.findByPk(req.params.id, {
            include: [
                {
                    model: Users,
                    attributes: ['username'],
                },
                {
                    // include the comment model here:
                    model: Comments,
                    include: [
                        {
                            model: Users,
                            attributes: ['username'],
                        },
                    ],
                },
            ],
        });

        const post = dbPostData.get({ plain: true });

        // adds a new property to the post object, so if the logged-in user is the post author, they can see the edit and delete buttons
        post.isAuthor = req.session.user_id === post.user_id;

        // passes the serialized data into the session flag, along with the logged-in user's id and the isAuthor property
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
            isAuthor: post.isAuthor,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth helper to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await Users.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Posts }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Posts.findByPk(req.params.id, {
            include: [
                {
                    model: Users,
                    attributes: ['username'],
                },
            ],
        });
        const post = postData.get({ plain: true });
        const postUser = post.user_id;
        const reqPostUser = req.session.user_id;
        if (!(postUser === reqPostUser)) {
            res.redirect('/dashboard');
            return;
        }
        res.render('edit', {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
