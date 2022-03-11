var express = require("express");
var app = express();
const port = process.env.PORT || 1402;
app.listen(port,function (err) {
    console.log("server is running...");
})
app.use(express.static("public"));
app.set("view engine","ejs");
var mssql = require("mssql/msnodesqlv8");
var config = {
    port: 1433,
    server: "118.70.125.210",
    user: "sa",
    password: "z@GH7ytQ",
    database: "Nhom03",
    driver: "msnodesqlv8",
    stream: false,
    options:{

    },

}
mssql.connect(config,function (err){
    if(err) console.log(err);
    else console.log("connected database....")
});

var sql = new mssql.Request();
app.get("/",function (req, res) {
    res.render("homepage");
})
app.get("/contacts",function (req, res) {
    res.render("contacts");
})
app.get("/shop",function (req, res) {
    var param =req.query.NameProduct;
    var sql_txt ="select * from T2110E_Nhom3_Product where NameProduct like '%"+param+"%';";
    sql.query(sql_txt,function (err,rs){
        if(err) res.send("Errors..");
        else res.render("shop-tung",{
            products:rs.recordset
        });
    });

})
app.get("/detail",function (req, res) {
    res.render("product");
})

app.get("/sp",function (req,res){

})
