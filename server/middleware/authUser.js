import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // 1️⃣ Try to get token from Authorization header
    let token = req.headers["authorization"]?.split(" ")[1];

    // 2️⃣ If not in header, try to get token from cookie
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    req.userId = decoded.id; // attach user ID to request
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
  }
};

export default authUser;