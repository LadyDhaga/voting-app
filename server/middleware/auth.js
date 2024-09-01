const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    // Extract token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Verify the token using the secret key
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        // Token verification failed
        return res.status(401).json({
          success: false,
          message: 'Failed to authenticate token',
        });
      } else {
        // Token is valid, attach decoded payload to request
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // No token provided in the request
    return res.status(403).json({
      success: false,
      message: 'No token provided',
    });
  }
};
