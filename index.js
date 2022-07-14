const http = require('http');

const PORT = 3000;

const server = http.createServer();

const friends = [
    { 
      id: 0 ,
      name: 'Nikola Tesla'
    },
    { 
      id: 1 ,
      name: 'Sir Isaac Netwon'
    },
    { 
      id: 2 ,
      name: 'Albert Einstein'
    }
]
// fetch("http://localhost:3000/friends", {method: 'POST', 
// body: JSON.stringify({id:5, name:"Grace Hopper"})}).
// then((response) => response.json()).
// then((friend)=>console.log(friend))
server.on('request',((req, res) => {
    const items = req.url.split('/');
    if (req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
          const friend = data.toString();
          console.log("data: ", friend);
          friends.push(JSON.parse(friend));
        }
       );
       req.pipe(res);
    }else if(req.method === 'GET' && items[1] === 'friends') {
      //http://localhost:3000/friends/2
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       if (items.length === 3)
         res.end(JSON.stringify(friends[Number(items[2])]));
       else
         res.end(JSON.stringify(friends));
    } else if (req.method === 'GET' && items[1] === 'messages') {
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>HI Isaac !</li>');
        res.write('<li>What are your thoughts on astronomy? </li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else {
       res.statusCode = 404;
       res.end();
    }
}));

server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT} ....`);
}) //127.0.0.1