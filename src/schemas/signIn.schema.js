import Joi from "joi";

const signInSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().min(3).required()
});

export default signInSchema;