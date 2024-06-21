import jwt from 'jsonwebtoken';

class AuthMiddleWare{
    static authMiddleware = (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            req.userId = decoded.userId;
            next();
        });
    };
}


export default AuthMiddleWare;
