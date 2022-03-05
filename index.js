var express = require("express");
var app = express();
const port = 1402;
app.listen(port,function (err) {
    console.log("server is running...");
})
app.use(express.static("public"));// cho quyền truy cập toàn bộ các file tĩnh bên trong thư mục public
app.use(express.static("imge"));
app.set("view engine","ejs");
var mssql = require("mssql");
var config = {
    server: "118.70.125.210",
    user:"sa",
    password:"z@GH7ytQ",
    database:"QuangHoa",
    stream: false,
    port:1433,
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    },
}
mssql.connect(config,function (err){
    if(err) console.log(err);
    else console.log("connected database..");
});
var sql = new mssql.Request();
app.get("/",function (req, res) {
    res.render("homepage");
})