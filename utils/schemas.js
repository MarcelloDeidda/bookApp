const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
    type: "string",
    base: joi.string(),
    messages: {
        "string.escapeHtml" : "{{#label}} must not include HTML!"
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean != value) return helpers.error("string.escapeHtml", {value})
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

// Book schema for validation
module.exports.bookSchema = Joi.object({
    title: Joi.string().required().escapeHTML(),
    author: Joi.string().required().escapeHTML(),
    year: Joi.number().required().min(0),
    summary: Joi.string().allow(null, "").escapeHTML(),
    imgUrl: Joi.string().allow(null, "").escapeHTML()
}).required()

// Review schema for validation
module.exports.reviewSchema = Joi.object({
    body: Joi.string().required().escapeHTML(),
    rating: Joi.number().required().min(1).max(5)
}).required()