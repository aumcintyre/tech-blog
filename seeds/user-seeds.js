const { User } = require('../models');

const newUsers = [{
    username: 'Austin',
    password: 'password',
},{
    username: 'Mariah',
    password: 'password',
},{
    username: 'Tyler',
    password: 'password',
},{
    username: 'Lynsi',
    password: 'password',
},
];

const userSeed = () => User.bulkCreate(newUsers);

module.exports = userSeed;