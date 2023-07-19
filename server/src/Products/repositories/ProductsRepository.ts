import { generateFakeProduct } from "../../helper/faker";
import { Product } from "../entities";

class ProductRepository {
  private products: Product[] = Array.from({ length: 5 }, generateFakeProduct);

  // Create a new product
  create(product: Product): Product {
    const newProduct: Product = {
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // Search for products by name
  searchByName(searchTerm: string): Product[] {
    const regex = new RegExp(searchTerm, "i");
    return this.products.filter((product) => regex.test(product.name));
  }

  // Get all products
  getAll(): Product[] {
    return this.products;
  }

  // Get a product by name
  getByName(name: string): Product | undefined {
    return this.products.find((product) => product.name === name);
  }

  // Update a product
  update(product: Product): Product | undefined {
    const index = this.products.findIndex((p) => p.name === product.name);
    if (index !== -1) {
      this.products[index] = product;
      return this.products[index];
    }
    return undefined;
  }

  // Delete a product by name
  deleteByName(name: string): boolean {
    const index = this.products.findIndex((product) => product.name === name);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default ProductRepository;
