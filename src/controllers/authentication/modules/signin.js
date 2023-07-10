const { PrismaClient } = require("@prisma/client");
const { comparePassword } = require("../../../helpers/passwordUtils");
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

    const user = await prisma.users.findUnique({
      where: {
        email: args.email,
      },
    });

    if (!user) {
      return {
        token: null,
        error: {
          code: 400,
          message: "User does not exist",
        },
      };
    }

    const passwordMatch = await comparePassword(args.password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ user_id: user.id, role_id: user.user_role_id }, process.env.JWT_SECRET);
      return {
        token,
        error: null,
      };
    }

    return {
      token: null,
      error: {
        code: 400,
        message: "Wrong password",
      },
    };
  } catch (err) {
    console.log(err);
    return {
      token: null,
      error: {
        code: 400,
        message: "Something went wrong",
      },
    };
  }
};
