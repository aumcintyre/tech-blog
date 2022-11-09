const router = require('express').Router();
const { User, Comment, Post } = require('../../models')

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: ['id', 'title', 'content', 'created_at']
        }, {
            model: Comment,
            attributes: ['id', 'comment_message', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }, {
            model: Post,
            attributes: ['title'],
        }]

    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No existing user matches this ID' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(userData => {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json(userData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No existing user matches that ID' });
                return;
            }
            const checkPassword = userData.verifyPassword(req.body.password);

            if (!checkPassword) {
                res.status(400).json({ message: 'Incorrect Password' });
                return;
            }
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json({ message: 'Logged in!' });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;