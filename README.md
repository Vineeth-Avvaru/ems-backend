## Prerequisites
You need to have Node & Mysql installed in you local system. <br/>
To install [Node](https://nodejs.org/en/download/).<br/>
To install [MySql](https://www.youtube.com/watch?v=WuBcTJnIuzo)

## About
Creates the Tables in your MYSQL database and used those tables to save/fetch/update/add required data. 

## Initial Setup
Initialize your own mySql credentials in the following part of the **server.js**<br/>
```js
var connection = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password : 'password',
});
```

#### `npm install`

Installs all the dependencies for the project.<br/>
If it throws an error. Run it again and that should work

#### `npm start`
Creates the required database connection, ems database, tables and Starts the server.<br/>
Inserts the data in *dummyData* folder to Admins & Employees Tables. <br/>
- Initial Admins Table <br/>

| ID  | Name  | Password |
|-----|-------|----------|
| A01 | Dana  | White    |
| A02 | Shane | Black    |

- Initial Employees Table <br/>

| ID  | Name  | Password  | Role            | Description   |
|-----|-------|-----------|-----------------|---------------|
| E01 | Okada | Kazuchika | Lead Fighter    | He Fights     |
| E02 | Kenny | Omega     | Lead Challenger | He Challenges |

Once the Initial data is created, stop the server and comment the lines 64-74 in **server.js** so that the dummy data wont be added to the db everytime server is run<br/> 
```js
// const insertAdminData_query = 'INSERT INTO Admins(ID, Name, Password) VALUES ?'  

// connection.query(insertAdminData_query, [adminData], function(err) {
//     if(err) console.log('error', err);
// });

// const insertEmployeeData_query = 'INSERT INTO Employees VALUES ?'  

// connection.query(insertEmployeeData_query, [employeeData], function(err) {
//     if(err) console.log('error', err);
// });
```
Run the server again with *npm install*

## API's
Please refer to API Specification Document.
