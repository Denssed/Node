import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided.'
        })
    }

    try {
        const verified = jwt.verify(token, "testtoken")
        // console.log("req",req.role)
        // console.log("verified",verified.email)
        // console.log("verified ROLE",verified.role.admin)
        req.email = verified.email
        // req.role.admin = verified.role.admin
        // console.log("test",verified)
        next()
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }

}

export {
    verifyToken
}