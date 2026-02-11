import express from "express";
import { ProductManager } from "./src/productManager.js";
import { CartManager } from "./src/cartManager.js";
import path from "path";

const pathFile = path.join(process.cwd(), "src", "data", "products.json");
const productManager = new ProductManager(pathFile);

const pathCartFile = path.join(process.cwd(), "src", "data", "carts.json");
const cartManager = new CartManager(pathCartFile);

const app = express();
const PORT = 8080;

app.use(express.json()); // Permite que Express entienda JSON
app.use(express.urlencoded({ extended: true })); // Permite recibir datos de formularios

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
 * *************** *
 *    Productos    *
 * *************** *
 */

app.get("/api/products", async (req, res) => {
	const products = await productManager.getProducts();
	res.status(200).json({ status: "success", products });
});

app.get("/api/products/:id", async (req, res) => {
	const { id } = req.params;
	const product = await productManager.getProductById(id);
	res.status(200).json({ status: "success", product });
});

app.post("/api/products", async (req, res) => {
	const product = req.body;
	await productManager.addProduct(product);
	res.status(200).json({ status: "success", product });
});

app.put("/api/products/:pid", async (req, res) => {
	const { pid } = req.params;
	const productData = req.body;
	if (productData.id) {
		return res
			.status(400)
			.json({ status: "error", message: "No se puede cambiar el id" });
	}
	await productManager.updateProduct(pid, productData);
	res.status(200).json({ status: "success", productData });
});

app.delete("/api/products/:pid", async (req, res) => {
	const { pid } = req.params;
	await productManager.deleteProduct(pid);
	res.status(200).json({ status: "success", message: "Producto eliminado" });
});

/*
 * *************** *
 *     Carrito     *
 * *************** *
 */

app.post("/api/carts", async (req, res) => {
	await cartManager.addCart();
	res.status(200).json({ status: "success", message: "Carrito creado" });
});

app.get("/api/carts", async (req, res) => {
	const carts = await cartManager.getCarts();
	res.status(200).json({ status: "success", carts });
});

app.get("/api/carts/:cid", async (req, res) => {
	const { cid } = req.params;
	let cart;
	try {
		cart = await cartManager.getCartById(cid);
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
	res.status(200).json({ status: "success", cart });
});

app.post("/api/carts/:cid/products/:pid", async (req, res) => {
	const { cid, pid } = req.params;
	try {
		await cartManager.addProductToCart(cid, pid);
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
	res.status(200).json({
		status: "success",
		message: "Producto agregado al carrito",
	});
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
