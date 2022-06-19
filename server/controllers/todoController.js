const Todo = require('../models/Todo')

module.exports.create = async (content, user) => {
    const todo = await Todo.create({ content, user });

    return todo;
}

module.exports.getList = async (userId) => {
    const todos = await Todo.find({user: userId}).lean()

    return todos;
}