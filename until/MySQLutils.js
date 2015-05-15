/**
 * Created by lee on 2015/5/14.
 */
var mysql=require('mysql');
var config = require('../config');
exports.client = mysql.createConnection({
    host:config.host,
    user: config.user, //数据库用户名
    password: config.password, //数据库密码
    database: config.db, //数据库
    port: config.port
});

var CRUD = {
    //新增
    _insert: function (client, insertSQLString, value) {
        client.query(insertSQLString, value, function (error, results) {
            if (error) {
                console.log("ClientReady Error:" + error.message);
                client.end();
                return;
            } else {
                console.log("Inserted:" + results.affectedRows + " row.");
                console.log("Insert success...");
            }
        });
    },
    //查询
    _select: function (client, selectSQLString,value) {
        client.query(selectSQLString,value, function (error, results, fields) {
            if (error) {
                console.log("GetData Error:" + error.message);
                client.end();
                return;
            }

            if (results.length > 0) {
                var firstResult, resultSet = '[';

                for (var i = 0; i < results.length; i++) {
                    firstResult = results[i];
                    resultSet += "{id:" + firstResult["id"] + ',name:' + firstResult["name"] + ",age:" + firstResult["age"] + ",address"+firstResult["address"] +",}";
                }
                resultSet += "]"
                console.log(resultSet)

            }
        });
    },
    //更新
    _update: function (client, updateSQLString,value) {
        client.query(updateSQLString,value, function (error, results) {
            if (error) {
                console.log("ClientReady Error:" + error.message);
                client.end();
                return;
            }

            console.log("Update success...");
        });
    },
    //删除
    _delete: function (client, deleteSQLString,value) {
        client.query(deleteSQLString,value,function (error, results) {
            if (error) {
                console.log("ClientReady Error:" + error.message);
                client.end();
                return;
            }
            console.log("Delete success...");
        });
    }
};

exports._insert = CRUD._insert;
exports._select = CRUD._select;
exports._update = CRUD._update;
exports._delete = CRUD._delete;
