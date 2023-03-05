const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "crafts"
}
)

app.listen(3001, () => {
    console.log("I'm listening on port 3001")
})

app.post('/addNewPost', (req, res) => {
    db.query("INSERT INTO crafts ( title, description, information) VALUES (?,?, ?)",[req.body.title,req.body.description,req.body.information],
    (err, result) => {
        if(result){
        res.send(true)}
        if(err)
        res.send(err)
    })
})

app.put('/editPostById', (req,res) => {
    db.query("UPDATE `crafts` SET `title`=?, `description`=?,`information`=? WHERE id = ?",[req.body.title,req.body.description,req.body.information,req.body.ids],
    (err, result) => {
        if(result)
            res.send(true)
        if(err)
        res.send(err)
    })
})

app.get('/allPost', (req, res) => {	
    db.query("SELECT * FROM crafts",
    (err, result) => {
        if(err){
            res.send({ err:err});
        }
        if(res.length === 0) {
            res.send("nincs eredmény");
        }
        res.send(result)
    })
})

app.get('/getPostId/:ids', (req, res) => {	
    const {ids} = req.params;
    db.query("SELECT * FROM crafts WHERE id = ?",[ids],
    (err, result) => {
        if(err){
            res.send({ err:err});
        }
        if(res.length === 0) {
            res.send("error");
        }
        res.send(result);
    })
})