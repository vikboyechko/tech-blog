const Users = require('./Users');
const Posts = require('./Posts');

// Creates a relationship between Users and Posts model, with the Users having a "has many" relationship with Posts model.
Users.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// Creates a relationship between Users and Posts model, with a "belongs to" relationship of the Posts to the Users.
Posts.belongsTo(Users, {
    foreignKey: 'user_id',
});

module.exports = { Users, Posts };
