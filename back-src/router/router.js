const express = require("express");
const router = express();
const mysqlConnection = require("../database/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Ruta raiz
router.get("/", (req, res) => {
  res.send("<h1>Hi!</h1>");
});

// ruta pedir todos los usuarios
router.get("/usuarios", tokenVerifier, (req, res) => {
  jwt.verify(req.token, "ecommerceKey", (err, valido) => {
    if (err) {
      res.json({
        status: false,
        message: "Error 403",
      });
      res.sendStatus(403);
    } else {
      const query = "SELECT * FROM usuarios WHERE estado='A'";
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
    }
  });
});

//Ruta pedir usuario por ID
router.get(`/usuarios/:id_usuario`, tokenVerifier, (req, res) => {
  const { id_usuario } = req.params;
  const query = `SELECT * FROM usuarios WHERE estado='A' AND id_usuario=${id_usuario}`;
  jwt.verify(req.token, "ecommerceKey", (err, valido) => {
    if (err) {
      res.json({
        status: false,
        message: "Error 403",
      });
      res.sendStatus(403);
    } else {
      mysqlConnection.query(query, (err, rows) => {
        if (!err) {
          if (rows.length != 0) {
            res.json({
              status: true,
              datos: rows,
            });
          } else {
            res.json({
              status: false,
              message: "ID no encontrado",
            });
          }
        } else {
          res.json({
            status: false,
            message: "Server error",
          });
          console.log(err);
        }
      });
    }
  });
});

// ruta modificar datos de usuario;
router.put("/usuarios/:id_usuario", tokenVerifier, (req, res) => {
  const { id_usuario } = req.params;
  let {email, nombre, apellido} = req.body;
  jwt.verify(req.token, "ecommerceKey", (err, valido) => {
    if (err) {
      res.json({
        status: false,
        message: "Error 403",
      });
      res.sendStatus(403);
    } else {
      let query = `UPDATE usuarios SET email='${email}', nombre='${nombre}', apellido='${apellido}' WHERE id_usuario = '${id_usuario}'`;
      mysqlConnection.query(query, (err, rows) => {
        if (!err) {
          res.json({
            status: true,
            message: "Los datos fueron actualizados con exito",
          });
          console.log(
            `ID editado:${id_usuario}`
          );
        } else {
          res.json({
            status: false,
            message: "Server error",
          });
          console.log(err);
        }
      });
    }
  });
});

// ruta dar de baja usuario (logico)
router.delete(`/usuarios/:id_usuario`, tokenVerifier, (req, res) => {
  let { id_usuario } = req.params;
  jwt.verify(req.token, "ecommerceKey", (err, valido) => {
    if (err) {
      res.json({
        status: false,
        message: "Error 403",
      });
      res.sendStatus(403);
    } else {
      let query = `UPDATE usuarios SET estado='B' WHERE id_usuario ='${id_usuario}'`;
      mysqlConnection.query(query, (err, rows) => {
        if (!err) {
          res.json({
            status: true,
            message: "El usuario fue dado de baja",
          });
        } else {
          res.json({
            status: false,
            message: "Server error",
          });
          console.log(err);
        }
      });
    }
  });
});

// ruta login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email != undefined && password != undefined) {
    mysqlConnection.query(
      "select u.id_usuario,  u.password,  u.email, u.apellido, u.nombre from usuarios u WHERE estado='A' AND u.email=?",
      [email],
      (err, rows) => {
        if (!err) {
          if (rows.length != 0) {
            const bcryptPassword = bcrypt.compareSync(
              password,
              rows[0].password
            );
            if (bcryptPassword) {
              jwt.sign(
                { rows },
                "ecommerceKey",
                { expiresIn: "1200s" },
                (err, token) => {
                  res.json({
                    status: true,
                    datos: rows,
                    token: token,
                  });
                }
              );
            } else {
              res.json({
                status: false,
                message: "Contraseña incorrecta",
              });
            }
          } else {
            res.json({
              status: false,
              message: "Usuario no encontrado",
            });
          }
        } else {
          res.json({
            status: false,
            message: "Server error",
          });
        }
      }
    );
  } else {
    res.json({
      status: false,
      message: "Faltan completar campos",
    });
  }
});

// ruta registro
router.post("/signin", (req, res) => {
  const { email, password, nombre, apellido } = req.body;
  var hash = bcrypt.hashSync(password, 10);
  let query = `INSERT INTO usuarios(email, password, nombre, apellido)VALUES('${email}','${hash}','${nombre}','${apellido}')`;
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      res.json({
        status: true,
        message: "Se registro con exito",
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

// ruta resetear password
router.put("/resetpassword/:id_usuario", (req, res) => {
  const { id_usuario } = req.params;
  let { password } = req.body;
  var hash = bcrypt.hashSync(password, 10);
  let query = `UPDATE usuarios SET password='${hash}' WHERE id_usuario = '${id_usuario}'`;
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      res.json({
        status: true,
        message: "La contraseña se cambio con exito",
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

// Token
function tokenVerifier(req, res, next) {
  const BearerHeader = req.headers["authorization"];
  if (typeof BearerHeader !== "undefined") {
    const BearerToken = BearerHeader.split(" ")[1];
    req.token = BearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
