const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const Cat = mongoose.model('Cat', { name: String });

for(let i = 0; i < 30; i++){
  const kitty = new Cat({ name: 'second' + i });
  kitty.save();
}
console.log("done")