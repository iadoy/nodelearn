let express = require('express')
let User = require('./models/user')
let md5 = require('blueimp-md5')
let router = express.Router()

//******************************************************************** */
//渲染首页
//*********************************************************************** */
router.get('/', function(req, res){
  //console.log(req.session.user)
  res.render('index.html',{
    user: req.session.user
  })
})

//************************************************************************ */
//渲染登录界面
//************************************************************************** */
router.get('/login', function(req, res){
  res.render('login.html')
})

//*************************************************************************** */
//处理登陆操作
//*************************************************************************** */
router.post('/login', function(req, res, next){
  //console.log(req.body)\
  let user = req.body
  User.findOne({
    email: user.email,
    password: md5(md5(user.password))
  }, function(err, data){
    if(err){
      // return res.status(500).json({
      //   err_code: 500,
      //   msg: err.message
      // })
      return next(err)
    }

    if(!data){
      return res.status(200).json({
        err_code: 1,
        msg: 'email of nickname is invalid.'
      })
    }

    //登录成功
    req.session.user = data
    res.status(200).json({
      err_code: 0,
      msg: 'ok.'
    })
  })
})

//*************************************************************************** */
//渲染注册界面
//**************************************************************************** */
router.get('/register', function(req, res){
  res.render('register.html')
})

//********************************************************************************** */
//处理注册操作
//************************************************************************************ */
router.post('/register', function(req, res, next){
  let newUser = req.body
  User.findOne({
    $or: [
      {
        email: newUser.email
      },
      {
        nickname: newUser.nickname
      }
    ]
  }, function(err, data){
    if(err){
      // return res.status(500).json({
      //   //500：服务器错误
      //   err_code: 500,
      //   msg: 'server error'
      // })
      return next(err)
    }
    if(data){
      return res.status(200).json({
        //1：邮箱或用户名已存在
        err_code: 1,
        message: 'Email or nickname aleady exists.'
      })
    }

    newUser.password = md5(md5(newUser.password))

    new User(newUser).save(function(err){
      if(err){
        // return res.status(500).json({
        //   //500：服务器错误
        //   err_code: 500,
        //   msg: 'server error'
        // })
        return next(err)
      }

      req.session.user = newUser

      res.status(200).json({
        //0：正常
        err_code: 0,
        msg: 'ok.'
      })
    })
  })
})

//*************************************************************************** */
//登出操作
//****************************************************************************** */
router.get('/logout', function(req, res){
  //清除session
  req.session.user = null

  res.redirect('/login')
})




module.exports = router