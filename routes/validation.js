//validation.
const Joi = require('@hapi/joi');

//Registration data validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(4).required().max(24)
    })
    return schema.validate(data)
}

//User login data validation
const loginValidation = (data) => {
    console.log(data)
    const schema = Joi.object({
        email: Joi.string().min(3).required().email(),
        password: Joi.string().required().min(4).max(24)
    })

    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;