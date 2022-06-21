const Todo = require('../models/Todo')
const moment = require('moment')

const create = async (content, user) => {
    const todo = await Todo.create({ content, user });

    return todo;
}

const getList = async (userId) => {
    const todos = await Todo.find({ user: userId })
        .sort({ createdAt: 1 })
        .lean()

    return todos;
}

const deleteByContent = async (content, userId) => {
    //console.log(content, userId)
    const todo = await Todo.findOne({
        $and: [
            { content: content },
            { user: userId }
        ]
    })
    //console.log('delete todo', todo)
    if (todo) {
        await Todo.findByIdAndDelete(todo._id)
        return true;
    } else {
        return false;
    }
}

const deleteByNumber = async (number, userId) => {
    const todo = await Todo.find({ user: userId })
        .sort({ createdAt: 1 })
        .lean()

    if (todo.length < number - 1) {
        return false;
    } else {
        await Todo.findByIdAndDelete(todo[number-1]._id)
        return true;
    }
}

const getEntityValue = (entities, key) => {
    const entity = entities[key];
    console.log("entity", entity)
    if (entity) {
        return entity[0].value
    }
    return null;
}

module.exports.processTodo = async (witResText, entities, userId) => {
    let reply = '';
    const listTodo = getEntityValue(entities, "listTodo:listTodo")
    const addTodo = getEntityValue(entities, "addTodo:addTodo")
    const deleteTodo = getEntityValue(entities, "deleteTodo:deleteTodo")
    if (listTodo) {
        const todos = await getList(userId)
        reply = "Danh sách công việc\n"
        for (let i = 0; i < todos.length; i++) {
            reply = reply + `${i + 1}. ${todos[i].content} - ${moment(todos[i].createdAt).format('DD/MM/YYYY')}\n`
            //(i + 1) +  + todos[i].content + todos[i].createdAt + "\n"
        }
    } else if (addTodo) {
        const textSplit = witResText.split("\"");
        //console.log('text length', textSplit.length)
        if (textSplit.length > 1) {
            const todo = await create(textSplit[1], userId)
            if (todo) {
                reply = `Thêm công việc \"${todo.content}\" thành công`
            } else {
                reply = `Thêm công việc \"${textSplit[1]}\" thất bại`
            }
        } else {
            reply = `Vui lòng đưa nội dung công việc vào trong dấu ""`
        }
    } else if (deleteTodo) {
        const witNumber = getEntityValue(entities, "wit$number:number")
        if (witNumber) {
            const todo = await deleteByNumber(witNumber, userId)
            if (todo) {
                reply = `Xóa công việc thứ \"${witNumber}\" thành công`
            } else {
                reply = `Xóa công việc thứ \"${witNumber}\" thất bại`
            }
        } else {
            const textSplit = witResText.split("\"");
            if (textSplit.length > 1) {
                const todo = await deleteByContent(textSplit[1], userId)
                if (todo) {
                    reply = `Xóa công việc \"${todo.content}\" thành công`
                } else {
                    reply = `Xóa công việc \"${textSplit[1]}\" thất bại`
                }
            } else {
                reply = `Vui lòng đưa nội dung công việc lựa chọn vào trong dấu "" hoặc ghi rõ thứ tự công việc trong danh sách`
            }
        }
    } else {
        reply = "Công việc chưa xác định" 
    }
    return reply;
}
