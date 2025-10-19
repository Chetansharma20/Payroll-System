import jwt from "jsonwebtoken";

 const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach token data to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
 const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient privileges" });
    }
    next();
  };
};
export {verifyToken , verifyRole};
