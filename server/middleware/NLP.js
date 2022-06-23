const todoController = require('../controllers/todoController')
const getWeather = require('./GetWeather')
const getTranslate = require('./Translate')
const { staticResponses } = require('./StaticResponses')
const Parser = require('expr-eval').Parser 

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
        case "translate": {
            reply = await getTranslate(entity)   //wisRes text
            break;
        }
        default:
            reply = "Xin chào, " + entity;
            break;
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
                reply = await todoController.processTodo(witResponse.text, entities, userId)
                break;
            }
            case "calculator": {
                const entityValue = getEntityValue(entities, "wit$math_expression:math_expression")
                if (entityValue) {
                    var expr = Parser.evaluate(entityValue)
                    reply = `Kết quả là ${expr}`
                } else {
                    reply = "Bạn có thể nhập phép tính vào được không"
                }
                break;
            }
            case "translate": {
                if (prevIntentName === intentName) {
                    reply = processPrevIntent(witResponse.text)
                    prevIntentName = '';
                } else {
                    reply = "Bạn hãy đưa từ cần dịch cho mình";
                    prevIntentName = intentName;
                }
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