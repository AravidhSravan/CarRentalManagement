const mysql = require("mysql");
const express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.json())

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "mysql123",
    database: "cardb"
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connection Established");
    }
    else {
        console.log("Connection not Established" + JSON.stringify(err, undefined, 2));
    }
})

app.listen(3003, () => console.log("server up and running"));

app.get('/getcar', (req, res) => {
    mysqlConnection.query('SELECT * FROM cartable', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log("DATA PRESENT");
        }
        else {
            console.log("No data")
        }
    })
});

app.get('/getcar/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM cartable where carId = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log("DATA PRESENT");
        }
        else {
            console.log("No data")
        }
    })
});

app.delete('/deletecar/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM cartable where carId = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send('Record Deleted');
            console.log("Record Deleted");
        }
        else {
            console.log("No data")
        }
    })
});


app.post('/savecar', (req, res) => {
    var postData = req.body;
    mysqlConnection.query('INSERT INTO cartable SET ?', postData, (err, result, fields) => {
        if (!err) {
            res.send(JSON.stringify(result));
            console.log("Record saved");
        }
        else {
            console.log("No data")
        }
    })
});


app.put('/editcar', (req, res) => {
    var postData = req.body;
    mysqlConnection.query('UPDATE cartable SET ? where `carId`=?', [postData, req.body.carId], (err, result, fields) => {
        if (!err) {
            res.send(JSON.stringify(result));
            console.log("Record updated")
        }
        else {
            console.log("No data")
        }
    })
});