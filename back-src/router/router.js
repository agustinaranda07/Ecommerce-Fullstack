const express = require("express");
const router = express();
const mysqlConnection = require("../database/database");

router.get("/", (req, res) => {
  res.send("<h1>Hi!</h1>");
});

router.get("/usuarios", (req, res) => {
  const query = "select * from usuarios";
    mysqlConnection.query(query, (err, rows) => {
      if (!err) {
        res.json({
          status: true,
          datos: rows,
        });
      } else {
        res.json({
          status: false,
          message: "Server error",
        });
        console.log(err);
      }
    });
});

router.get(`/usuarios/:id_usuario`,(req,res)=>{
  const { id_usuario } = req.params;
  const query = `select * from usuarios where id_usuario=${id_usuario}`;
  mysqlConnection.query(query,(err,rows)=>{
    if(!err){
      if (rows.lenght != 0){
        res.json({
          status:true,
          datos:rows,
        });
      }else{
        res.json({
          status:false,
          message: "ID not found"
        })
      }
    }else{
      res.json({
        status:false,
        message:"Server error"
      });
      console.log(err)
    }
  })
})

module.exports = router;
