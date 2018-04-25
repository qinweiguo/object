var express = require('express');
var router = express.Router();
var db = require("./dbConnect.js");
/**登录页面**/
router.get('/login', function(req, res, next) {
    res.render('login');
});
/***登录校验***/
router.post('/login', function(req, res, next) {
    var data_name = req.body.userName;
    var data_password = req.body.userPassword;
    db.query('select *from login',function(err, rows){
        if (rows[0].userName == data_name && rows[0].userPassword == data_password) {
            res.send(200);
        }else {
            res.send(404);
        }
    });
});

/**查询列表页**/
router.get('/index', function (req, res, next) {
	db.query('select *from user', function (err, rows) {
		if (err) {
            res.render('index', {title: 'Express', datas: []});  
        } else {
        	res.render('index', {title: 'Express', datas: JSON.stringify(rows)});
        }
    })
});

router.post('/index', function(req, res){
    var type = req.body.type;
    var data = "select *from user where type =" + type; 
    console.log(type);
    db.query(data, function(err, rows){
        if(err) {
            res.render('index', {title: 'Express', datas: []});  
        } else{
            res.render('index', {title: 'Express', datas: JSON.stringify(rows)});
            console.log(rows);
        } 
    })
});

/** 新增页**/
router.get('/index/add', function(req, res, next) {
    res.render('add');
});
router.post('/index/add', function (req, res) {
    var name = req.body.name;
    var type = req.body.type;
    var age = req.body.age;
    db.query("insert into user(name,type,age) values('" + name + "','"+type+"','" + age + "')", function (err, rows) {
        if (err){
            res.end('新增失败：' + err);
        }else {
            res.redirect('/index');
        }
    })
});

/** 删除**/
router.get('/index/del/:id', function (req, res) {
    var id = req.params.id;
    db.query("delete from user where id=" + id, function (err, rows) {
        if (err) {
            res.end('删除失败：' + err)
        } else {
            res.redirect('/index')
        }
    });
});

/** 修改**/
router.get('/index/toUpdate/:id', function (req, res) {
    var id = req.params.id;
    db.query("select * from user where id=" + id, function (err, rows) {
        if (err) {
            res.end('修改页面跳转失败：' + err);
        } else {
            res.render('update', {datas: JSON.stringify(rows)});   //直接跳转
        }
    });
});
router.post('/index/update', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var type = req.body.type;
    var age = req.body.age;
    console.log(id);
    db.query("update user set name='" + name + "',type='" + type + "',age='" + age + "' where id=" + id, function (err, rows) {
        if (err) {
            res.end('修改失败：' + err);
        } else {
            res.redirect('/index');
        }
    });
});


module.exports = router;
