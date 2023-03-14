select * from usuarios;

insert into usuarios(email,password,nombre,apellido,rol)values("brunomaciel@gmail.com","bruno123","Bruno","Maciel",admin);
insert into usuarios(email,password,nombre,apellido)values("usuario@gmail.com","usuario123","Name","Surname");

update usuarios set password=user123 where id_usuario=2;

select u.id_usuario,  u.password,  u.email, u.apellido, u.nombre from usuarios u where u.email="brunomaciel@gmail.com";

SELECT * FROM productos; 

INSERT INTO productos(nombre,tipo,talle,color,descripcion,stock,precio)VALUES('PANTALON SKINNY FIT','Pantalon','48','Beige Claro','Pantalón skinny fit. Cinco bolsillos. Cierre frontal con cremallera y botón.','1','19590');

create table usuarios_roles(
	id_rol INT NOT NULL UNIQUE auto_increment,
    id_usuario INT,
    roles varchar(10),
    foreign key (id_usuario) references usuarios(id_usuario)
);