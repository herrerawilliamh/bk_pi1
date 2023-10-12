const socket = io();
 
document.getElementById("chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const messageInput = document.getElementById("message")
    const message = messageInput.value
    messageInput.value = ""
    socket.emit("chatMessage", message);
})

socket.on("message", (data) => {
    const chatMessage = document.getElementById("chat-messages")
    const messageElement = document.createElement("div")
    messageElement.innerHTML = `<strong>${data.username}: </strong> ${data.message}`
    chatMessage.appendChild(messageElement)
})

document.getElementById("username-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById("username")
    const username = usernameInput.value
    socket.emit("newUser", username)
    
    Swal.fire({
        icon: "success",
        title: "Bienvnid@ al chat",
        text: `Estás conectado como ${username}`
    })

    document.getElementById("username-form").style.display = "none"
    document.getElementById("chat-form").style.display = "block"


fetch("/api/chat")
        .then(res => res.json())
        .then(data => {
            // Verificar si el estado es success
            if (data.status === "success") {
                // Obtener el arreglo de mensajes del payload
                const messages = data.payload;
                // Recorrer el arreglo de mensajes
                for (let message of messages) {
                    // Crear un elemento div para cada mensaje
                    const messageElement = document.createElement("div")
                    // Asignar el nombre de usuario y el contenido del mensaje al elemento div
                    messageElement.innerHTML = `<strong>${message.username}: </strong> ${message.message}`
                    // Agregar el elemento div al elemento chat-messages
                    chatMessage.appendChild(messageElement)
                }
            } else {
                // Mostrar un mensaje de error si el estado es error
                console.log(data.error);
            }
        })
        .catch(err => {
            // Manejar posibles errores en la petición
            console.log(err);
        })
})