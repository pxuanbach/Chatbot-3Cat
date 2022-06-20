const Todo = require('../models/Todo')

module.exports.create = async (content, user) => {
    const todo = await Todo.create({ content, user });

    return todo;
}

module.exports.getList = async (userId) => {
    const todos = await Todo.find({ user: userId }).lean()

    return todos;
}

module.exports.delete = async (content, userId) => {
    const todo = await Todo.findOne({
        $and: [
            { content: content },
            { user: userId }
        ]
    }).lean()
    console.log('delete todo', todo)
    if (todo) {
        await Todo.findByIdAndDelete(todo._id);
        return true;
    } else {
        return false;
    }
}