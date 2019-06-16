let express = require('express')
let bodyParser = require('body-parser')

app = express()

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

app.use('/public', express.static('public'))
app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res){
  res.render('index.html', {
    dataList: comments
  })
})

app.get('/post', function(req, res){
  res.render('addpage.html')
})

//res.query只能获取get请求的数据
app.post('/post', function(req, res){
  let comment = req.body
  //console.log(comment)
  if(comment.name === '' || comment.message === ''){
    res.redirect('/')
  }
  else{
    comment.date = '2019-6-6'
    comments.push(comment)
    res.redirect('/')
  }
})

// app.get('/addMeg', function(req, res){
//   //console.log(req.query)
//   let comment = req.query
//   comment.date = '2019-6-6'
//   comments.push(comment)
//   res.redirect('/')
// })

app.listen(3000, function(){
  console.log('running...')
})