// read: 
// Querying/reading data from database: https://mongoosejs.com/docs/models.html#querying
// deleting data from database: https://mongoosejs.com/docs/models.html#deleting
// updating data in database: https://mongoosejs.com/docs/models.html#updating


var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken
var cookieParser = require("cookie-parser");
var path = require("path");
var socketIo = require("socket.io");
var authRoutes = require("./routes/auth");
var vendorRoute = require("./routes/vendorauth");
var http = require("http");

var { SERVER_SECRET, PORT } = require("./core");
var { userModel, order, vendorModel } = require("./derepo");




var app = express();
var server = http.createServer(app);
var io = socketIo(server);
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(cookieParser());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin: http://localhost:3000");
    res.header("Access-Control-Allow-Credentials: true");
    res.header("Access-Control-Allow-Methods: GET, POST");
    res.header("Access-Control-Allow-Headers: Content-Type, *");
    next();
})




app.use("/", express.static(path.resolve(path.join(__dirname, "../Web/build"))));





app.use("/vendorauth", vendorRoute)
app.use("/auth", authRoutes);



app.use(function (req, res, next) {
    if (!req.cookies.jToken) {
        res.status(401).send("include http-only credentials with every request")
        return;
    }
    jwt.verify(req.cookies.jToken, SERVER_SECRET, function (err, decodedData) {
        if (!err) {
            const issueDate = decodedData.iat * 1000; // 1000 miliseconds because in js ms is in 16 digits
            const nowDate = new Date().getTime();
            const diff = nowDate - issueDate; // 86400,000

            if (diff > 3000000) { // expire after 5 min (in milis)
                res.status(401).send("token expired")
                res.clearCookie();
            }

            else { // issue new token
                if (!decodedData.vendorEmaail) {
                    var token = jwt.sign({
                        id: decodedData.id,
                        userName: decodedData.userName,
                        userEmail: decodedData.userEmail,
                        userPhone: decodedData.userPhone,
                        userAddress: decodedData.userAddress,
                    }, SERVER_SECRET)
                    res.cookie('jToken', token, {
                        maxAge: 86_400_000,
                        httpOnly: true
                    });
                    req.body.jToken = decodedData;
                    req.headers.jToken = decodedData;
                    next();
                }
                else {
                    var token = jwt.sign({
                        id: decodedData.id,
                        vendorName: decodedData.vendorName,
                        vendorEmail: decodedData.vendorEmail,
                        vendorPhone: decodedData.vendorPhone,
                    }, SERVER_SECRET)

                    res.cookie('jToken', token, {
                        maxAge: 86_400_000,
                        httpOnly: true
                    });
                    req.body.jToken = decodedData;
                    req.headers.jToken = decodedData;
                    next();
                }
            }

        } else {
            res.status(401).send("invalid token")
        }
    });
})

app.get("/profile", (req, res, next) => {
    userModel.findById(req.body.jToken.id, "userName userEmail userAddress userPhone roll",

        function (err, doc) {
            if (!err) {
                res.send({
                    profile: doc
                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })
});


app.post("/placeOrder", (req, res, next) => {
    console.log("req.body is = > ", req.body);
    
    if (req.body.Earpod || req.body.Charger || req.body.Battery) {
        userModel.findOne({ userEmail: req.body.jToken.userEmail }, (err, userFound) => {
            if (!err) {
                order.create({
                    Earpod: req.body.Earpod,
                    Charger: req.body.Charger,
                    Battery: req.body.Battery,
                    total: req.body.total,
                    userEmail: req.body.jToken.userEmail,
                    userName: req.body.jToken.userName,
                }).then((orderPlaced) => {
                    res.status(200).send({
                        message: "Your request has been sent succesfully" + orderPlaced,
                    });
                    io.emit("requests", orderPlaced);
                })
                    .catch((err) => {
                        res.status(500).send({
                            message: "an error occured"
                        })
                    })
            }
        })
    }
    else {
        res.status(404).send(
            `
            Please send one of the following in json body:
            e.g
            {
                earpod : "xxkg",
                battery : "xx"kg"
            }
         `
        )
    }

});

app.get("/getOrders", (req, res, next) => {


    order.find({} , (err, data) => {
        if (!err) {
            res.status(200).send({
                placedRequests: data,
            });
        }
        else {
            console.log("error : ", err);
            res.status(500).send("error");
        }
    })



});
app.post("/logout", (req, res, next) => {
    res.cookie('jToken', "", {
        maxAge: 86_400_000,
        httpOnly: true
    });
    res.clearCookie();

    res.send("logout succesfully");

})


server.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})

