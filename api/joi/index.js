const Joi = require('joi');
const { send, json } = require('micro')

const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(6).max(16).required(),
    password: Joi.number().min(6).required()
}).with('username', 'password');

module.exports = async (req, res) => {
  try {
    const data = await json(req)
    const result = Joi.validate(data, schema);
    send(res, 200, result)
  } catch(err) {
    // send(res, 400, err )
    const {message, data, type, value} = err
    send(res, 400, { message, result, type, value } )
  }
}
