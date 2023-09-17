
import { isValidPassword, createHash } from '../utils/bcrypt.js';
import { userDao } from '../dao/factory.js';


export class UserService {
 
  async getAll() {
    const users = await userDao.getAll();
    return users;
  }
  async getUsersPagination(page){
    //TODO
    const users = await userDao.pagination(page);
    return users;
  }
  async findUser(email, password) {
    const user = await userDao.getByEmail(email);
    if (user && isValidPassword(password, user.password)) {
      return user;
    } 
    
    return false;
    
  }

  async findUserByEmail(email) {
    //TODO
    const user = await userDao.getByEmail(email);
    return user || false;
  }

  async createOne(userToCreate) {
    const existingUser = await this.findUserByEmail(userToCreate.email);

    if (existingUser) {
      throw 'cannot create a user that allready exists';
    }

    userToCreate.password = createHash(userToCreate.password);

    const userCreated = await userDao.create(userToCreate);

    return userCreated;
  }

  async deleteOne(_id) {
    const deleted = await await userDao.deleteById(_id);
    return deleted;
  }

  async updateOne(userUpdate) {
    const {_id, ...updateData} = userUpdate
    const userUptaded = await userDao.updateById(_id, updateData);
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
