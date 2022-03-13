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
    var param =req.query.AllProduct;
    var sql_name ="select * from T2110E_Nhom3_Product where NameProduct like '%"+param+"%';"+
    "select * from T2110E_Nhom3_Product order by NameProduct desc;"+
    "select * from T2110E_Nhom3_Product order by Price desc;" +
    "select * from T2110E_Nhom3_Product where Color1 like '%"+param+"%';";

    sql.query(sql_name,function (err,rs){
        if(err) res.send("Errors..");
        else{
           res.render("shop-tung",{
           products:rs.recordsets[0],
               size:rs.recordsets[2],
               color:rs.recordsets[3],
           });
        }
    });
})
app.get("/product",function (req, res) {
    var param = req.query.id;
    var sql_txt ="select * from T2110E_Nhom3_Product where ID = "+param+";";
    sql.query(sql_txt,function (err, rs) {
        if(err) res.send("Errors..");
        else if(rs.recordset.length ==0){
            res.send("Không tìm thấy sản phẩm nào hết");
        }else{
            res.render("product",{
                product:rs.recordset[0]
            })
        }
    })
})
app.get("/color",function (req, res) {
    var param = req.query.color1;
    var sql_txt = "select * from T2110E_Nhom3_Product where Color1 like '%"+param+"%';";
    sql.query(sql_txt,function (err,rs){
        if(err) res.send("Errors..");
        else res.render("color",{
            colors:rs.recordset,
        });
    })
})
