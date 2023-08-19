import { UserModel } from '../dao/models/users.model.js';
import { isValidPassword, createHash } from '../utils/bcrypt.js';

export class UserService {
 
  async getAll() {
    const users = await UserModel.find({});
    return users;
  }
  async getUsersPagination(page){
    //TODO
    const users = await UserModel.paginate({}, {limit: 10, page: page || 1});
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
    //TODO
    const user = await UserModel.findOne(
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

  async deleteOne(_id) {
    const deleted = await UserModel.deleteOne({ _id: _id });
    return deleted;
  }

  async updateOne(userUpdate) {
    const {_id, ...updateData} = userUpdate
    const userUptaded = await UserModel.updateOne({_id: _id,},updateData);
    return userUptaded;
  }

  async paginationProduct(limit, page, query, sort) {
        
    const options = {
      limit: limit,
      page: page,
      ...query,
      sort: sort
    };
  
    const products = await ProductsModel.paginate({}, options);
    const setLinks = () => {
      let prevLink = '';
      let nextLink = '';
  
      products.hasNextPage ? (nextLink = `?limit=${limit}&page=${products.nextPage}&query=${query}&sort=${sort}`) : (nextLink = null);
      products.hasPrevPage ? (prevLink = `?limit=${limit}&page=${products.prevPage}&query=${query}&sort=${sort}`) : (prevLink = null);
      products.prevLink = prevLink;
      products.nextLink = nextLink;
      return products;
    };
    setLinks();
  
    return products;
  }
  
}
