var express = require("express");
var app = express();
const port = process.env.PORT || 1402;
app.listen(port,function (err) {
    console.log("server is running...");
})
app.use(express.static("public"));
app.set("view engine","ejs");


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
