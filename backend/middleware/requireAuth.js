const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("Request is not authorize");
  }

  const token = authorization.split(" ")[1];

  try {
    const _id = jwt.verify(token, process.env.SECRET);
    req.user = _id;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Request is not authorize after verify");
  }
};

module.exports = { requireAuth };
