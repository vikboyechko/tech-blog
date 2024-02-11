const sequelize = require('../config/connection');
const { Users, Posts } = require('../models');

const usersData = require('./usersData.json');
const postsData = require('./postsData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await Users.bulkCreate(usersData, {
        individualHooks: true,
        returning: true,
    });

    for (const post of postsData) {
        await Posts.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
