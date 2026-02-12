# Proyecto final Backend I

Primera entrega del Proyecto final de la Diplomatura en Desarrollo Fullstack Web. Consiste en la creación de una API REST con Node.js y Express para la gestión de productos y carritos.

## Autor

### [Francisco Luis Campo](https://github.com/FCampo7)

## Estructura de archivos

La carpeta postman contiene la colección de Postman para probar la API.

```
.
├── postman
│   └── Primera entrega Backend I.postman_collection.json
├── src
│   ├── data
│   │   ├── carts.json
│   │   └── products.json
│   ├── cartManager.js
│   └── productManager.js
├── app.js
├── package.json
└── README.md
```

## Requisitos

- Node.js 24.13.0 o superior
- npm 11.6.2 o bun 1.3.9 o superiores

## Paquetes

- express: ^5.2.1
- nodemon: ^3.1.11
- uuid: ^13.0.0

## Instalación

### Con npm

1. Clonar el repositorio
2. Instalar dependencias con `npm install`
3. Ejecutar
    1. Modo desarrollo con nodemon: `npm run dev`
    2. Modo producción: `npm run start`

### Con bun

1. Clonar el repositorio
2. Instalar dependencias con `bun install`
3. Ejecutar
    1. Modo desarrollo con nodemon: `bun run dev`
    2. Modo producción: `bun run start`

## Endpoints

### Productos

- GET /api/products
    > Obtiene todos los productos
- GET /api/products/:id
    > Obtiene un producto por su ID
- POST /api/products
    > Crea un nuevo producto
- PUT /api/products/:pid
    > Actualiza un producto por su ID
- DELETE /api/products/:pid
    > Elimina un producto por su ID

### Carritos

- GET /api/carts
    > Obtiene todos los carritos
- GET /api/carts/:cid
    > Obtiene un carrito por su ID
- POST /api/carts
    > Crea un nuevo carrito
- POST /api/carts/:cid/products/:pid
    > Agrega un producto al carrito
