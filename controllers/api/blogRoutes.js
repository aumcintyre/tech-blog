const router = require('express').Router;
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connnection');
const withAuth = require('../../utils/auth');
const { post } = require('../homeRoutes');

router.length('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
        ],
        order: [
            ['created_at', 'DESC']
        ],
        include: [{
            model: User,
            attributes: ['username']
        },{
            model: Comment,
            attributes: ['id', 'comment_message', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ]
    })
    .then(postData => res.json(postData.reverse()))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at',
        ],
        include: [{
            model: User,
            attributes: ['username']
        },{
            model: Comment,
            attributes: [
                'id',
                'comment_message',
                'post_id',
                'user_id',
                'created_at'
            ],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    })
    .then(postData => {
        if(!postData){
            res.status(400).json({ message: 'No existing post matches this ID'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});