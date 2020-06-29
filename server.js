const adminData = require("./dummyData/adminData").adminData;
const employeeData = require("./dummyData/employeeData").employeeData;


const express = require('express')
const app = express();
const port = 5000;
const mysql = require('mysql');
const fetch = require('node-fetch');

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
    next();
});

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

var connection = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password : 'password',
});

connection.connect((err)=> {
    if(err) throw err;
})                                                                  

var createdb_query = 'CREATE DATABASE IF NOT EXISTS EMS'
connection.query(createdb_query, (err, result)=>{
    if(err) console.log('error', err);
})                                                                     

var usedb_query = 'USE EMS'

connection.query(usedb_query, (err, result) =>{
    if(err) console.log('error', err);
})                                                   

const adminTable_query = 'CREATE TABLE IF NOT EXISTS Admins(ID varchar(25), Name varchar(25), Password varchar(25))'
connection.query(adminTable_query,(err, result)=>{
    if(err) console.log('error', err);
})

const employeeTable_query = 'CREATE TABLE IF NOT EXISTS Employees(ID varchar(25), Name varchar(25), Password varchar(25), Role varchar(25), Description varchar(100))'
connection.query(employeeTable_query,(err, result)=>{
    if(err) console.log('error', err);
})

const reviewTable_query = 'CREATE TABLE IF NOT EXISTS Reviews(givenBy varchar(25), givenTo varchar(25), review varchar(250))';
connection.query(reviewTable_query,(err, result)=>{
    if(err) console.log('error', err);
})

const feedbackTable_query = 'CREATE TABLE IF NOT EXISTS Feedbacks(givenBy varchar(25), givenTo varchar(25), feedback varchar(250))';
connection.query(feedbackTable_query,(err, result)=>{
    if(err) console.log('error', err);
})


const insertAdminData_query = 'INSERT INTO Admins(ID, Name, Password) VALUES ?'  

connection.query(insertAdminData_query, [adminData], function(err) {
    if(err) console.log('error', err);
});

const insertEmployeeData_query = 'INSERT INTO Employees VALUES ?'  

connection.query(insertEmployeeData_query, [employeeData], function(err) {
    if(err) console.log('error', err);
});

app.post("/login", (req, res)=> {

    let response = {
        name: "",
        isUserAuthentic : false
    }
    if(req.body.role === "Admin") {
        const authenticateAdmin = 'SELECT Name FROM Admins WHERE ID = ? AND Password = ?'
        connection.query(authenticateAdmin, [req.body.id, req.body.password], (err, result)=> {
            if(err) console.log('error', err);
            if(result.length != 0) {
                response.name = result[0].Name,
                response.isUserAuthentic = true;
            }  
            else response.isUserAuthentic = false
            res.send(response);
        })
    }
    else {
        const authenticateEmployee = 'SELECT Name FROM Employees WHERE ID = ? AND Password = ?'
        connection.query(authenticateEmployee, [req.body.id, req.body.password], (err, result)=> {
            if(err) console.log('error', err);
            if(result.length != 0) {
                response.name = result[0].Name,
                response.isUserAuthentic = true;
            } 
            else response.isUserAuthentic = false
            res.send(response);
        })
    }
})

app.get("/fetchEmployees", (req, res)=> {

    let response = {
        employeesData : []
    }
    const fetchEmployeesData = 'SELECT ID, Name, Role, Description FROM Employees';
    connection.query(fetchEmployeesData, (err, result)=> {
        if(err) console.log('error', err);
        response.employeesData = result;
        res.send(response);
    })
})

app.put("/addEmployee", (req, res) => {

    let employee = [
        [req.body.id, req.body.name, req.body.password, req.body.role, req.body.description]
    ];

    const insertEmployee = `INSERT INTO Employees VALUES ?`;
    connection.query(insertEmployee, [employee], function (err, result) {
        if (err) throw err;
        res.send({
            message: 'Employee Added'
        })
      });
})

app.delete("/deleteEmployee", (req, res)=> {

    const deleteEmployee = `DELETE FROM Employees WHERE ID = ? `;

    connection.query(deleteEmployee,[req.body.id], function (err, result) {
        if (err) throw err;
        res.send({
            message: 'Employee Removed'
        })
      });
})

app.patch("/updateEmployee", (req, res) => {
    const updateEmployee = 'UPDATE Employees SET Role = ?, Description = ? WHERE ID = ?';

    connection.query(updateEmployee,[req.body.role, req.body.description, req.body.id], function (err, result) {
        if (err) throw err;
        res.send({
            message: `${req.body.id} Updated`
        })
      });
})

app.post("/fetchEmployeeByID", (req, res) => {

    const fetchEmployeeByID = 'SELECT * FROM Employees WHERE ID = ?';

    connection.query(fetchEmployeeByID,[req.body.id], function (err, result) {
        if (err) throw err;
        res.send(result[0]);
      });

})

app.put("/addReview", (req, res) => {
    let review = [
        [req.body.givenBy, req.body.givenTo, req.body.review]
    ];

    const insertReview = `INSERT INTO Reviews VALUES ?`;
    connection.query(insertReview, [review], function (err, result) {
        if (err) throw err;
        res.send({
            message: 'Review Added'
        })
      });
})

app.patch("/updateReview", (req, res) => {
    const updateReview = 'UPDATE Reviews SET review = ? WHERE givenBy = ? AND givenTo = ?';

    connection.query(updateReview,[req.body.review, req.body.givenBy, req.body.givenTo], function (err, result) {
        if (err) throw err;
        res.send({
            message: 'Review Updated'
        })
      });
})

app.post("/fetchReview", (req, res) => {
    const fetchReview = 'SELECT review FROM Reviews WHERE givenBy = ? AND givenTo = ?';

    connection.query(fetchReview,[req.body.givenBy, req.body.givenTo], function (err, result) {
        if (err) throw err;
        if(result.length!== 0) res.send(result[0]);
        else res.send({
            review: "null"
        })
      });
})

app.post("/fetchEmpReviews", (req, res) => {
    let response = {
        reviewsData : []
    }
    const fetchEmpReviews = 'SELECT * FROM Reviews WHERE givenTo = ?';

    connection.query(fetchEmpReviews,[req.body.eID], function (err, result) {
        if (err) throw err;
        response.reviewsData = result;
        res.send(response);
      });
})

app.put("/addFeedback", (req, res) => {
    let feedback = [
        [req.body.givenBy, req.body.givenTo, req.body.feedback]
    ];

    const insertFeedback = `INSERT INTO Feedbacks VALUES ?`;
    connection.query(insertFeedback, [feedback], function (err, result) {
        if (err) throw err;
        res.send({
            message: 'Feedback Added'
        })
      });
})

app.patch("/updateFeedback", (req, res) => {
    const updateFeedback = 'UPDATE Feedbacks SET feedback = ? WHERE givenBy = ? AND givenTo = ?';

    connection.query(updateFeedback,[req.body.feedback, req.body.givenBy, req.body.givenTo], function (err, result) {
        if (err) throw err;
        res.send({
            message: 'Feedback Updated'
        })
      });
})

app.post("/fetchFeedback", (req, res) => {
    const fetchFeedback = 'SELECT feedback FROM Feedbacks WHERE givenBy = ? AND givenTo = ?';

    connection.query(fetchFeedback,[req.body.givenBy, req.body.givenTo], function (err, result) {
        if (err) throw err;
        if(result.length!== 0) res.send(result[0]);
        else res.send({
            feedback: "null"
        })
      });
})

app.listen(port, ()=> console.log(`EMS listening on port ${port}!`))