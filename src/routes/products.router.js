import express from "express";
import { ProductManager } from "../productManager.js";
import path from "path";

const pathFile = path.join(process.cwd(), "src", "data", "products.json");
const productManager = new ProductManager(pathFile);

export const productsRouter = express.Router();

/*
 * *************** *
 *    Productos    *
 * *************** *
 */

productsRouter.get("/", async (req, res) => {
	try {
		const products = await productManager.getProducts();
		res.status(200).json({ status: "success", products });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

productsRouter.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await productManager.getProductById(id);
		res.status(200).json({ status: "success", product });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

productsRouter.post("/", async (req, res) => {
	try {
		const product = req.body;
		const newProduct = await productManager.addProduct(product);
		res.status(201).json({ status: "success", product: newProduct });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

productsRouter.put("/:pid", async (req, res) => {
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

productsRouter.delete("/:pid", async (req, res) => {
	try {
		const { pid } = req.params;
		await productManager.deleteProduct(pid);
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});
