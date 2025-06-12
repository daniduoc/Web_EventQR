-- Then insert the data
-- Eventos de Informática
INSERT INTO evento (nombre, descripcion, fecha, escuela, ubicacion, precio, cupos, capacidad, img_url, organizador_id) VALUES
('Hackathon 2025', 'Competencia de desarrollo de software en 48 horas', '2025-06-16 18:00:00', 'Informática', 'Auditorio Principal, Campus Norte', 0, 50, 100, '/assets/photo-1551288049-bebda4e38f71.jpg', 1),
('Seguridad Informática', 'Conferencia sobre ciberseguridad y protección de datos', '2025-06-13 10:00:00', 'Informática', 'Sala de Conferencias, Piso 3', 0, 80, 120, '/assets/photo-1563986768609-322da13575f3.jpg', 3);

-- Eventos de Comunicación
INSERT INTO evento (nombre, descripcion, fecha, escuela, ubicacion, precio, cupos, capacidad, img_url, organizador_id) VALUES
('Periodismo Digital', 'Taller sobre nuevas tendencias en comunicación digital', '2025-06-14 11:00:00', 'Comunicación', 'Estudio de TV, Edificio B', 0, 25, 25, '/assets/photo-1476242906366-d8eb64c2f661.jpg', 4),
('Festival de Cine Universitario', 'Muestra de cortometrajes realizados por estudiantes', '2025-06-12 14:00:00', 'Comunicación', 'Cine Club, Campus Central', 0, 150, 200, '/assets/photo-1517604931442-7e0c8ed2963c.jpg', 5);

-- Eventos de Salud
INSERT INTO evento (nombre, descripcion, fecha, escuela, ubicacion, precio, cupos, capacidad, img_url, organizador_id) VALUES
('Primeros Auxilios Básicos', 'Taller práctico de atención primaria en emergencias', '2025-06-18 09:30:00', 'Salud', 'Laboratorio de Simulación, Edificio Medicina', 0, 40, 40, '/assets/photo-1576091160550-2173dba999ef.jpg', 7),
('Nutrición Saludable', 'Conferencia sobre hábitos alimenticios para estudiantes', '2025-07-12 19:30:00', 'Salud', 'Auditorio de Ciencias de la Salud', 0, 90, 120, '/assets/photo-1490645935967-10de6ba17061.jpg', 8);

-- Eventos de Diseño
INSERT INTO evento (nombre, descripcion, fecha, escuela, ubicacion, precio, cupos, capacidad, img_url, organizador_id) VALUES
('Exposición de Diseño Gráfico', 'Muestra de trabajos destacados de estudiantes', '2025-06-13 16:00:00', 'Diseño', 'Galería de Arte, Edificio Creativo', 0, 100, 150, '/assets/photo-1467232004584-a241de8bcf5d.jpg', 10),
('Diseño de Interiores', 'Taller práctico sobre tendencias actuales', '2025-06-20 15:00:00', 'Diseño', 'Taller de Diseño 3, Campus Sur', 0, 20, 20, '/assets/photo-1618221195710-dd6b41faaea6.jpg', 11),
('Moda Sostenible', 'Charla sobre diseño de moda con materiales reciclados', '2025-06-23 12:00:00', 'Diseño', 'Aula 304, Edificio de Diseño', 0, 50, 60, '/assets/photo-1489987707025-afc232f7ea0f.jpg', 12);
