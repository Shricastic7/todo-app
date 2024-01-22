const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const PORT = 3000
const TodoModel = require('./Models/Todo')


app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/todo-app')

app.get('/get', (req, res)=>{
  TodoModel.find()
  .then(result => res.json(result))
  .catch(err=>res.json(err))
  
})

app.put('/update/:id', (req,res)=>{
  const{id} = req.params;
  TodoModel.findByIdAndUpdate({_id:id}, {done: true})
  .then(result => res.json(result))
  .catch(err => res.json(err))

})

app.post('/add', (req, res) => {
  const task = req.body.task;
  console.log("Received task:", task);

  TodoModel.create({
    task: task
  }).then(result => res.json(result))
    .catch(err => {
      console.error("Error adding task:", err);
      res.status(500).send("Internal Server Error!");
    });
});

app.delete('/delete/:id', (req, res)=>{
  const {id} = req.params;
  TodoModel.findByIdAndDelete(id)
  .then(result=>console.log(result))
  .catch(err=> console.log(err))
})



app.listen(PORT, ()=>{
  console.log("Server is running")
})
