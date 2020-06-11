const ProductModel = require('../../mongo/models/products-model');

const createProduct = async (req, res) => {
  const { title, desc, price, images, userId } = req.body;

  try {
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

const getProducts = async (req, res) => {
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

const getProductsByUser = async (req, res) => {
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

module.exports = {
  createProduct,
  getProducts,
  getProductsByUser,
};
