let http = require('http');
let fs = require('fs')

const server = http.createServer();

server.on('request',function(req, res){
  let url = req.url;
  if(url !== '/'){
    url = './www' + url;
    fs.readFile(url, function(err, data){
      if(err){
        res.end('读取文件失败')
      }
      else{
        res.end(data)
      }
    })
  }
  else{
    res.end('404 Not Found')
  }
})

server.listen(3000, function(){
  console.log('running...');
})