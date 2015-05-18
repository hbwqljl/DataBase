/**
 * Created by lee on 2015/5/15.
 */
var muntil = require("./until/MongoDBUntil.js");

muntil.findUsersById('5555a921c12dbdec1c588482',function(err,doc){
    if(err){
        console.log(err)
    }
    console.log(doc)
})