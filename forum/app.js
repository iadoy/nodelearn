let express = require('express')
let router = require('./router')
let bodyParser = require('body-parser')
let session = require('express-session')

let app = express()

app.use('/public/', express.static('./public'))
app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(router)

//未知路径处理
app.use(function(req, res){
    res.render('404.html')
})

//全局错误处理
app.use(function(err, req, res, next){
    res.status(500).json({
        err_code: 500,
        msg: err.message
    })
})

app.listen(3000, function(){
    console.log('running...')
})

