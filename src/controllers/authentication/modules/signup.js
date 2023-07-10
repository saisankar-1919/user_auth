const { PrismaClient } = require("@prisma/client");
const { encryptPassword } = require("../../../helpers/passwordUtils");
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

module.exports = async (args, req) => {
  try {
    if (!args.email || !args.password) {
      return {
        token: null,
        error: {
          code: 400,
          message: "Email and Password are required",
        },
      };
    }

    const hashPassword = await encryptPassword(args.password);

    const createUser = await prisma.users.create({
      data: {
        name: args.name,
        email: args.email,
        phone: args.phone,
        password: hashPassword,
      },
    });

    if (!createUser) {
      return {
        token: null,
        error: {
          code: 500,
          message: "Something went wrong",
        },
      };
    }

    const token = jwt.sign({ id: createUser.id }, process.env.JWT_SECRET);

    await prisma.users.update({
      where: {
        id: createUser.id
      },
      data: {
        auth_token: token,
      },
    });

    return {
      token: token,
      error: null,
    };
  } catch (err) {
    console.error(err);
    return {
      token: null,
      error: {
        code: 500,
        message: "Something went wrong",
      },
    };
  }
};
