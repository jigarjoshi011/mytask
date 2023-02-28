const express = require('express');
const conn = require('./connection/connectDB')
const bodyParser = require('body-parser')


const app = express();

const port = 5003;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set("view engine", "ejs")


app.get('/', (req, res) => {

    let get_users = `SELECT * FROM Job_application.Task;`
    conn.query(get_users, (err, ans) => {
        if (err) console.log(err.message);
        else {

            // console.log(ans);
        }
        res.render('new', { ans })
    })



})

app.post('/save', (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body);
    const { data } = req.body
    // console.log(data);
    // let id = data[0];
    let fname = data[1];
    let lname = data[2];
    let city = data[3]
    let ac_no = data[4];
    let addr = data[5];

    let inser_que = `Insert INTO Task(fname,lname,city,account_no,addhar_no) values ('${fname}','${lname}','${city}','${ac_no}','${addr}') `
    // console.log(inser_que);
    conn.query(inser_que, (err, ans) => {
        if (err) return console.log(err.message);
        res.json({ ans })
    })
})


app.get('/getId', (req, res) => {
    let que = `Select * from Task order by id DESC limit 1;`
    conn.query(que, (err, ans) => {
        if (err) console.log(err.message);
        else {
            console.log(ans);
            res.json({ ans })
        }
    })
})
app.post('/update/:id', (req, res) => {
    const { data } = req.body;
    let id = data[0];
    let fname = data[1];
    let lname = data[2];
    let city = data[3]
    let ac_no = data[4];
    let addr = data[5];
    let up_que = `Update Task set fname = '${fname}',lname ='${lname}',city='${city}',account_no='${ac_no}',addhar_no ='${addr}' where id=${id}`
    console.log(up_que);
    conn.query(up_que, (err, ans) => {
        if (err) return console.log(err.message);
        res.json({ ans })
    })
})



app.post('/saveall', (req, res) => {
    const { data } = req.body
    console.log(data);

    for (let i = 0; i < data.length; i++) {

        var id = data[i][0];
 
        var fname = data[i][1];
       
        var lname = data[i][2];
  
        var city = data[i][3];
   
        var acc_no = data[i][4];

        var addr = data[i][5];
       
       console.log(id,fname,lname,city ,acc_no,addr);
        
       let inser_que = `Insert INTO Task(fname,lname,city,account_no,addhar_no) values ('${fname}','${lname}','${city}','${acc_no}','${addr}');`
       conn.query(inser_que, (err, ans) => {
        if (err) return console.log(err.message);
    })
    res.json({ ans })
    }


    
})

// let Insert_data = ``
// conn.query(Insert_data,(err,ans)=>{

// })

app.listen(port, () => { console.log(`Service Activated at ${port}`); })