const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../../mongo/models/users-model');
const ProductModel = require('../../mongo/models/products-model');

const expiresIn = 3600;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn }
        );
        res.send({ status: 'OK', data: { token, expiresIn } });
      } else {
        res.status(403).send({ status: 'INVALID_PASSWORD', message: '' });
      }
    } else {
      res.status(401).send({ status: 'USER_NOT_FOUND', message: '' });
    }
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const createUser = async (req, res) => {
  const { username, email, password, data } = req.body;
  try {
    const hash = await bcrypt.hash(password, 15);
    await UserModel.create({
      username,
      email,
      data,
      password: hash,
    });
    res.send({ status: 'OK', message: 'User Created' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.sessionData;
    const { username, email, data } = req.body;
    await UserModel.findByIdAndUpdate(userId, {
      username,
      email,
      data,
    });
    res.send({ status: 'OK', message: 'User Updated' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw new Error('Missing param userId');
    }
    await UserModel.findByIdAndDelete(userId);
    await ProductModel.deleteMany({ user: userId });
    res.send({ status: 'OK', message: 'User Deleted' });
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select({
      password: 0,
      role: 0,
      __v: 0,
    });
    res.send({ status: 'OK', data: users });
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  login,
};
