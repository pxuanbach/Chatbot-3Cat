const todoController = require('../controllers/todoController')
const moment = require('moment')
const getWeather = require('./GetWeather')
const {staticResponses} = require('./StaticResponses')

let prevIntentName = ''

const replyInResponses = (intentName) => {
    const replyArr = staticResponses[intentName];
    const reply = replyArr[Math.floor(Math.random() * replyArr.length)];
    return reply;
}

const getEntityValue = (entities, key) => {
    const entity = entities[key];
    console.log("entity", entity)
    if (entity) {
        return entity[0].value
    }
    return null;
}

const processPrevIntent = async (entity) => {
    let reply = ''
    switch (prevIntentName) {
        case "weather": {
            await getWeather(entity).then(result => {
                console.log(result)
                reply = `Thời tiết ở ${result.name} đang ${result.desc}, nhiệt độ khoảng ${result.temp.toFixed(2)} độ C, độ ẩm khoảng ${result.humidity}%`
            }).catch(err => {
                reply = "Mình không tìm thấy nơi bạn cần xem thời tiết";
            })
            break;
        }
        case "todo": {

        } 
        default:
            reply = "Xin chào, " + entity;
            break;
    }
    return reply;
}

const processTodo = async (witResText, entities, userId) => {
    let reply = '';
    const listTodo = getEntityValue(entities, "listTodo:listTodo")
    const addTodo = getEntityValue(entities, "addTodo:addTodo")
    const deleteTodo = getEntityValue(entities, "deleteTodo:deleteTodo")
    if (listTodo) {
        const todos = await todoController.getList(userId)
        reply = "Danh sách công việc\n"
        for (let i = 0; i < todos.length; i++) {
            reply = reply + `${i + 1}. ${todos[i].content} - ${moment(todos[i].createdAt).format('DD/MM/YYYY')}\n`
            //(i + 1) +  + todos[i].content + todos[i].createdAt + "\n"
        }
    } else if (addTodo) {
        const textSplit = witResText.split("\"");
        //console.log('text length', textSplit.length)
        if (textSplit.length > 1) {
            const todo = await todoController.create(textSplit[1], userId)
            if (todo) {
                reply = `Thêm công việc \"${todo.content}\" thành công`
            }
        } else {
            reply = `Vui lòng đưa nội dung công việc vào trong dấu ""`
        }
    } else if (deleteTodo) {
        const textSplit = witResText.split("\"");
        if (textSplit.length > 1) {
            const todo = await todoController.delete(textSplit[1], userId)
            if (todo === true) {
                reply = `Xóa công việc \"${todo.content}\" thành công`
            }
        } else {
            reply = `Vui lòng đưa công việc lựa chọn vào trong dấu ""`
        }
    } else {
        reply = "Công việc chưa xác định" 
    }
    return reply;
}

//main
var nlp = {
    handleMessage: async (witResponse, userId) => {
        const intentName = witResponse.intents[0]?.name;
        const entities = witResponse.entities
        console.log('intentName ', intentName)
        let reply = ''
        switch (intentName) {
            case "hello": {
                reply = replyInResponses(intentName)
                prevIntentName = '';
                break;
            }
            case "praise": {
                reply = replyInResponses(intentName)
                prevIntentName = '';
                break;
            }
            case "botinfo": {
                reply = replyInResponses(intentName)
                prevIntentName = '';
                break;
            }
            case "weather": {
                const entityValue = getEntityValue(entities, "name:name")
                if (entityValue) {
                    await getWeather(entityValue).then(result => {
                        console.log(result)
                        reply = `Thời tiết ở ${result.name} đang ${result.desc}, nhiệt độ khoảng ${result.temp.toFixed(2)} độ C, độ ẩm khoảng ${result.humidity}%`
                    }).catch(err => {
                        reply = "Mình không tìm thấy nơi bạn cần xem thời tiết";
                    })
                } else {
                    reply = "Bạn muốn xem thời tiết ở đâu";
                    prevIntentName = intentName;
                }
                break;
            }
            case "identify": {
                const entityValue = getEntityValue(entities, "name:name")
                if (entityValue) {
                    reply = processPrevIntent(entityValue)
                } else {
                    reply = processPrevIntent(witResponse.text)
                }
                break;
            }
            case "todo": {
                reply = await processTodo(witResponse.text, entities, userId)
                break;
            }
            default:
                reply = "Xin lỗi, mình cần học nhiều hơn"
                break;
        }
        return reply;
    },
};

module.exports = nlp;