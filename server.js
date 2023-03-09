const io = require('socket.io')(3000, { cors: { origin: "*" } } );
// const cors = require('cors')

// io.use(cors())

const users = {}

io.on('connect', (socket) => {


    socket.on('new-user', (user) => {
        users[socket.id] = user
        socket.broadcast.emit('user-connected', user)
    })

    // console.log('a user connected')
    // socket.emit('chat-message', 'Hello world')
    socket.on('send-chat-message', message => {
        console.log(users)
        socket.broadcast.emit('chat-message', {message: message, 
            name: users[socket.id]  } ) })
            
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
        })    
    })

