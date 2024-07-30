import { Request, Response } from 'express';
// import { ProductService } from '../services/ProductService';
// import { ProductRepository } from '../repository/ProductRepository';

// const repository = new ProductRepository();
// const service = new ProductService(repository);

export class ProductController {
    static createProduct(req: Request, res: Response): void {
        res.json('Product');
    }

    // static getAllProducts(req: Request, res: Response): void {}

    // static getProductById(req: Request, res: Response): void {}

    // static updateProduct(req: Request, res: Response): void {}

    // static deleteProduct(req: Request, res: Response): void {}
}
