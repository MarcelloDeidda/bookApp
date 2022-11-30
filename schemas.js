const Joi = require("joi");

module.exports.bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.number().required().min(0),
    summary: Joi.string().allow(null, ""),
    imgUrl: Joi.string().allow(null, "")
}).required()