var express = require('express');
var router = express.Router();
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var fs = require('fs');
// var mongo = require("mongoose");  
var connection = require('../connection.js');

router.post('/requestAccess', function (req, res) {
    req.reqfrom;
    req.reqto;
    var data = {r_by:req.body.reqfrom.u_id,r_to:req.body.reqto.u_id,r_timestamp:new Date(),r_status:'requested'};
    var data_new = {r_by:req.body.reqfrom.u_id,r_to:req.body.reqto.u_id,r_timestamp:new Date(),r_status:'requested'};
    connection.query("SELECT * FROM request WHERE  r_by = ? AND r_to=? ",[data_new.r_by,data_new.r_to],function(err,result){
        if(err){throw err;}
        if(result.length>0)
        {
            connection.query("UPDATE request SET r_status = 'requested' WHERE r_by = ? AND r_to=? ",[data_new.r_by,data_new.r_to],function(err,result){
                if(err){throw err;}
                res.send({status:true,message:"Request sent successfully"});
            });
        }
        else{
            connection.query("INSERT INTO request SET ?",data,function(err,result){
                if(err){throw err;}
                res.send({status:true,message:"Request sent successfully"});
            });
        }
        // res.send({status:true,message:"Request sent successfully"});
    });

   
});

router.post('/cancelRequest', function (req, res) {
    req.reqfrom;
    req.reqto;
    var data = {r_by:req.body.reqfrom.u_id,r_to:req.body.reqto.u_id,r_timestamp:new Date(),r_status:'cancelled'};
    console.log("cancelling here :- ",data);
    connection.query("UPDATE request SET r_status = 'cancelled' WHERE r_by = ? AND r_to=? ",[data.r_by,data.r_to],function(err,result){
        if(err){throw err;}
        console.log("query result : - ",result);
        res.send({status:true,message:"Request sent successfully"});
    });
});


router.post('/acceptRequest', function (req, res) {
    var data = {r_by:req.body.reqfrom.u_id,r_to:req.body.reqto.u_id,r_timestamp:new Date(),r_status:'accepted'};
    console.log("accpeting here :- ",data);
    connection.query("UPDATE request SET r_status = 'accepted' WHERE r_by = ? AND r_to=? ",[data.r_by,data.r_to],function(err,result){
        if(err){throw err;}
        console.log("query result : - ",result);
        res.send({status:true,message:"Request Accepted successfully"});
    });
});

router.post('/rejectRequest', function (req, res) {
    var data = {r_by:req.body.reqfrom.u_id,r_to:req.body.reqto.u_id,r_timestamp:new Date(),r_status:'accepted'};
    console.log("accpeting here :- ",data);
    connection.query("UPDATE request SET r_status = 'declined' WHERE r_by = ? AND r_to=? ",[data.r_by,data.r_to],function(err,result){
        if(err){throw err;}
        console.log("query result : - ",result);
        res.send({status:true,message:"Request Accepted successfully"});
    });
});





module.exports = router;