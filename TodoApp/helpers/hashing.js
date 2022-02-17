const bcrypt = require("bcryptjs");
const saltRounds = 10;

const hashGenerate = async (plainpassword) => {
  try {
    const salt = await bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(plainpassword, salt);
  } catch (error) {}
};

const hashValidator = async (plainpassword, hashPassword) => {
  try {
    return await bcrypt.compare(plainpassword, hashPassword);
  } catch (error) {
    return false;
  }
};

module.exports.hashGenerate = hashGenerate;
module.exports.hashValidator = hashValidator;
