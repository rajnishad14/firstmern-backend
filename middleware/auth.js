import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const isCustomAuth = token.length < 500
    let decode
    if (token && isCustomAuth) {
      decode = jwt.verify(token, 'mysecret')
      req.userId = decode?.id
    } else {
      decode = jwt.decode(token)
      req.userId = decode?.sub
    }
    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth
