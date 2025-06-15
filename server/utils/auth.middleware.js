import jwt from "jsonwebtoken";
import USER from "../../src/utils/models/user.model.js";
import "dotenv/config";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await USER.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found - Invalid Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(
      "Error while authenticating user in middleware ",
      error.message
    );
  }
};
