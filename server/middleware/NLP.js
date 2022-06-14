const staticResponses = {
    hello: [
        "Hey, chào bạn!",
        "Hi",
        "Rất vui được gặp bạn",
        "Xin chào",
    ],
};

let prevIntentName = ''

const getEntityValue = (entities, key) => {
    const entity = entities[key];
    console.log("entity", entity)
    if (entity) {
        return entity[0].value
    }
    return null;
}

const processPrevIntent = (entity) => {
    let reply = ''
    switch (prevIntentName) {
        case "weather":
            reply = "Thời tiết ở " + entity;
            break;
        default:
            reply = "Xin chào, " + entity;
            break;
    }
    prevIntentName = '';
    return reply;
}

var nlp = {
    handleMessage: async (witResponse) => {
        const intentName = witResponse.intents[0]?.name;
        const entities = witResponse.entities
        console.log('intentName ', intentName)
        let reply = ''
        switch (intentName) {
            case "hello":
                const replyArr = staticResponses[intentName];
                reply = replyArr[Math.floor(Math.random() * replyArr.length)];
                break;
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