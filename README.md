# Proyecto-final-Backend-I

Primera entrega del Proyecto final de la Diplomatura en Desarrollo Fullstack Web. Consiste en la creación de una API REST para la gestión de productos.

## Arbol de archivos

```
.
├── src
│   ├── data
│   │   ├── carts.json
│   │   └── products.json
│   ├── cartManager.js
│   └── productManager.js
├── app.js
├── package.json
├── Primera entrega Backend I.postman_collection.json
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

1. Clonar el repositorio
2. Ejecutar `npm install` o `bun install`
3. Ejecutar `npm run dev` o `bun run dev`

## Endpoints

### Productos

- GET /api/products
- GET /api/products/:id
- POST /api/products
- PUT /api/products/:pid
- DELETE /api/products/:pid

### Carritos

- GET /api/carts
- GET /api/carts/:cid
- POST /api/carts
- POST /api/carts/:cid/products/:pid
