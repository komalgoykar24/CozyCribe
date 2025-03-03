const Joi = require("joi");
const joi=require("joi");

const listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().min(0).required(),
        image: Joi.string().allow(""),
        location:Joi.string().required(),
        country:Joi.string().required(),
       

    }).required()
});

module.exports=listingSchema;

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
    rating:Joi.number().required().min(1).max(5),
    comment:Joi.string().required()
 }).required()
});
