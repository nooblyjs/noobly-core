"use strict";
var mysql = require('mysql');

'use strict';

/**
 * Notifying Manager class
 */
module.exports = function(parameters) {
    
    /** Initiate the object */
    var _controller = {};
   
    return _controller;
};




var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pa55w0rd"
});

var con2 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pa55w0rd",
  database: "shnakkyddodle"
});

/**
 *  Create a database
 *  @param con : The connection string
 *  @param dbname : The database name
 */
async function createDatabase (con, dbname){
    return new Promise(
        (resolve, reject) => {
        
        con.connect(function(err) {
            if (err) throw err;
            con.query("CREATE DATABASE IF NOT EXISTS " + dbname, function (err, result) {
                if (err) throw err;
                resolve("Database created : " + dbname);
            })
        })
    })
};

/**
 *  Delete a database
 *  @param con : The connection string
 *  @param dbname : The database name
 */
async function dropDatabase (con, dbname){
    return new Promise(
        (resolve, reject) => {
        con.query("DROP DATABASE IF EXISTS " + dbname, function (err, result) {
            if (err) throw err;
            resolve("Database deleted : " + dbname);
        })
    })
};

async function createTable (con, sql){
     return new Promise(
        (resolve, reject) => {
         con.query(sql, function (err, result) {
            if (err) throw err;
            resolve("Table Created : " + sql);
          });
    })
}

async function insertData (con, sql, tabledata){
    return new Promise(
        (resolve, reject) => {
         con.query(sql,tabledata, function (err, result) {
            if (err) throw err;
                resolve("Data Loaded : " + sql);
        });
    })
}

async function selectData (con, sql){
    return new Promise(
        (resolve, reject) => {
         con.query(sql, function (err, result) {
           if (err) throw err;
            resolve(result);
        });
    })
}


(async () => {
    var database = "MyTestdatabase"
    
    // create the database
    console.log(await createDatabase(con, database));

    // create the connection
    var con2 = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Pa55w0rd",
      database: database
    });
    
    // create table
    console.log(await createTable (con2, "CREATE TABLE IF NOT EXISTS customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))"));
    var values = [
                ['John', 'Highway 71'],
                ['Peter', 'Lowstreet 4'],
                ['Amy', 'Apple st 652'],
                ['Hannah', 'Mountain 21'],
                ['Michael', 'Valley 345'],
                ['Sandy', 'Ocean blvd 2'],
                ['Betty', 'Green Grass 1'],
                ['Richard', 'Sky st 331'],
                ['Susan', 'One way 98'],
                ['Vicky', 'Yellow Garden 2'],
                ['Ben', 'Park Lane 38'],
                ['William', 'Central st 954'],
                ['Chuck', 'Main Road 989'],
                ['Viola', 'Sideway 1633']
              ];

    console.log(await insertData (con2,"INSERT INTO customers (name, address) VALUES ?",[values]));
    console.log(await selectData(con2 , "SELECT * FROM customers"));
    console.log(await dropDatabase(con, database));

})();

