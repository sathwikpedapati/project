const Joi= require('joi');
// const listing=require("./models/init.js");
// const review=require("./models/review.js");
module.exports.listingschema= Joi.object({
    list:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow(" ",null).required(),
        location:Joi.string().required(),
        country:Joi.string().required()
    }).required(),
});
module.exports.reviewschema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required(),
});