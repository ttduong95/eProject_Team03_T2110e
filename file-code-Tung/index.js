var express = require("express"); //require dung de goi thu vien
var app = express();
const port = 1402;
app.listen(port, function (err){
    console.log("server is running...");
})
//cho quyen truy cap toan bo ca file tinh (static file): css jquery.js, images...
app.use(express.static("public"));

//khai bao su dung view engine la ejs
app.set("view engine","ejs");

//them routing
// var mssql=require("mssql");
// var config = {
//     server:"118.70.125.210",
//     user:"sa",
//     password:"z@GH7ytQ",
//     database:"",
//     stream:"false",
//     port:1433,
//     options: {
//         trustedConnection: true,
//         encrypt:true,
//         enableArithAbort: true,
//         trustServerCertificate: true,
//     },
// }
// mssql.connect(config,function(err){
//     if(err) console.log(err);
//     else console.log("connected database...");
// });
// var sql=new mssql.Request();
//
// app.get("/api",function(req,res){
//     var sql_txt = "select * from ;";
//     sql.query(sql_txt,function(err,rs){
//         if(err) res.send("Errors...");
//         else res.render("DEMO",{
//             product:rs.recordset
//         });
//     });
// });
var count = 0;

app.get("/tin-tuc", function(req,res){
    count++;
    res.send("Breaking news"+count);
})
app.get("/tin-tuc2", function(req,res){
    count++;
    res.render("DEMO",{ //tra lai gia tri ben giao dien
     xyz: count
    });
})
app.get("/product",function(req,res){
    res.render("product",{

    })
})
