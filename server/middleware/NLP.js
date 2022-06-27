const HandleTodo = require('./HandleTodo')
const getWeather = require('./GetWeather')
const getTranslate = require('./GetTranslate')
const getCovid = require('./GetCovid')
const getGasolinePrice = require('./GetGasolinePrice')
const convertCurrency = require('./ConvertCurrency')
const { staticResponses } = require('./StaticResponses')
const Parser = require('expr-eval').Parser

let prevIntentName = '';
let isSkipForPreviewIntent = false;

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

const getEntityUnit = (entities, key) => {
    const entity = entities[key];
    console.log("entity", entity)
    if (entity) {
        return entity[0].unit
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
        case "calculator": {
            var expr = Parser.evaluate(entity)
            reply = `Kết quả là ${expr}`
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
        if (isSkipForPreviewIntent === true) {
            reply = await processPrevIntent(witResponse.text)
            isSkipForPreviewIntent = false;
            prevIntentName = ''
        } else {
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
                        reply = await processPrevIntent(entityValue)
                    } else {
                        reply = await processPrevIntent(witResponse.text)
                    }
                    break;
                }
                case "todo": {
                    reply = await HandleTodo
                        .processTodo(witResponse.text, entities, userId)
                    break;
                }
                case "calculator": {
                    const entityValue = getEntityValue(entities,
                        "wit$math_expression:math_expression")
                    if (entityValue) {
                        var expr = Parser.evaluate(entityValue)
                        reply = `Kết quả là ${expr}`
                    } else {
                        reply = "Bạn có thể nhập phép tính vào được không"
                        prevIntentName = intentName;
                        isSkipForPreviewIntent = true;
                    }
                    break;
                }
                case "translate": {
                    const entityValue = getEntityValue(entities,
                        'wit$phrase_to_translate:phrase_to_translate')
                    if (entityValue) {
                        reply = await getTranslate(entityValue)
                    } else {
                        reply = "Bạn hãy đưa từ cần dịch cho mình";
                        prevIntentName = intentName;
                        isSkipForPreviewIntent = true;
                    }
                    break;
                }
                case "covid": {
                    reply = await getCovid();
                    break;
                }
                case "convertCurrency": {
                    const amount = getEntityValue(entities, "wit$amount_of_money:amount_of_money")
                    const currencyFrom = getEntityUnit(entities, "wit$amount_of_money:amount_of_money")                 
                    const currencyTo = getEntityValue(entities, "currency:currency")
                    reply = await convertCurrency(currencyFrom, currencyTo, amount)
                    break;
                }
                default:
                    reply = "Xin lỗi, mình cần học nhiều hơn"
                    break;
            }
        }
        return reply;
    },
};

module.exports = nlp;