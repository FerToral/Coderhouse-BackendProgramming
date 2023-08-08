

class UsersController{
    getPagination(req, res){
        const { page /* , limit, query, sort */ } = req.query;
  console.log(page);
  //TODO
  const users = await UserModel.paginate({}, { limit: /*  limit || */ 10, page: page || 1 });
  let usuarios = users.docs.map((user) => {
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  });

  return res.status(200).render('usuarios', {
    //status:success/error
    //payload: en vez de usuarios como nombre de la propiedad
    usuarios: usuarios,
    //buscar en las diapositivas exactamente cuales hay que enviar
    pagingCounter: users.pagingCounter,
    totalPages: users.totalPages,
    page: users.page,
    hasPrevPage: users.hasPrevPage,
    hasNextPage: users.hasNextPage,
    prevPage: users.prevPage,
    nextPage: users.nextPage /* ,: users., links */,
    /* links: links, */
  });
    }
}

export const usersController = new UsersController();