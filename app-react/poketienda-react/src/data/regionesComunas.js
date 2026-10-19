// Regiones de Chile y sus comunas (usado por registro, checkout y mantenedor de usuarios)
export const REGIONES_COMUNAS = {
  'Arica y Parinacota': ['Arica', 'Camarones', 'Putre', 'General Lagos'],
  'Tarapacá': ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica'],
  'Antofagasta': ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'Tocopilla', 'María Elena'],
  'Atacama': ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Freirina', 'Huasco', 'Alto del Carmen'],
  'Coquimbo': ['La Serena', 'Coquimbo', 'Andacollo', 'Vicuña', 'Illapel', 'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá', 'Monte Patria'],
  'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Concón', 'Quilpué', 'Villa Alemana', 'Casablanca', 'San Antonio', 'Los Andes', 'San Felipe', 'Quillota', 'La Calera', 'Isla de Pascua'],
  'Metropolitana de Santiago': ['Santiago', 'Providencia', 'Las Condes', 'Ñuñoa', 'La Florida', 'Maipú', 'Puente Alto', 'San Bernardo', 'Vitacura', 'Lo Barnechea', 'La Reina', 'Peñalolén', 'Macul', 'San Miguel', 'Estación Central', 'Independencia', 'Recoleta', 'Quilicura', 'Renca', 'Pudahuel', 'Melipilla', 'Talagante', 'Colina', 'Buin'],
  "Libertador General Bernardo O'Higgins": ['Rancagua', 'Machalí', 'Graneros', 'San Fernando', 'Santa Cruz', 'Pichilemu', 'Rengo', 'Chimbarongo'],
  'Maule': ['Talca', 'Curicó', 'Linares', 'Constitución', 'Cauquenes', 'Molina', 'San Javier', 'Parral', 'Longaví'],
  'Ñuble': ['Chillán', 'Chillán Viejo', 'San Carlos', 'Bulnes', 'Quirihue', 'Coelemu', 'Yungay'],
  'Biobío': ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Chiguayante', 'Hualpén', 'Coronel', 'Los Ángeles', 'Lota', 'Tomé', 'Penco'],
  'La Araucanía': ['Temuco', 'Padre Las Casas', 'Villarrica', 'Angol', 'Pucón', 'Victoria', 'Nueva Imperial', 'Lautaro'],
  'Los Ríos': ['Valdivia', 'La Unión', 'Río Bueno', 'Panguipulli', 'Los Lagos', 'Lanco'],
  'Los Lagos': ['Puerto Montt', 'Puerto Varas', 'Osorno', 'Castro', 'Ancud', 'Frutillar', 'Llanquihue', 'Calbuco', 'Quellón'],
  'Aysén del General Carlos Ibáñez del Campo': ['Coyhaique', 'Aysén', 'Chile Chico', 'Cochrane'],
  'Magallanes y de la Antártica Chilena': ['Punta Arenas', 'Puerto Natales', 'Porvenir', 'Cabo de Hornos'],
};

export const REGIONES = Object.keys(REGIONES_COMUNAS);
