import { makeHttpError, makeHttpResponse } from "../helper";
import { httpRequest } from "../helper/adapt-request";
import { Product } from "./entities";
import { ProductRepository } from "./repositories";

import ReqValidation from "./utilities";

export interface IProductsService {
  createProduct(req: httpRequest): Promise<any>;
  getProduct(req: httpRequest): Promise<any>;
  searchProduct(req: httpRequest): Promise<any>;
  getAllProducts(req: httpRequest): Promise<any>;
  updateProduct(req: httpRequest): Promise<any>;
  deleteProduct(req: httpRequest): Promise<any>;
}

class ProductsService implements IProductsService {
  constructor(public productsRepository: ProductRepository) {}

  async searchProduct(req: httpRequest): Promise<any> {
    const searchTerm = req.pathParams.searchTerm;

    const { error } = ReqValidation.validateName.validate(searchTerm);
    if (error) return makeHttpError(400, error.message);

    const products = this.productsRepository.searchByName(searchTerm);
    return makeHttpResponse(200, { products });
  }

  async createProduct(req: httpRequest): Promise<any> {
    const product = req.body;
    const { error } = ReqValidation.addProduct.validate(product);
    if (error) return makeHttpError(400, error.message);

    if (this.productsRepository.getByName(product.name))
      return makeHttpError(409, "product already exist");

    this.productsRepository.create(product);

    return makeHttpResponse(200, product);
  }

  async getProduct(req: httpRequest): Promise<any> {
    const productName = req.pathParams.productName;

    const { error } = ReqValidation.validateName.validate(productName);
    if (error) return makeHttpError(400, error.message);

    const product = this.productsRepository.getByName(productName);
    if (!product) return makeHttpError(404, "Product not found");

    return makeHttpResponse(200, product);
  }

  async getAllProducts(req: httpRequest): Promise<any> {
    const products: Product[] = this.productsRepository.getAll();

    return makeHttpResponse(200, { products });
  }

  async updateProduct(req: httpRequest): Promise<any> {
    const product = req.body;

    const { error } = ReqValidation.addProduct.validate(product);
    if (error) return makeHttpError(400, error.message);

    if (!this.productsRepository.getByName(product.name))
      return makeHttpError(409, "product doesn't exist");

    this.productsRepository.update(product);

    return makeHttpResponse(200, product);
  }

  async deleteProduct(req: httpRequest): Promise<any> {
    const productName = req.pathParams.productName;

    const { error } = ReqValidation.validateName.validate(productName);
    if (error) return makeHttpError(400, error.message);

    if (!this.productsRepository.getByName(productName))
      return makeHttpError(409, "product doesn't exist");

    const isDeleted = this.productsRepository.deleteByName(productName);

    if (!isDeleted) return makeHttpError(500, "server error");

    return makeHttpResponse(200, {});
  }
}

export default ProductsService;
