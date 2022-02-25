var express = require("express");
var app = express();
const port = 1402;
app.listen(port,function (err) {
    console.log("server is running...");
})
app.use(express.static("public"));// cho quyền truy cập toàn bộ các file tĩnh bên trong thư mục public
app.use(express.static("imge"));
app.get("/",function (req, res) {
    res.sendFile(__dirname+"/views/homepage.html");
})