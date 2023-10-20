import EErrors from "../../services/erros/enum.js";
export default (error, req, res, next)=>{
    switch(error.code){
        case EErrors.INVALID_TYPES_ERROR:
            res.send({status:'error', error: error.name})
        case EErrors.NOT_ACCESS_AUTORIZATION:
            res.send({status:'error', error: error.name})
    }
}