const Joi = require("joi")

const validator = (schema) => (payload) => schema.validate(payload);

const hotelSchema = Joi.object({
    name: Joi.string().required(),
    address : Joi.string().required(),
    city : Joi.string().required(),
    state : Joi.string().required(),
    country : Joi.string().required(),
    image : Joi.string(),
    phone : Joi.string().required(),
    email : Joi.string().required(),
    facebook : Joi.string().default(""),
    instagram : Joi.string().default(""),
    whatsapp : Joi.string().default(""),
    location: Joi.object({
        type: Joi.string().valid('Point').required(),  
        coordinates: Joi.array().items(
          Joi.number().required(),  
          Joi.number().required()   
        ).length(2).required() 
      }).required(),
    description : Joi.string().required(),
    rooms: Joi.array().items(Joi.string()).default([]).optional(),
    amenities: Joi.array().items(Joi.string()).default([]).optional(),
    
})

exports.validateHotel = validator(hotelSchema)