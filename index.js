var express = require("express");
var app = express();
const port = 1402;
app.listen(port,function (err) {
    console.log("server is running...");
})
app.use(express.static("public"));// cho quyền truy cập toàn bộ các file tĩnh bên trong thư mục public
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
