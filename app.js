const http = require('http');
const server = http.createServer((req,res) => {
    console.log(res)
});
server.listen(3000);