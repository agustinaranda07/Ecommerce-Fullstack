/* ENDPOINTS:

- ABM PRODUCTOS
  - Pedir productos
  - Pedir productos por tipo
  - Alta de producto
  - Dar baja de producto
  - Modificar stock de producto
  - Modificar talle de producto
  - Modificar descripcion
  - Modificar estado de SALE
  
- ABM USUARIOS
  - Pedir Usuarios
  - Pedir usuarios por ID
  - Login
  - Register
  - Reset password
  - Reset datos user
  - Dar baja de usuario
*/


// REQUIRES
const express = require("express");
const router = express();
const mysqlConnection = require("../database/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Ruta raiz
router.get("/", (req, res) => {
  res.send("<h1>Hi!</h1>");
});

/////// ABM PRODUCTOS ///////////////

/// PEDIR PRODUCTOS
router.get("/productos", tokenVerifier, (req, res) => {
  const query = "SELECT * FROM productos WHERE estado='A'";
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

/// PEDIR PRODUCTOS POR TIPO
router.get("/buscar/:tipo", tokenVerifier, (req, res) => {
  const { tipo } = req.params;
  const query = `SELECT * FROM productos WHERE estado='A' AND tipo like '%${tipo}%'`;
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
              message: "No existen productos de este tipo.",
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

// BAJA DE PRODUCTOS
router.delete(`/productos/:id_producto`, tokenVerifier, (req, res) => {
  let { id_producto } = req.params;
  jwt.verify(req.token, "ecommerceKey", (err, valido) => {
    if (err) {
      res.json({
        status: false,
        message: "Error 403",
      });
      res.sendStatus(403);
    } else {
      let query = `UPDATE productos SET estado='B' WHERE id_producto='${id_producto}'`;
      mysqlConnection.query(query, (err, rows) => {
        if (!err) {
          if (rows.length != 0) {
            res.json({
              status: true,
              message: "El producto fue removido.",
            });
          } else {
            res.json({
              status: false,
              message: "No se encontraron productos",
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


// ALTA DE PRODUCTOS
router.post("/productos", tokenVerifier, (req, res) => {
  console.log(req.body);
  const { nombre, tipo, talle, color, descripcion, stock, precio } = req.body;
  jwt.verify(req.token, "ecommerceKey", (err, valido) => {
    if (err) {
      res.json({
        status: false,
        message: "Error 403",
      });
      res.sendStatus(403);
    } else {
      let query = `INSERT INTO productos(nombre,tipo,talle,color,descripcion,stock,precio)VALUES('${nombre}','${tipo}','${talle}','${color}','${descripcion}','${stock}','${precio}')`;
      mysqlConnection.query(query, (err, rows) => {
        if (!err) {
          res.json({
            status: true,
            message: `El producto('${nombre}') se inserto correctamente`,
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

// MODIFICAR STOCK
router.put("/u-product-stock/:id_producto", tokenVerifier, (req, res) => {
  const { id_producto } = req.params;
  let {stock} = req.body;
  jwt.verify(req.token, "ecommerceKey", (err, valido) => {
    if (err) {
      res.json({
        status: false,
        message: "Error 403",
      });
      res.sendStatus(403);
    } else {
      let query = `UPDATE productos SET stock='${stock}' WHERE id_producto = '${id_producto}'`;
      mysqlConnection.query(query, (err, rows) => {
        if (!err) {
          res.json({
            status: true,
            message: "Stock modificado",
          });
          console.log(
            `Stock de :${id_producto}; modificado a '${stock}'`
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

// MODIFICAR TALLE
router.put("/u-product-talle/:id_producto", tokenVerifier, (req, res) => {
  const { id_producto } = req.params;
  let {talle} = req.body;
  jwt.verify(req.token, "ecommerceKey", (err, valido) => {
    if (err) {
      res.json({
        status: false,
        message: "Error 403",
      });
      res.sendStatus(403);
    } else {
      let query = `UPDATE productos SET talle='${talle}' WHERE id_producto = '${id_producto}'`;
      mysqlConnection.query(query, (err, rows) => {
        if (!err) {
          res.json({
            status: true,
            message: "Talle modificado",
          });
          console.log(
            `talle de :${id_producto}; modificado a '${talle}'`
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

// MODIFICAR DESCRIPCION
router.put("/u-product-desc/:id_producto", tokenVerifier, (req, res) => {
  const { id_producto } = req.params;
  let {descripcion} = req.body;
  jwt.verify(req.token, "ecommerceKey", (err, valido) => {
    if (err) {
      res.json({
        status: false,
        message: "Error 403",
      });
      res.sendStatus(403);
    } else {
      let query = `UPDATE productos SET descripcion='${descripcion}' WHERE id_producto = '${id_producto}'`;
      mysqlConnection.query(query, (err, rows) => {
        if (!err) {
          res.json({
            status: true,
            message: "Descripcion modificado",
          });
          console.log(
            `Descripcion de :${id_producto}; modificado a '${descripcion}'`
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

// MODIFICAR ESTADO DE SALE
router.put("/u-product-sale/:id_producto", tokenVerifier, (req, res) => {
  const { id_producto } = req.params;
  let {sale} = req.body;
  jwt.verify(req.token, "ecommerceKey", (err, valido) => {
    if (err) {
      res.json({
        status: false,
        message: "Error 403",
      });
      res.sendStatus(403);
    } else {
      let query = `UPDATE productos SET sale='${sale}' WHERE id_producto = '${id_producto}'`;
      mysqlConnection.query(query, (err, rows) => {
        if (!err) {
          res.json({
            status: true,
            message: "Sale modificado",
          });
          console.log(
            `Sale de :${id_producto}; modificado a '${sale}'`
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

/////// ABM USUARIOS ///////////////

// PEDIR USUARIOS
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

// PEDIR USUARIOS POR ID
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

// RESET DATOS DE USUARIO
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

// BAJA DE USUARIO
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

// LOGIN
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

// REGISTER
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

// RESET PASSWORD
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

// TOKEN
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
