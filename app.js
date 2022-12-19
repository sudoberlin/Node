const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res) => {
    // redirection 
    // it will try to execute the if statement first.
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.write ('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method = "POST"><input type = "text" name="message"><button type="submit">send</button></form></body>')
        res.write('</html>');
        return res.end()
    }
    if (url === '/message' && method === 'POST'){
        // listens to events in this case -data
        const body = [];
        req.on('data',(chunk) =>{
            console.log(chunk);
            body.push(chunk);
        })
        fs.writeFileSync('message.txt','DUMMY');
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    }



    //console.log(res)
    res.setHeader('Content-Type','text/html');
    res.write('<html><body><h1>hello from NodeJS</h1></body></html>');
    res.end();
    //process.exit()
});
server.listen(3000);

