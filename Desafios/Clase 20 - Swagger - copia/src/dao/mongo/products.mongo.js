import { ProductsModel } from "../models/products.model.js";
export class ProductDao {
  async getAll() {
    return await ProductsModel.find({});
  }

  async getById(id) {
      const search = await ProductsModel.findById(id);
      return search;
  }

  async create(newProduct) {
    await ProductsModel.create(newProduct);
  }

  async updateById(id, updateData) {
    await ProductsModel.updateOne({ _id: id }, updateData);
  }

  async deleteById(id) {
    await ProductsModel.deleteOne({ _id: id });
  }

  async findByCode(code) {
    return await ProductsModel.find({ code: code });
  }
}

const productDao = new ProductDao();

export default productDao;