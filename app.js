import express from "express";
import { productsRouter } from "./src/routes/products.router.js";
import { cartsRouter } from "./src/routes/carts.router.js";

const app = express();
const PORT = 8080;

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
	res.send("<h1>Hola Mundo</h1>");
});

app.listen(PORT, () => {
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
