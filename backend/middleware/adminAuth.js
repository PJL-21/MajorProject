const isAdmin = (req, res, next) => {
  // Check if the user is authenticated and has admin role
  if (req.user && req.user.role === 'admin') {
    // Allow access to the route
    return next();
  }
  // If not an admin, return a 403 Forbidden response
  return res.status(403).json({ message: 'Unauthorised' });
};

module.exports = isAdmin;