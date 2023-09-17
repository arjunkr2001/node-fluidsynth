var http = require('http');
var fs = require('fs');
const WebSocket = require('ws');
const wsServer = new WebSocket.Server({port:'8081'})
const dgram = require('dgram');
let udpServer //= dgram.createSocket('udp4');

const HTTP_PORT=8080;

//const readline = require("readline");
//const rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout
//});
const {spawn} = require('child_process');
//const __delay__ = t => new Promise(resolve=>setTimeout(()=>resolve(), t))
const ch = spawn('./fl')

//var result=undefined;

//ch.stdout.on("data",(data)=>{
//    result = parseInt(data.toString())
//})

//async 
function fun(num){
    ch.stdin.write(`${num}\n`)
    //while(result==undefined)
      //await __delay__(1)
    //const output = result
    //result = undefined
    //return output
}

// now you could call it like this, it will print 20 to the console
//rl.question("",n=>{
//	fun(n)//.then(r=>console.log(r))
	//process.exit()
//})


fs.readFile('./index.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) { 
        if(request.url==='/'){ 
            response.writeHeader(200, {"Content-Type": "text/html"});  
            response.write(html);  
            response.end();  
        }
        // if(request.url==='/startBtn.png'){
        //     fs.readFile('./startBtn.png',(err,data)=>{
        //         response.setHeader('Content-Type','image/png');
        //         response.end(data);
        //     })
        // }
        
        
    }).listen(HTTP_PORT);
});


wsServer.on('connection',socket=>{
    socket.on('message',msg=>{
        //socket.send(`rog that! ${msg}`)
        console.log(msg.toString())
        if(msg.toString()==="start"){
            udpServer = dgram.createSocket('udp4');

            udpServer.on('message', (message, remote) => {
                // Handle the incoming message.
                console.log(`Received message from ${remote.address}:${remote.port}: ${message}`);
                fun(message.toString())
              
                // Send a response back to the client.
                udpServer.send(Buffer.from('Hello from the server!'), remote.port, remote.address);
              });
              
              udpServer.bind(41234, () => {
                console.log('Server listening on port 41234');
              });
        }
        if(msg.toString()==="stop"){
            udpServer.close()
            socket.send("closed")
        }
    })
})
