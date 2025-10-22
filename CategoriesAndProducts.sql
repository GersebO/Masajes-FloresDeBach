--Crear categorias
INSERT INTO categories (name, description, is_active, created_at, updated_at) VALUES
('Masajes', 'Tratamientos corporales orientados al bienestar físico y mental, incluyendo terapias relajantes, deportivas y faciales.', TRUE, NOW(), NULL),
('Flores de Bach', 'Esencias florales naturales utilizadas para armonizar emociones y promover el equilibrio interior.', TRUE, NOW(), NULL);

--Insertar productos
INSERT INTO products 
(name, description, price, stock, category_id, image_url, sku, status, is_active, created_at, updated_at) 
VALUES
('Masaje Deportivo', 'Diseñado para deportistas y personas activas. Ayuda a preparar los músculos antes de la actividad física o a recuperarlos después, previniendo lesiones y mejorando el rendimiento.', 25000, 15, 11, 'http://localhost:5174/img/MasajeDeportivo.png', 'MD-001', 'AVAILABLE', TRUE, NOW(), NULL),

('Masaje Terapéutico', 'Un enfoque profesional para tratar dolencias específicas. Con técnicas avanzadas, este masaje ayuda a aliviar el dolor crónico, mejorar la postura y acelerar la recuperación de lesiones.', 30000, 8, 11, 'http://localhost:5174/img/MasajeTerapeutico.png', 'MT-001', 'AVAILABLE', TRUE, NOW(), NULL),

('Masaje de Relajación', 'Libera el estrés acumulado y calma tu mente. Este masaje utiliza movimientos suaves y fluidos para aliviar la tensión muscular, promoviendo una profunda sensación de bienestar.', 15000, 19, 11, 'http://localhost:5174/img/MasajeRelajacion.png', 'MR-001', 'AVAILABLE', TRUE, NOW(), NULL),

('Masaje Descontracturante', 'Se enfoca en liberar la tensión en áreas específicas como espalda, cuello y hombros, usando presión para deshacer nudos, relajarte y recuperar tu movilidad.', 10000, 2, 11, 'http://localhost:5174/img/MasajeDescontracturante.png', 'MDC-001', 'AVAILABLE', TRUE, NOW(), NULL),

('Masaje Express en Silla', 'Masaje rápido de 15 a 20 minutos, ideal para aliviar la tensión en cuello y hombros. Perfecto para una pausa de relax.', 5000, 12, 11, 'http://localhost:5174/img/MasajeExpressSilla.png', 'MES-001', 'AVAILABLE', TRUE, NOW(), NULL),

('Masaje Facial Relajante', 'Un tratamiento que calma y revitaliza la piel, liberando la tensión facial y promoviendo la relajación profunda del cuerpo y la mente.', 10000, 6, 11, 'http://localhost:5174/img/MasajeFacialRelajante.png', 'MFR-001', 'AVAILABLE', TRUE, NOW(), NULL),

('Masaje Reflexología Thai', 'Técnica de presión en puntos específicos de los pies para estimular órganos y sistemas corporales, restaurando el equilibrio.', 25000, 17, 11, 'http://localhost:5174/img/MasajeReflexologiaThai.png', 'MRT-001', 'AVAILABLE', TRUE, NOW(), NULL),

('Masaje Craneal Ayurveda', 'Masaje relajante de la cabeza, cuello y hombros que mejora la circulación y alivia la tensión, promoviendo un estado de calma.', 20000, 3, 11, 'http://localhost:5174/img/MasajeCranealAyurveda.png', 'MCA-001', 'AVAILABLE', TRUE, NOW(), NULL),

('Masaje Facial Ayurvédico', 'Técnica facial que utiliza aceites y movimientos suaves para nutrir la piel, reducir el estrés y rejuvenecer el rostro de forma natural.', 15000, 11, 11, 'http://localhost:5174/img/MasajeFacialAyurvedico.png', 'MFA-001', 'AVAILABLE', TRUE, NOW(), NULL),

('Rescue Remedy', 'Fórmula de rescate para momentos de estrés, nerviosismo o crisis emocionales.', 15000, 20, 12, 'http://localhost:5174/img/flores-rescue.png', 'FR-001', 'AVAILABLE', TRUE, NOW(), NULL),

('Mimulus', 'Indicado para miedos conocidos y específicos (exámenes, hablar en público, procedimientos médicos).', 13000, 9, 12, 'http://localhost:5174/img/flores-mimulus.png', 'FM-001', 'AVAILABLE', TRUE, NOW(), NULL),

('White Chestnut', 'Para pensamientos recurrentes que no dejan descansar; ayuda a calmar la mente.', 14000, 14, 12, 'http://localhost:5174/img/White Chestnut.png', 'WC-001', 'AVAILABLE', TRUE, NOW(), NULL),

('Larch', 'Para falta de confianza y autovaloración; fomenta la seguridad personal.', 15000, 5, 12, 'http://localhost:5174/img/flores-larch.png', 'FL-001', 'AVAILABLE', TRUE, NOW(), NULL);

