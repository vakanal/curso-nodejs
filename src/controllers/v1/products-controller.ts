import { Request, Response } from 'express';
import ProductModel from '../../mongo/models/products-model';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, desc, price, images, userId } = req.body;
    const product = await ProductModel.create({
      title,
      desc,
      price,
      images,
      user: userId,
    });
    res.send({ status: 'OK', data: product });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductModel.find({
      price: { $lt: 10 }
    })
      .select('title desc price')
      .populate('user', 'username email data role');
    res.send({ status: 'OK', data: products });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const getProductsByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductModel.find({
      user: req.params.userId,
    });
    //.select('title desc price')
    //.populate('user', 'username email data role');
    res.send({ status: 'OK', data: products });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

export default { createProduct, getProducts, getProductsByUser };
