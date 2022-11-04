const commentSeed = require('./comment-seeds');
const postSeed = require('./post-seeds');
const userSeed = require('./user-seeds');
const sequelize = require('../config/connnection');

const runSeed = async() => {
    await sequelize.sync({ force: true });
    await userSeed();
    await postSeed();
    await commentSeed();
    process.exit(0);
};

runSeed();