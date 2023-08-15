import Joi from "joi";

const signUpSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().min(3).required(),
    name: Joi.string().trim().required(),
    photo: Joi.string().trim().uri({ scheme: ['http', 'https'] }).required()
});

export default signUpSchema;