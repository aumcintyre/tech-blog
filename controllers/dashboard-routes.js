const router = require('express').Router();
const sequelize = require('../config/connnection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.uder_id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_message', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },{
            model: User,
            attributes: ['username']
        }]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;