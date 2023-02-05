const express = require("express");
const app = express();
app.use(express.json());

const morgan = require("morgan");
//config
app.set("port", 3001);
//middlewares
app.use(morgan("OK"));
//router
app.use(require('./router/router'))
//server up
app.listen(app.get("port"), () => {
  console.log("server running in port number " + app.get("port"));
});
