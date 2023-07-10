const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, encryptPassword) => {
  return await bcrypt.compare(password, encryptPassword);
};

module.exports = {
  encryptPassword,
  comparePassword,
};
