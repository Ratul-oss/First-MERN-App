const jwt = require("jsonwebtoken");
const UserData = require("./Model/userSchema");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

    const user = await UserData.findOne({
      _id: verifyUser.id,
    });

    if (!user) {
      throw new Error("User not found");
    }

    req.token = token;
    req.user = user;
    req.userId = user._id;

    next();
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = auth;
