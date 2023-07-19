import { Request, Response, Router } from "express";
import { adaptRequest, httpRequest } from "../helper";

import ProductsService, { IProductsService } from "./ProductService";
import { ProductRepository } from "./repositories";

const router = Router();

const ProductsRepository = new ProductRepository();

const productService: IProductsService = new ProductsService(
  ProductsRepository
);

router.post("/", makeRegistrationController("createProduct", productService));
router.put(
  "/:productName",
  makeRegistrationController("updateProduct", productService)
);
router.get(
  "/all",
  makeRegistrationController("getAllProducts", productService)
);
router.get(
  "/search/:searchTerm",
  makeRegistrationController("searchProduct", productService)
);
router.get(
  "/:productName",
  makeRegistrationController("getProduct", productService)
);
router.delete(
  "/:productName",
  makeRegistrationController("deleteProduct", productService)
);

function makeRegistrationController(
  action: keyof IProductsService,
  handler: IProductsService
) {
  return async function controller(req: Request, res: Response) {
    const httpRequest: httpRequest = adaptRequest(req);
    const { headers, status, data } = await handler[action](httpRequest);
    res.status(status).set(headers).json(data);
  };
}

export default router;
