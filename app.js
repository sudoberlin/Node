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
        // on allows us to listen to events in this case -data
        const body = [];
        req.on('data',(chunk) =>{
            console.log(chunk);
            body.push(chunk);
        });

        // end listener
        req.on('end',() => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(parsedBody)
            //sync - method will block the program until it finishes - not a prefarable method
            // use async which wont block or we can use writefile with adding error handling
            fs.writeFileSync('message.txt',message, err => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end(); 
            });
        });
    }

    //console.log(res)
    res.setHeader('Content-Type','text/html');
    res.write('<html><body><h1>hello from NodeJS</h1></body></html>');
    res.end();
    //process.exit()
});
server.listen(3000);

