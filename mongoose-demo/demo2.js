const mongoose = require('mongoose')
let Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/test')

let userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

let user = mongoose.model('User', userSchema);

//******************************************************************************* 
//添加记录
/* ****************************************************************************** */

// let admin = new user({
//   name: 'zs',
//   password: '123456',
//   email: 'admin@admin.com'
// })

// admin.save(function(err){
//   if(err){
//     console.log('failed')
//   }
//   console.log('succeed')
// })

/********************************************************************************* */
//删除
/********************************************************************************** */
// user.deleteMany({
//   name: 'zs'
// }, function(err){
//   if(err){
//     console.log(err)
//   }
// })


/********************************************************************************** */
//更新
/**************************************************************************************** */
user.findByIdAndUpdate('5d077f694fcc150520dd987b', {
  password: '******'
}, function(err){
  if(err){
    console('失败')
  }
  console.log('成功')
})



//******************************************************************** */
//查询记录
/********************************************************************** */

//查找全部
// user.find(function(err, data){
//   if(err){
//     console.log('failed')
//   }
//   console.log(data)
// })

//条件查找
// user.find({
//   name: 'zs'
// },function(err, data){
//   if(err){
//     console.log('failed')
//   }
//   console.log(data)
// })

//查找匹配的第一个记录
//user.findOne()
