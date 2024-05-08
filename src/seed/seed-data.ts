interface UsuariosSeed {
  username: string;
  password: string;
  email: string;
  roles?: string[];
}
interface ProductosInterface {
  nombre:      string;
  precio:      number;
  descripcion: string;
  url:         string;
  stock:       number;
  sizes:       string[];
  imagenes:    string[];
}
interface DBSEED {
  productos: ProductosInterface[];
  usuarios: UsuariosSeed[];
}

export const initialDataDB: DBSEED = {
  productos: [
    {
      nombre: 'Camisa de algodón',
      precio: 25.99,
      descripcion:
        'Una camisa de algodón cómoda y elegante, perfecta para cualquier ocasión.',
      url: 'https://ejemplo.com/camisa-algodon',
      stock: 20,
      sizes: ['S', 'M', 'L', 'XL'],
      imagenes: [
        'https://ejemplo.com/img/camisa1.jpg',
        'https://ejemplo.com/img/camisa2.jpg',
        'https://ejemplo.com/img/camisa3.jpg',
      ],
    },
    {
      nombre: 'Pantalones vaqueros',
      precio: 39.99,
      descripcion:
        'Pantalones vaqueros de alta calidad, duraderos y con un estilo moderno.',
      url: 'https://ejemplo.com/pantalones-vaqueros',
      stock: 15,
      sizes: ['28', '30', '32', '34', '36'],
      imagenes: [
        'https://ejemplo.com/img/pantalones1.jpg',
        'https://ejemplo.com/img/pantalones2.jpg',
        'https://ejemplo.com/img/pantalones3.jpg',
      ],
    },
    {
      nombre: 'Zapatillas deportivas',
      precio: 49.99,
      descripcion:
        'Zapatillas deportivas ideales para correr o entrenar, con tecnología de amortiguación avanzada.',
      url: 'https://ejemplo.com/zapatillas-deportivas',
      stock: 30,
      sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
      imagenes: [
        'https://ejemplo.com/img/zapatillas1.jpg',
        'https://ejemplo.com/img/zapatillas2.jpg',
        'https://ejemplo.com/img/zapatillas3.jpg',
      ],
    },
    {
      nombre: 'Bolso de cuero',
      precio: 79.99,
      descripcion:
        'Bolso de cuero elegante y espacioso, perfecto para llevar tus pertenencias diarias.',
      url: 'https://ejemplo.com/bolso-de-cuero',
      stock: 10,
      sizes: [],
      imagenes: [
        'https://ejemplo.com/img/bolso1.jpg',
        'https://ejemplo.com/img/bolso2.jpg',
      ],
    },
    {
      nombre: 'Reloj de pulsera',
      precio: 99.99,
      descripcion:
        'Reloj de pulsera elegante y resistente al agua, con cronómetro y calendario integrados.',
      url: 'https://ejemplo.com/reloj-de-pulsera',
      stock: 5,
      sizes: [],
      imagenes: [
        'https://ejemplo.com/img/reloj1.jpg',
        'https://ejemplo.com/img/reloj2.jpg',
      ],
    },
    {
      nombre: 'Libro de cocina',
      precio: 15.99,
      descripcion:
        'Libro de cocina con una amplia variedad de recetas deliciosas para todos los gustos.',
      url: 'https://ejemplo.com/libro-de-cocina',
      stock: 25,
      sizes: [],
      imagenes: ['https://ejemplo.com/img/libro1.jpg'],
    },
    {
      nombre: 'Mochila impermeable',
      precio: 34.99,
      descripcion:
        'Mochila impermeable con múltiples compartimentos, ideal para actividades al aire libre.',
      url: 'https://ejemplo.com/mochila-impermeable',
      stock: 12,
      sizes: [],
      imagenes: [
        'https://ejemplo.com/img/mochila1.jpg',
        'https://ejemplo.com/img/mochila2.jpg',
      ],
    },
    {
      nombre: 'Gafas de sol',
      precio: 19.99,
      descripcion:
        'Gafas de sol con protección UV y diseño moderno, perfectas para proteger tus ojos del sol.',
      url: 'https://ejemplo.com/gafas-de-sol',
      stock: 18,
      sizes: [],
      imagenes: [
        'https://ejemplo.com/img/gafas1.jpg',
        'https://ejemplo.com/img/gafas2.jpg',
      ],
    },
    {
      nombre: 'Pendientes de plata',
      precio: 29.99,
      descripcion:
        'Pendientes de plata elegantes y brillantes, ideales para cualquier ocasión especial.',
      url: 'https://ejemplo.com/pendientes-de-plata',
      stock: 8,
      sizes: [],
      imagenes: [],
    },
    {
      nombre: 'Cinturón de cuero',
      precio: 22.99,
      descripcion:
        'Cinturón de cuero de alta calidad, duradero y con un diseño clásico que nunca pasa de moda.',
      url: 'https://ejemplo.com/cinturon-de-cuero',
      stock: 14,
      sizes: ['S', 'M', 'L', 'XL'],
      imagenes: [
        'https://ejemplo.com/img/cinturon1.jpg',
        'https://ejemplo.com/img/cinturon2.jpg',
      ],
    },
  ],
  usuarios: [
    {
      username: 'admin',
      password: 'Admin0',
      email: 'admin@adm.cl',
      roles: ['admin', 'user', 'superadmin'],
    },
    {
      username: 'supervisor',
      password: 'supervisor',
      email: 'supervisor@gmail.com'
    },
    {
      username: 'user',
      password: 'user',
      email: 'user@gmail.com',
    },
  ],
};
