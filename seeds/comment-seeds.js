const { Comment } = require('../models');

const newComments = [{
    comment_message: "This is Austin's first comment!",
    user_id: 1,
    post_id: 1,
},{
    comment_message: "This is Mariah's first comment!",
    user_id: 2,
    post_id: 2,
},{
    comment_message: "This is Tyler's first comment!",
    user_id: 3,
    post_id: 3,
},{
    comment_message: "This is Lynsi's first comment!",
    user_id: 4,
    post_id: 4,
},]

const commentSeed = () => Comment.bulkCreate(newComments);

module.exports = commentSeed;