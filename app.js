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

app.use(express.json()); // Middleware que permite que Express entienda JSON
app.use(express.urlencoded({ extended: true })); // Middleware que permite recibir datos de formularios

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
	try {
		const products = await productManager.getProducts();
		res.status(200).json({ status: "success", products });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

app.get("/api/products/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await productManager.getProductById(id);
		res.status(200).json({ status: "success", product });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

app.post("/api/products", async (req, res) => {
	try {
		const product = req.body;
		const newProduct = await productManager.addProduct(product);
		res.status(201).json({ status: "success", product: newProduct });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

app.put("/api/products/:pid", async (req, res) => {
	try {
		const { pid } = req.params;
		const productData = req.body;
		if (productData.id) {
			return res.status(500).json({
				status: "error",
				message: "No se puede cambiar el id",
			});
		}
		const updatedProduct = await productManager.updateProduct(
			pid,
			productData,
		);
		res.status(200).json({ status: "success", product: updatedProduct });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

app.delete("/api/products/:pid", async (req, res) => {
	try {
		const { pid } = req.params;
		await productManager.deleteProduct(pid);
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

/*
 * *************** *
 *     Carrito     *
 * *************** *
 */

app.post("/api/carts", async (req, res) => {
	try {
		const newCart = await cartManager.addCart();
		res.status(201).json({ status: "success", cart: newCart });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

app.get("/api/carts", async (req, res) => {
	try {
		const carts = await cartManager.getCarts();
		res.status(200).json({ status: "success", carts });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

app.get("/api/carts/:cid", async (req, res) => {
	try {
		const { cid } = req.params;
		const cart = await cartManager.getCartById(cid);
		res.status(200).json({ status: "success", cart });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

app.post("/api/carts/:cid/products/:pid", async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const updatedCart = await cartManager.addProductToCart(cid, pid);
		res.status(201).json({
			status: "success",
			cart: updatedCart,
		});
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
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
