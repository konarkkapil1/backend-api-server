// import { celebrate, Joi, Segments } from 'celebrate';
import { NextFunction } from 'express'
import { body } from 'express-validator';

// const SignupValidator = () => {
//     return celebrate({
//     [Segments.BODY]: 
//         Joi.object().keys({
//             name: Joi.string().required(),
//             password: Joi.string().required(),
//             email: Joi.string().required(),
//             profilePicUrl: Joi.string()
//         })
//     });
// }

const SignupValidator = () => {
    return [
        body('name').isString().trim().escape().notEmpty(),
        body('email').isEmail().normalizeEmail().trim().notEmpty(),
        body('password').trim().notEmpty()
    ];
}


export default SignupValidator;