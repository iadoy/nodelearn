let express = require('express')
let fs = require('fs')
let utils = require('./utils')
let router = express.Router()

//主页
router.get('/students', function(req, res){
  utils.find(function(err, students){
    if(err){
      return res.status(500).send('failed...')
    }
    res.render('index.html', {
      fruits: [
        'apple',
        'banana',
        'orange'
      ],
      students: students
    })
  })
})

router.get('/students/new', function(req, res){
  res.render('new.html')
})
router.post('/students/new', function(req, res){
  //console.log(req.body)
  new utils(req.body).save(function(err){
    if(err){
      return res.status(500).send('failed')
    }
    res.redirect('/students')
  })
  // utils.save(req.body, function(err){
  //   if(err){
  //     return res.status(500).send('failed')
  //   }
  //   res.redirect('/students')
  // })
})
router.get('/students/edit', function(req, res){
  utils.findById(req.query.id, function(err, student){
    if(err){
      return res.status(500).send('failed...')
    }
    //console.log(student)
    res.render('edit.html',{
      student: student
    })
  })
})
router.post('/students/edit', function(req, res){
  //console.log(req.body)
  utils.findByIdAndUpdate(req.body.id, req.body, function(err){
    if(err){
      return res.status(500).send('failed')
    }
    res.redirect('/students')
  })
})
router.get('/students/delete', function(req, res){
  console.log(req.query)
  utils.findByIdAndDelete(req.query.id, function(err){
    if(err){
      return res.status(500).send('failed')
    }
    res.redirect('/students')
  })
})

// utils.update({
//   name: 'asd',
//   gender: '1',
//   age: '22',
//   hobbies: 'alsfhlakj',
//   id: 1 },function(err){
//     if(err){
//       console.log('失败')
//     }
//     console.log('成功')
//   })

module.exports = router;