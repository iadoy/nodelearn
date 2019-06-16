let express = require('express')
let bodyParser = require('body-parser')
let router = require('./router')
let app = express()

app.engine('html', require('express-art-template'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public/', express.static('./public'))

app.use(router)

app.listen(3000, function(){
  console.log('running...')
})