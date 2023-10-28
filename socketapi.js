const io = require( "socket.io" )();
const socketapi = {
    io: io
};

var onlineusersname = [];
var onlineusersid = [];

io.on( "connection", function( socket ) {
    console.log( "A user connected with " + socket.id );

    socket.on("message", data =>{
        socket.broadcast.emit("message", data);
    })


    socket.on("disconnect", d =>{
        onlineusersid.splice(onlineusersid.indexOf(socket.id),1);
        onlineusersname.splice(onlineusersid.indexOf(socket.id),1);
        io.emit("online", onlineusersid.length);
        io.emit("name", onlineusersname);
    })
        
    socket.on("name", data =>{
        onlineusersid.push(socket.id);
        onlineusersname.push(data);
        io.emit("online", onlineusersid.length);
        io.emit("name", onlineusersname);
    })
});

module.exports = socketapi;