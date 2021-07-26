const express=require('express');
const app=express();
const path=require('path');
const http=require('http');
const socketio=require('socket.io');
const server=http.createServer(app);
const io=socketio(server);

app.use('/',express.static(path.join(__dirname,'/public')));


const users={}
io.on('connection',(socket)=>{
    
    socket.on('login',(data)=>{
        users[socket.id]=data.name;
        
        // io.emit('received_msg',{
        //     msg:data.msg,
        //     id:socket.id
        // })
        
    })
    socket.on('send_msg',(data)=>{
        // console.log(data.msg);
        io.emit('received_msg',{
            msg:data.msg,
            // id:socket.id
            name:users[socket.id]
        })
    })

    // console.log(socket.id);
})


server.listen(process.env.PORT||3001,()=>{
    console.log('Server Running on Server 3001');
})