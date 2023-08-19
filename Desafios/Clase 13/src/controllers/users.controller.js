//@ts-check
import { userService } from "../utils/utils";

class UserController{
    async getUsersPagination(req, res){
      try {

        const { page /* , limit, query, sort */ } = req.query;
        const users = await userService.getUsersPagination(page);
        //TODO DTO
        const usersObj = users.docs.map((user) => {
          return {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          };
        });

        return res.status(200).render('usuarios', {
          usuarios: usersObj,
          pagingCounter: users.pagingCounter,
          totalPages: users.totalPages,
          page: users.page,
          hasPrevPage: users.hasPrevPage,
          hasNextPage: users.hasNextPage,
          prevPage: users.prevPage,
          nextPage: users.nextPage /* ,: users., links */,
          /* links: links, */
        });
      } catch (error) {
        return res.status(500).json({error: 'Internal server error'})
      }
  }

  async getUsers(req,res){
    try {
      const users = await userService.getAll();
 
      return res.status(200).json({
        status: 'success',
        msg: 'listado de usuarios',
        data: users,
      });
    } catch (e) {
     
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
      });
    }
  }

  async post(req,res){
    try {
      const { firstName, lastName, email, password, rol } = req.user;
      
      const userCreated = await userService.createOne({
        firstName, 
        lastName, 
        email,
        password,
        rol
      });
      return res.status(201).json({
        status: 'success',
        msg: 'user created',
        payload: {
                  _id: userCreated._id,
                  email: userCreated.email,
                  password: userCreated.password,
                  rol: userCreated.rol,
              },
      });
    } catch (e) {
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        payload: {},
      });
    }
  }

  async delete(req, res){
    try {
      const { _id } = req.params;
      const result = await userService.deleteOne(_id);
  
      if (result?.deletedCount > 0) {
        return res.status(200).json({
          status: "success",
          msg: "user deleted",
          payload: {},
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "user not found",
          payload: {},
        });
      }
    } catch (e) {
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  }
  
  async put(req, res){
    try {
      const { _id } = req.params;
      const { firstName, lastName, email, password, rol, age } = req.user;
  
  
      const userUpdated = await userService.updateOne({
        _id,
        firstName, 
        lastName, 
        email, 
        password, 
        rol, 
        age
      });

      if (userUpdated.matchedCount > 0) {
        return res.status(201).json({
          status: "success",
          msg: "user uptaded",
          payload: {},
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "user not found",
          payload: {},
        });
      }
    } catch (e) {
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
      });
    }
  }
  

}

export const userController = new UserController();