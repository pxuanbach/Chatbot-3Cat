const getWeather = require('./GetWeather')

const staticResponses = {
    hello: [
        "Hey, chào bạn!",
        "Hi",
        "Rất vui được gặp bạn",
        "Xin chào",
        "Hello"
    ],
    praise: [
        "Cảm ơn về lời khen! :)",
        "Rất vui khi trò chuyện với bạn",
        "Hihi",
        "Đa tạ!"
    ],
    botinfo: [
        "Mình là chatbot do nhóm 3Cat tạo ra",
        "1 chatbot nhỏ bé giữa thế giới rộng lớn...",
        "Nếu bạn đã thành tâm muốn biết... Mình là chatbot được tạo ra bởi nhóm 3Cat",
    ]
};

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
        case "weather":
            await getWeather(entity).then(result => {
                console.log(result)
                reply = `Thời tiết ở ${result.name} đang ${result.desc}, nhiệt độ khoảng ${result.temp.toFixed(2)} độ C, độ ẩm khoảng ${result.humidity}%`
            }).catch(err => {
                reply = "Mình không tìm thấy nơi bạn cần xem thời tiết";
            })
            break;
        default:
            reply = "Xin chào, " + entity;
            break;
    }
    return reply;
}

var nlp = {
    handleMessage: async (witResponse) => {
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
                    reply = "Thời tiết ở " + entityValue
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
            default:
                reply = "Xin lỗi, mình cần học nhiều hơn"
                break;
        }
        return reply;
    },
};

module.exports = nlp;