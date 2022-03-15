var express = require("express");
var app = express();
const port = process.env.PORT || 1402;
app.listen(port,function (err) {
    console.log("server is running...");
})
app.use(express.static("public"));
app.set("view engine","ejs");
var mysql=require('mysql');
var db_config = {
    host:'remotemysql.com',
    user:'kA3SOoSF6H',
    password:'Z6dM0YmYuI',
    database:'kA3SOoSF6H',
    port:3306,
    stream:false,
    options: {

    }
};
var conn;
function handleDisconnect() {
    conn = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.
    // the old one cannot be reused.

    conn.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }// to avoid a hot loop, and to allow our node script to
        else console.log('Connected to database')// to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    conn.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();
//end connect to database

app.get("/",function (req, res) {
    res.render("homepage");
})
app.get("/contacts",function (req, res) {
    res.render("contacts");
})
app.get("/shop",function (req, res) {
    var param = req.query.AllProduct;
        var sql_name = "select * from T2110E_Nhom3_Product where NameProduct like '%" + param + "%';";
        conn.query(sql_name, function (err, rs) {
            if (err) console.log(err);
            else {
                res.render("shop-tung", {
                    products:rs,
                });
            }
        });

    })

app.get("/product",function (req, res) {
    var param = req.query.id;
    var sql_txt ="select * from T2110E_Nhom3_Product where ID = "+param+";";
    conn.query(sql_txt,function (err, rs) {
        if(err) console.log(err);

        else if(rs.length ==0){
            res.send("Không tìm thấy sản phẩm nào hết");
        }else{
            res.render("product",{
                product:rs[0]
            })
        }
    })
})
app.get("/color",function (req, res) {
    var param = req.query.color1;
    var sql_txt = "select * from T2110E_Nhom3_Product where Color1 like '%"+param+"%';";
    conn.query(sql_txt,function (err,rs){
        if(err) res.send("Errors..");
        else res.render("color",{
            colors:rs.recordset,
        });
    })
})
