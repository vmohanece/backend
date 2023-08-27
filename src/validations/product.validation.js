import Joi from "joi";

//Validate product schema
export const productReviewSchema = Joi.object().keys({
    id: Joi.string().required(),
    rating: Joi.number().max(5)
});

export const productUpdateSchema = Joi.object().keys({
    id: Joi.string().required(),
    offerPrice: Joi.number().required()
});

export const login = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().required(),
});
  
export const editProfile = Joi.object().keys({
    name: Joi.string().required().min(3),
    //email: Joi.string().email({ minDomainSegments: 2 }),
    emailOfficial: Joi.string().allow(""),
    emailOther: Joi.string().allow(""),
    mobile: Joi.string().required(),
    home: Joi.string().allow(""),
    work: Joi.string().allow(""),
    mobileOther: Joi.string().allow(""),
    profilePath: Joi.string().allow(""),
    companyName: Joi.string().allow(""),
    designation: Joi.string().allow(""),
    address: Joi.string().allow(""),
    locationHome: Joi.string().allow(""),
    locationOffice: Joi.string().allow(""),
    locationFactory: Joi.string().allow(""),
    locationOther: Joi.string().allow(""),
    businessCardLinkFront: Joi.string().allow(""),
    businessCardLinkBack: Joi.string().allow(""),
    dob: Joi.string().allow(""),
    websiteUrl: Joi.string().allow(""),
    fbLink: Joi.string().allow(""),
    instaLink: Joi.string().allow(""),
    twitterLink: Joi.string().allow(""),
  });