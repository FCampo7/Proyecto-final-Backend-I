import express from "express";
import { CartManager } from "../cartManager.js";
import path from "path";

export const cartsRouter = express.Router();

const pathCartFile = path.join(process.cwd(), "src", "data", "carts.json");
const cartManager = new CartManager(pathCartFile);

/*
 * *************** *
 *     Carrito     *
 * *************** *
 */

cartsRouter.post("/", async (req, res) => {
	try {
		const newCart = await cartManager.addCart();
		res.status(201).json({ status: "success", cart: newCart });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

cartsRouter.get("/", async (req, res) => {
	try {
		const carts = await cartManager.getCarts();
		res.status(200).json({ status: "success", carts });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

cartsRouter.get("/:cid", async (req, res) => {
	try {
		const { cid } = req.params;
		const cart = await cartManager.getCartById(cid);
		res.status(200).json({ status: "success", cart });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const quantity = req.body?.quantity || 1;

		const updatedCart = await cartManager.addProductToCart(
			cid,
			pid,
			quantity,
		);
		res.status(201).json({
			status: "success",
			cart: updatedCart,
		});
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});
