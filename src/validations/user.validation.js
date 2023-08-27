import Joi from "joi";

//Validate user schema
export const userSchema = Joi.object().keys({
    name: Joi.string().required().min(3),
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().required().min(4),
    mobile: Joi.string().allow(""),
    dob: Joi.string().allow("")
});

export const login = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().required(),
});
  
export const editProfile = Joi.object().keys({
    name: Joi.string().required().min(3),
    mobile: Joi.string().required(),
    dob: Joi.string().allow("")
  });