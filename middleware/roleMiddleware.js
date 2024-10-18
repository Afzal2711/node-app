export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).send('Access denied');
        }
        next();
    };
};

// export const roleMiddleware = (allowedRoles) => (req, res, next) => {
//     const userRole = req.user.role;
//     if (allowedRoles.includes(userRole)) {
//         return next();
//     }
//     return res.status(403).json({ message: 'Forbidden: You do not have access' });
// };