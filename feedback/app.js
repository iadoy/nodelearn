let http = require('http')
let fs = require('fs')
let template = require('art-template')
let url = require('url')

let comments = [
  {
    name: '李四1',
    message: '你好',
    date: '2019-6-6',
  },
  {
    name: '李四2',
    message: '你好',
    date: '2019-6-6',
  },
  {
    name: '李四3',
    message: '你好',
    date: '2019-6-6',
  },
  {
    name: '李四4',
    message: '你好',
    date: '2019-6-6',
  }
]

http
  .createServer(function(req, res){
    let urlObj = url.parse(req.url, true)
    //该路径不包含问号之后的内容
    let pathname = urlObj.pathname
    if(pathname === '/'){
      fs.readFile('./views/index.html', function(err, data){
        if(err){
          res.end('404 Not Found')
        }
        else{
          let result = template.render(data.toString(), {
            dataList: comments
          })
          res.end(result)
        }
      })
    }
    else if(pathname === '/post'){
      fs.readFile('./views/addpage.html', function(err, data){
        if(err){
          return res.end('404 Not Found')
        }
        res.end(data)
      })
    }
    else if(pathname === '/addMeg'){
      //console.log('收到表单请求', urlObj.query)
      let comment = urlObj.query
      comment.date = '2019.1.1'
      comments.push(comment)
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
    }
  })
  .listen(3000, function(){
    console.log('running...')
  })
