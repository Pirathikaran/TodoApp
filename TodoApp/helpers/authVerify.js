const { tokenValidator } = require("./token");

module.exports = async function (req, res, next) {
  try {
    const header = req.headers["authorization"];
    const token = header ? header.split(" ") : null;
    if (token && token[1]) {
      const jwt = token[1];
      const valid = await tokenValidator(jwt);
      if (valid) {
        const user = {};
        user.email = valid.email;
        user.id = valid.id;
        req.user = user;
        next();
      } else {
        res
          .status(401)
          .json({ error: { message: "Invalid login credentials" } });
      }
    } else {
      res.status(401).json({
        error: { message: "You must be identified to access this resource" },
      });
    }
  } catch (error) {
    res.send(error);
  }
};
