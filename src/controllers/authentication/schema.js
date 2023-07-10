const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Signup{
    token: String
    error: Error
}

type Signin{
    token:String
    error: Error
}

type Error{
    code: Int,
    message: String
}

type Query{
signup(email:String!, password:String!, name:String, phone:String): Signup
signin(email:String!, password:String!): Signin
}
`)