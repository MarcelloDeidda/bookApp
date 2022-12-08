const Joi = require("joi");

// Book schema for validation
module.exports.bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.number().required().min(0),
    summary: Joi.string().allow(null, ""),
    imgUrl: Joi.string().allow(null, "")
}).required()

// Review schema for validation
module.exports.reviewSchema = Joi.object({
    body: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5)
}).required()