import { UserModel } from '../dao/models/users.model.js';
import { isValidPassword, createHash } from '../utils/bcrypt.js';

export class UserService {
 
  async getAll() {
    const users = await UserModel.find({});
    return users;
  }

  async findUser(email, password) {
    const user = await UserModel.findOne({ email: email });
    if (user && isValidPassword(password, user.password)) {
      return user;
    } else {
      return false;
    }
  }

  async findUserByEmail(email) {
    const user = await UserModel.findOne(
      { email: email },
      {
        _id: true,
        email: true,
        username: true,
        password: true,
        rol: true,
      }
    );
    return user || false;
  }

  async createOne(userToCreate) {
    const existingUser = await this.findUserByEmail(userToCreate.email);

    if (existingUser) {
      throw 'cannot create a user that allready exists';
    }

    userToCreate.password = createHash(userToCreate.password);

    const userCreated = await UserModel.create(userToCreate);

    return userCreated;
  }

  async deletedOne(_id) {
    const deleted = await UserModel.deleteOne({ _id: _id });
    return deleted;
  }

  async updateOne({ _id, email, username, password, rol }) {
    const userUptaded = await UserModel.updateOne(
      {
        _id: _id,
      },
      {
        email,
        username,
        password,
        rol,
      }
    );
    return userUptaded;
  }
}
