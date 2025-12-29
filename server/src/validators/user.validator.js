import Joi, { ObjectSchema } from 'joi'


const userSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
});

module.exports = {
  userSchema,
};