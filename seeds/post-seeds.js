const { Post } = require('../models');

const newPosts = [{
    title: "This is Austin's Post",
    content: "I love learning new technology!",
    user_id: 1,
},{
    title: "This is Mariahs's Post",
    content: "I do not love learning new technology!!",
    user_id: 2,
},{
    title: "This is Tyler's Post",
    content: "I'm just the creator's brother.",
    user_id: 3,
},{
    title: "This is Lynsi's Post",
    content: "I'm just the creator's sister.",
    user_id: 4,
},]

const postSeed = () => Post.bulkCreate(newPosts);

module.exports = postSeed;