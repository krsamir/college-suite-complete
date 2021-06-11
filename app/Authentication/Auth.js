import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded will contain the user id.
    // next find that user with that correct id and token.
    // if (!user) {
    //   throw new Error();
    // }
    // req.token = token;
    req.user = decoded.id;
    req.role = decoded.role;
    next();
  } catch (e) {
    console.log({ error: "Authentication required" });
    res.status(401).send({ error: "Authentication required" });
  }
};
export default auth;
