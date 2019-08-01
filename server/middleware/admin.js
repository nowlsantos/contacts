function admin(req, res, next) {
    // 401 Unuthorized
    // 403 Forbidden
    if (!req.contact.isAdmin) {
        return res.status(403).send('Access denied');
    }
    next();
}