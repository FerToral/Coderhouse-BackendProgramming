//@ts-check
import { UserModel } from '../models/users.model.js';


class UserDao {
  async getAll() {
    return await UserModel.find({});
  }

  async getByEmail(email) {
    return await UserModel.findOne(
        { email: email },
        {
          _id: true,
          email: true,
          password: true,
          firstName: true,
          lastName: true,
          rol: true,
          age: true
        }
      );
  }

  async pagination(page){
    return  await UserModel.paginate({}, {limit: 10, page: page || 1});
  }

  async create(user) {
    return await UserModel.create(user);
  }

  async deleteById(_id) {
    return await UserModel.deleteOne({ _id: _id });
  }

  async updateById(_id, updateData) {
    return await UserModel.updateOne({ _id: _id }, updateData);
  }
}

const userDao = new UserDao();
export default userDao;
