
var express = require('express');
var router = express.Router();
var connection = require('../connection.js');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var fs = require('fs');

router.post('/uploadfile', multipartyMiddleware, function (req, res) {
    
var date = new Date();
// console.log(date.getTime());
var arr = req.files.file.originalFilename.split('.');
arr[arr.length-1];
if(arr[arr.length-1]!='txt')
{
    res.send({ status: false, message: 'Only Text Files Allowd to be uploaded ....!' });
    return;
}
var file_name=arr[0]+'_'+date.getTime()+'_.'+arr[arr.length-1];
    var file = req.files.file;

    var copy = fs.createReadStream(file.path).pipe(fs.createWriteStream('./public/upload/' + file_name));
    copy.on("close", function (ex) {
        req.body.user.u_id;
        req.body.filetitle;
        var data = {
            f_file: file_name,
            f_user: req.body.user.u_id,
            f_title: req.body.filetitle,
            f_datetime: new Date()
        };
        console.log(data);
        connection.query('INSERT INTO files SET ? ', data, function (err, result) {
            if (err) { throw err; }
            res.send({ status: true, message: 'File upload done' });
        });
    });
});

router.post('/getownfiles', function (req, res) {
    connection.query('SELECT * FROM files WHERE f_user= ? order by f_id DESC', req.body.user.u_id, function (err, result) {
        if (err) { throw err; }
        res.send({ status: true, message: 'Data fetched successfully',files:result });
    });
});

router.post('/deleteFile', function (req, res) {
    // console.log("SELECT * FROM files WHERE  f_id=  "+req.body.id);
    connection.query('SELECT * FROM files WHERE  f_id= ? ', req.body.id, function (err, result) {
        if (err) { throw err; }
        // res.send({ status: true, message: 'Data fetched successfully',files:result });
        fs.unlink('./public/upload/'+result[0].f_file);
        connection.query('DELETE FROM files WHERE f_id= ?  ', req.body.id, function (err, result) {
            if (err) { throw err; }
            res.send({ status: true, message: 'Data Deleted successfully'});
        });
    });
   
});

router.post('/searchFile',function(req, res){
    if(req.body.user.u_user_type=='Owner')
    {
        var query = 'SELECT * FROM files WHERE f_user='+req.body.user.u_id;
    }
    if(req.body.user.u_user_type=='User')
    {
        var query = 'SELECT  * FROM request LEFT JOIN files ON request.r_to = files.f_user WHERE r_by='+req.body.user.u_id+' and r_status="accepted" ';
    }
    // connection.query('SELECT * FROM files WHERE f_user= ? ', req.body.user.u_id, function (err, result) {
        connection.query(query, function (err, result) {
        if(err){throw err;}
        console.log("Result :- ",result);
var i=0;
var contentArray=[];

        // while(result.length>i)
        if(result[i].f_file!=null)
        {
            next(i);
        }
        else{
            res.send({status:false,message:'No Content Found'});
        }
        
        function next(i)
        {
            if(result.length<=i)
            {
                return;
            }
            fs.readFile('./public/upload/'+result[i].f_file,'utf8', function(err, data) {
                if(err){throw err;}
                
                if(data.indexOf(req.body.searchKey)!=-1)
                {
                    contentArray.push({fileArray:result[i],search:data.substring(data.indexOf(req.body.searchKey)-10,data.indexOf(req.body.searchKey)+50)});
                }
                // console.log(result.length);
                console.log(result.length,i+1);
                if(result.length==i+1)
                {
                    res.send({status:true,data:contentArray,message:'Contents searched Properly'});
                }
                i++;
                next(i);
            });
        }
        if(result.length<1)
        {
            res.send({status:false,message:'No Content Found'});
        }
        
    });
})
module.exports = router;
