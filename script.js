const socket = io('http://localhost:3000')
// const type = require('typewriter-effect')
// import Typewriter from 'typewriter-effect/dist/core';
// var headdy = document.getElementById('headdy')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const logoutButton = document.getElementById('logout-button')

const name = prompt('What is your name')
appendMessage('You Joined')
socket.emit('new-user', name)

// var typewriter = new Typewriter(headdy, {
//     loop: true,
//     delay: 75,
//   });


socket.on('chat-message', (data) => appendMessage(data.name +' : '+ data.message ) )

socket.on('user-connected', (data) => appendMessage(data +' has Connected') )

socket.on('user-disconnected', (data) => appendMessage(data +' has Disconnected') )

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    // console.log(message)
    appendMessage('You ' +message)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})


function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

