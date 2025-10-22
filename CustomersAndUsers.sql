--Poblar customers
INSERT INTO customers 
(run, first_name, last_name, email, password, phone, address, region, commune, birth_date, status, is_active, created_at, updated_at)
VALUES
('12336945-9', 'Pereira', 'Soto', 'pereira.soto@duoc.cl', 'contraseña', '5804242027', 'Av. Central 101', 'Metropolitana', 'Santiago Centro', '1999-03-25', 'ACTIVE', TRUE, NOW(), NULL),
('15244987-3', 'Camila', 'Muñoz', 'camila.munoz@duoc.cl', 'contraseña', '56948215512', 'Calle Verde 234', 'Metropolitana', 'Ñuñoa', '2001-07-12', 'ACTIVE', TRUE, NOW(), NULL),
('17899234-2', 'Felipe', 'Torres', 'felipe.torres@duoc.cl', 'contraseña', '56965124587', 'Av. Los Alerces 400', 'Valparaíso', 'Viña del Mar', '1998-02-10', 'ACTIVE', TRUE, NOW(), NULL),
('20456783-1', 'Valentina', 'López', 'valentina.lopez@duoc.cl', 'contraseña', '56977889900', 'Camino del Sol 88', 'Biobío', 'Concepción', '1997-09-15', 'ACTIVE', TRUE, NOW(), NULL),
('23456789-5', 'Matías', 'Reyes', 'matias.reyes@duoc.cl', 'contraseña', '56942013698', 'Los Cipreses 102', 'Los Lagos', 'Puerto Montt', '1995-05-03', 'ACTIVE', TRUE, NOW(), NULL),
('18923654-7', 'Constanza', 'Bravo', 'constanza.bravo@duoc.cl', 'contraseña', '56940127891', 'Av. Independencia 520', 'Metropolitana', 'Recoleta', '2000-12-22', 'ACTIVE', TRUE, NOW(), NULL),
('17498231-9', 'Ignacio', 'Fuentes', 'ignacio.fuentes@duoc.cl', 'contraseña', '56945781236', 'Calle del Parque 45', 'Antofagasta', 'Antofagasta', '1996-08-17', 'ACTIVE', TRUE, NOW(), NULL),
('20987456-3', 'Catalina', 'Morales', 'catalina.morales@duoc.cl', 'contraseña', '56947859632', 'Camino Las Rosas 789', 'Coquimbo', 'La Serena', '2002-04-10', 'ACTIVE', TRUE, NOW(), NULL),
('15789324-1', 'Diego', 'Vega', 'diego.vega@duoc.cl', 'contraseña', '56945216897', 'Av. Libertad 122', 'Valparaíso', 'Quilpué', '1994-11-30', 'ACTIVE', TRUE, NOW(), NULL),
('19999234-8', 'Fernanda', 'Gallardo', 'fernanda.gallardo@duoc.cl', 'contraseña', '56947856321', 'Camino Azul 15', 'Metropolitana', 'Providencia', '2001-06-05', 'ACTIVE', TRUE, NOW(), NULL);

--Poblar users. 
INSERT INTO users 
(run, first_name, last_name, email, password, phone, address, region, commune, birth_date, role, status, is_active, created_at, updated_at)
VALUES
('12345678-9', 'Germán', 'Ormeño', 'german.ormeno@inbox.cl', 'contraseña', '667488254', 'Av. Central 101', 'Metropolitana', 'Santiago Centro', '2004-05-21', 'ADMIN', 'ACTIVE', TRUE, NOW(), NULL),
('15244987-3', 'Camila', 'Muñoz', 'camila.munoz@inbox.cl', 'contraseña', '56948215512', 'Calle Verde 234', 'Metropolitana', 'Ñuñoa', '2001-07-12', 'EMPLOYEE', 'ACTIVE', TRUE, NOW(), NULL),
('17899234-2', 'Felipe', 'Torres', 'felipe.torres@inbox.cl', 'contraseña', '56965124587', 'Av. Los Alerces 400', 'Valparaíso', 'Viña del Mar', '1998-02-10', 'EMPLOYEE', 'ACTIVE', TRUE, NOW(), NULL),
('20456783-1', 'Valentina', 'López', 'valentina.lopez@inbox.cl', 'contraseña', '56977889900', 'Camino del Sol 88', 'Biobío', 'Concepción', '1997-09-15', 'MANAGER', 'ACTIVE', TRUE, NOW(), NULL),
('23456789-5', 'Matías', 'Reyes', 'matias.reyes@inbox.cl', 'contraseña', '56942013698', 'Los Cipreses 102', 'Los Lagos', 'Puerto Montt', '1995-05-03', 'EMPLOYEE', 'ACTIVE', TRUE, NOW(), NULL),
('18923654-7', 'Constanza', 'Bravo', 'constanza.bravo@inbox.cl', 'contraseña', '56940127891', 'Av. Independencia 520', 'Metropolitana', 'Recoleta', '2000-12-22', 'EMPLOYEE', 'ACTIVE', TRUE, NOW(), NULL),
('17498231-9', 'Ignacio', 'Fuentes', 'ignacio.fuentes@inbox.cl', 'string', '56945781236', 'Calle del Parque 45', 'Antofagasta', 'Antofagasta', '1996-08-17', 'EMPLOYEE', 'INACTIVE', FALSE, NOW(), NULL),
('20987456-3', 'Catalina', 'Morales', 'catalina.morales@inbox.cl', 'string', '56947859632', 'Camino Las Rosas 789', 'Coquimbo', 'La Serena', '2002-04-10', 'MANAGER', 'ACTIVE', TRUE, NOW(), NULL),
('15789324-1', 'Diego', 'Vega', 'diego.vega@inbox.cl', 'string', '56945216897', 'Av. Libertad 122', 'Valparaíso', 'Quilpué', '1994-11-30', 'EMPLOYEE', 'SUSPENDED', FALSE, NOW(), NULL),
('19999234-8', 'Fernanda', 'Gallardo', 'fernanda.gallardo@inbox.cl', 'string', '56947856321', 'Camino Azul 15', 'Metropolitana', 'Providencia', '2001-06-05', 'ADMIN', 'ACTIVE', TRUE, NOW(), NULL);
