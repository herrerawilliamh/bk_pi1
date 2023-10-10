const { messageModel } = require("./models/message.model");

class ChatManager{
    constructor(messageModel){
        this.messages = [];
        this.messageModel = messageModel;
    }
    saveMessage(username, message){
        const messageData = {
            username,
            message
        };
        this.chatModel.create(messageData, (error, result) => {
            if (error) {
                console.log("Error al crear el mensaje", error);
                return;
            }
            console.log("Mensaje creado exitosamente", result);
        });
    }
    getMessages(){
        this.messageModel.find({}, (error, result) => {
            if (error) {
                console.log("Error al obtener los mensajes", error);
                return;
            }
            console.log("Mensajes obtenidos exitosamente", result);
        });
    }
}

module.exports = ChatManager;