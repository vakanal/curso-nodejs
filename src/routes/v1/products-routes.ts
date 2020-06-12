import express, { Router } from 'express';
import productsController from '../../controllers/v1/products-controller';

const router: Router = express.Router();

router.post('/create', productsController.createProduct);
router.get('/get-all', productsController.getProducts);
router.get('/get-by-user/:userId', productsController.getProductsByUser);

export default router;
