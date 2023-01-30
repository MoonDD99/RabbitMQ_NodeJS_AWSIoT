const { publishTopic } = require("../aws_iot/awsIoT");
var rabbitMQConfig = require("../config/rabbitMQConfig.json")

function commandPublish(id, status){
    const topic = rabbitMQConfig.topic + `${id}`;
    const message = {
        "message": "LED",
        "id": id ,
        "status": status
    }
    publishTopic(topic,message);
    return message;
};

module.exports = { commandPublish }