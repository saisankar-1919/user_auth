const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type ValidateToken{
    isValid: Boolean
    message:String,
    user_id:Int,
    role_id:Int
}

type Query{
validateToken: ValidateToken
}
`)