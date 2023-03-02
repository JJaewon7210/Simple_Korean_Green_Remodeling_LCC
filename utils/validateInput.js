import Joi from 'joi';

// Define the expected schema for the userData object
const userDataSchema = Joi.object({
    buildingType: Joi.string().valid('residential', 'office', 'non-residential').required(),
    card: Joi.string().required()
});

// Validate the userData object against the schema
const { error, value } = userDataSchema.validate(userData);

// Check if there is an error
if (error) {
    console.log(error.details[0].message);
} else {
    console.log(value);
}