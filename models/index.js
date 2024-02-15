const Users = require('./Users');
const Posts = require('./Posts');
const Comments = require('./Comments');

// Creates a relationship between Users and Posts model, with the Users having a "has many" relationship with Posts model.
Users.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// Creates a relationship between Users and Posts model, with a "belongs to" relationship of the Posts to the Users.
Posts.belongsTo(Users, {
    foreignKey: 'user_id',
});

// Creates a relationship between Users and Comments model, with the Users having a "has many" relationship with Comments model.
Users.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// Creates a relationship between Users and Comments model, with a "belongs to" relationship of the Comments to the Users.
Comments.belongsTo(Users, {
    foreignKey: 'user_id',
});

// Creates a relationship between Posts and Comments model, with the Posts having a "has many" relationship with Comments model.
Posts.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

// Creates a relationship between Posts and Comments model, with a "belongs to" relationship of the Comments to the Posts.
Comments.belongsTo(Posts, {
    foreignKey: 'post_id',
});

module.exports = { Users, Posts, Comments };
