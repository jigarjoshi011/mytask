const express = require('express');
const conn = require('./connection/connectDB')
const bodyParser = require('body-parser')


const app = express();

const port = 5003;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set("view engine", "ejs")


app.get('/',(req,res)=>{

    let get_users = `SELECT * FROM Job_application.Task;`
    conn.query(get_users,(err,ans)=>{
        if(err) console.log(err.message);
        else{

            console.log(ans);
        }
        res.render('new',{ans})
    })



})

app.post('/save/:id',(req,res)=>{
    console.log(req.params.id);
console.log(req.body);
})


app.get('/getId',(req,res)=>{
   let que = `Select * from Task order by id DESC limit 1;`
   conn.query(que,(err,ans)=>{
    if(err) console.log(err.message);
    else {
        console.log(ans);
        res.json({ans})
    }
   })
})


// let Insert_data = ``
// conn.query(Insert_data,(err,ans)=>{

// })

app.listen(port, ()=>{console.log(`Service Activated at ${port}`);})