import product from '../routes/productRoute.js'
import staff from '../routes/staffRoute.js'
import login from '../routes/loginRoute.js'
import user from '../routes/userRoute.js'

const routes = (server) =>{
    server.use('/product', product),
    server.use('/staff', staff),
    server.use('/login', login),
    server.use('/user', user)
}
export default routes;