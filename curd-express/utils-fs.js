let fs = require('fs')

const dbpath = "./db.json"


//delete
exports.delete = function(id, callback){
  fs.readFile('db.json', function(err, data){
    if(err){
      return callback(err)
    }
    let students = JSON.parse(data).students
    let index = students.findIndex(item => item.id === Number(id))
    students.splice(index, 1)
    fs.writeFile(dbpath, JSON.stringify({students: students}), function(err){
      if(err){
        callback(err)
      }
      callback(null)
    })
  })
}

//change
exports.update = function(student, callback){
  fs.readFile(dbpath,'utf8', function(err, data){
    if(err){
      return callback(err)
    }
    let students = JSON.parse(data).students
    student.id = Number(student.id)
    let stu = students.find(item => item.id === student.id)
    for(let key in student){
      stu[key] = student[key]
    }
    fs.writeFile(dbpath, JSON.stringify({students: students}), function(err){
      if(err){
        callback(err)
      }
      callback(null)
    })
  })
}

//find
exports.find = function(callback){
  fs.readFile(dbpath, 'utf8', function(err, data){
    if(err){
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}

exports.findById = function(id, callback){
  fs.readFile(dbpath, 'utf8', function(err, data){
    if(err){
      return callback(err)
    }
    let students = JSON.parse(data).students
    id = Number(id)
    let result = students.find(item => item.id === id)
    callback(null, result)
  })
}

//save
exports.save = function(student, callback){
  fs.readFile(dbpath, function(err, data){
    if(err){
      return callback(err)
    }
    let students = JSON.parse(data).students
    student.id = students[students.length - 1].id + 1
    students.push(student)
    fs.writeFile(dbpath, JSON.stringify({students: students}), function(err){
      if(err){
        callback(err)
      }
      callback(null)
    })
  })
}