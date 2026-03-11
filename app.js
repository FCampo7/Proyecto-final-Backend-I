import express from "express";
import { productsRouter } from "./src/routes/products.router.js";
import { cartsRouter } from "./src/routes/carts.router.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import path from "path";

import { ProductManager } from "./src/productManager.js";

const productManager = new ProductManager(
	path.join(process.cwd(), "src", "data", "products.json"),
);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const PORT = 8080;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use(express.static(path.join(process.cwd(), "src", "public")));
app.use(express.json()); // Middleware que permite que Express entienda JSON
app.use(express.urlencoded({ extended: true })); // Middleware que permite recibir datos de formularios

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

/*
 * *************** *
 *     General     *
 * *************** *
 */

app.get("/api", (req, res) => {
	res.render("home");
});

// RUTA PARA VISTA DINÁMICA
app.get("/realtimeproducts", (req, res) => {
	res.render("realTimeProducts"); // Esta será tu nueva vista
});

// RUTA PARA VISTA ESTÁTICA (Consigna)
app.get("/home", async (req, res) => {
	const productos = await productManager.getProducts();
	res.render("home", { productos });
});

// Configuración de Socket.io
io.on("connection", async (socket) => {
	console.log("Cliente conectado");

	// Enviamos los productos al conectarse
	const productos = await productManager.getProducts();
	socket.emit("productos", productos);

	socket.on("nuevoProducto", async (data) => {
		await productManager.addProduct(data);
		const listaActualizada = await productManager.getProducts();
		io.emit("productos", listaActualizada); // Emitir a todos
	});

	socket.on("eliminarProducto", async (id) => {
		await productManager.deleteProduct(id);
		const listaActualizada = await productManager.getProducts();
		io.emit("productos", listaActualizada);
	});
});

httpServer.listen(PORT, () => {
	console.log(`Server running on  http://localhost:${PORT}/api`);
});

/*
 * ********************* *
 *   Manejo de errores   *
 * ********************* *
 */

app.use((req, res) => {
	res.status(404).json({
		status: "error",
		message: "404 - Endpoint no encontrado",
	});
});
