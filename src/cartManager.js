import { v4 as newId } from "uuid";
import fs from "fs/promises";

export class CartManager {
	constructor(path) {
		this.path = path;
	}

	async addCart() {
		try {
			const carts = await this.getCarts();
			const id = newId();
			const newCart = {
				id,
				products: [],
			};
			carts.push(newCart);
			await fs.writeFile(
				this.path,
				JSON.stringify(carts, null, 2),
				"utf-8",
			);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getCarts() {
		try {
			const cartJson = await fs.readFile(this.path, "utf-8");
			const carts = JSON.parse(cartJson);
			return carts;
		} catch (error) {
			throw new Error("Error al obtener los carritos");
		}
	}

	async getCartById(cartId) {
		try {
			const carts = await this.getCarts();
			const cartFound = carts.find((cart) => cart.id === cartId);
			if (!cartFound) throw new Error("El carrito no existe");
			return cartFound;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async addProductToCart(cartId, productId) {
		try {
			const carts = await this.getCarts();

			const cartFound = carts.find((cart) => cart.id === cartId);
			if (!cartFound) throw new Error("El carrito no existe");

			const products = JSON.parse(
				await fs.readFile("./src/data/products.json", "utf-8"),
			);
			const productFound = products.find(
				(product) => product.id === productId,
			);
			if (!productFound) throw new Error("El producto no existe");

			const productInCart = cartFound.products.find(
				(product) => product.id === productId,
			);

			if (productInCart) {
				productInCart.quantity += 1;
			} else {
				cartFound.products.push({
					id: productId,
					quantity: 1,
				});
			}

			const updatedCart = {
				id: cartId,
				products: cartFound.products,
			};

			const updatedCarts = carts.map((cart) =>
				cart.id === cartId ? updatedCart : cart,
			);

			await fs.writeFile(
				this.path,
				JSON.stringify(updatedCarts, null, 2),
				"utf-8",
			);
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
