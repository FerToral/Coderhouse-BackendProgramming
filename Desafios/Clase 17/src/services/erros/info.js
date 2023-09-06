export const generateUserErrorInfo = (user) =>{
    return `One or more prOperties were incomplete or not valid. List of required properties:
    
    * first_name : needs to be a String, received ${user.first_name}
    * last_name  : needs to be a String, received ${user.last_name}
    * email      : needs to be a String, received ${user.email}
    * rol        : needs to be a String, received ${user.rol}`
}

export const generateStockErrorInfo = (stock) =>{
    return `Stock ownership does not appear to be a valid value:
    
    * stock        : needs to be a number greater than -1, received ${stock}`
}

export const generateSessionErrorInfo = (stock) =>{
    return `You are not authorized to access the above resources for the following reason:
    
    * Authotetication is required`
}

export const generateAdminErrorInfo = (rol) =>{
    return `You are not authorized to access the above resources for the following reason:
    
    * Rol: you need to be an Admin, current role is: ${rol} `
}