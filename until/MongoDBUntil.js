var dburl = require("../config").mangodbs;//数据库地址
var mongoose = require('mongoose'), Admin = mongoose.mongo.Admin;
var connections = {};
var Schema = mongoose.Schema,ObjectId = Schema.ObjectId;

var db = mongoose.connect(dburl);

exports.disconnect = function (callback) {
    mongoose.disconnect(callback);
};

exports.setup = function (callback) {
    callback(null);
};

//定义对象模型
var UsersScheme = new Schema({name: String, age: String, address: String});

//访问对象模型
db.model('Users', UsersScheme);
var Users = db.model('Users');
//exports.emptyNote = { "_id": "", author: "", note: "" };

exports.add = function (name, age, address, callback) {
    var newUsers = new Users();
    newUsers.name = name;
    newUsers.age = age;
    newUsers.address = address;
    newUsers.save(function (err) {
        if (err) {
            console.log("FATAL" + err);
            callback(err);
        } else {
            callback(null);
        }
    });

};

exports.delete = function (name, callback) {
    Users.findOne({name: name}, function (err, doc) {
        if (err) {
            console.log(err);
        }
        doc.remove();
        callback(null);
    });
};

exports.editData = function (id,name, age, address, callback) {
    Users.update({_id:id},{$set:{name:name,age:age,address:address}}, function (err, doc) {
        if (err) {
            console.log(err)
            callback(err)
        }
        callback(null)
    });
};
exports.editFinished = function (id, name, age, address, finished, callback) {
    doc.update({id: id}, {name: name, age: age, address: address}, options, function (err, doc) {
        if (err) {
            console.log(err)
        }
        console.log(doc)
    });

};

exports.allUsers = function (page,rows,callback) {
    var start=(page-1)* rows;
    Users.find.skip(start).limit(rows).exec(function(err,doc){
        if(err){
            console.log(err)
        }
        callback(doc);
    });
};

exports.forAll = function (doEach, done) {
    Users.find({}, function (err, docs) {
        if (err) {
            util.log('FATAL ' + err);
            done(err, null);
        }
        docs.forEach(function (doc) {
            doEach(null, doc);
        });
        done(null);
    });
};