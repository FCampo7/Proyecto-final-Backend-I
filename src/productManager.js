import { v4 as newId } from "uuid";
import fs from "fs/promises";

export class ProductManager {
	constructor(path) {
		this.path = path;
		this.#init();
	}

	// Si el archivo products.json no existe en la ruta especificada, lo crea cuando se crea una instancia de la clase ProductManager
	async #init() {
		try {
			await fs.access(this.path);
		} catch (error) {
			await fs.writeFile(this.path, JSON.stringify([]), "utf-8");
		}
	}

	verifyCode(code, products) {
		return products.some((product) => product.code === code);
	}

	async addProduct(product) {
		try {
			const products = await this.getProducts();

			// Antes que nada verificamos que no se repite ningún producto
			const codeUsed = this.verifyCode(product.code, products);

			if (codeUsed) throw new Error("El producto ya existe");

			const id = newId();

			const newProduct = {
				id,
				...product,
			};

			products.push(newProduct);

			await fs.writeFile(
				this.path,
				JSON.stringify(products, null, 2),
				"utf-8",
			);

			return newProduct;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getProducts() {
		try {
			const productJson = await fs.readFile(this.path, "utf-8");
			const products = JSON.parse(productJson);
			return products;
		} catch (error) {
			throw new Error("Error al obtener los productos");
		}
	}

	async getProductById(productId) {
		try {
			const products = await this.getProducts();
			const productFound = products.find(
				(product) => product.id === productId,
			);
			if (!productFound) throw new Error("El producto no existe");
			return productFound;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async updateProduct(productId, productData) {
		try {
			const products = await this.getProducts();

			const productFound = products.findIndex(
				(product) => product.id === productId,
			);
			if (productFound === -1) throw new Error("El producto no existe");

			products[productFound] = {
				...products[productFound],
				...productData,
			};

			await fs.writeFile(
				this.path,
				JSON.stringify(products, null, 2),
				"utf-8",
			);

			return products[productFound];
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async deleteProduct(productId) {
		try {
			const products = await this.getProducts();
			const productFound = products.find(
				(product) => product.id === productId,
			);

			if (!productFound) throw new Error("El producto no existe");

			const updatedProducts = products.filter(
				(product) => product.id !== productId,
			);

			await fs.writeFile(
				this.path,
				JSON.stringify(updatedProducts, null, 2),
				"utf-8",
			);
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
