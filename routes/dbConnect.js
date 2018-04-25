var express = require('express');
var router = express.Router();
//加载mysql模块
var mysql = require('mysql');
//创建连接
var pool = mysql.createPool({     
	host     : 'localhost',       
	user     : 'root',              
	password : 'root',       
	port: '3306',                   
	database: 'test', 
});

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
} 
exports.query = query;