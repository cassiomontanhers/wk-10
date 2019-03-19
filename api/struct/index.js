const { send, json } = require('micro')
const { struct } = require('superstruct')


const Schema = struct({
  username: 'string',
  password: 'number?'
})

module.exports = async (req, res) => {
  try {
    const data = await json(req)
    Schema(data)
    send(res, 200, data)
  } catch(err) {
    const {message, data, type, value} = err
    send(res, 400, { message, data, type, value } )
  }
}
