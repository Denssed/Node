import product from '../routes/productRoute.js'
import user from '../routes/userRoute.js'
import login from '../routes/loginRoute.js'

const routes = (server) =>{
    server.use('/product', product),
    server.use('/user', user),
    server.use('/login', login)
}
export default routes;