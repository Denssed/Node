import staff from '../routes/staffRoute.js'
import login from '../routes/loginRoute.js'
import user from '../routes/userRoute.js'
import presentation from '../routes/presentationRoute.js'
import baptism from '../routes/baptismRoute.js'

const routes = (server) =>{
    server.use('/staff', staff),
    server.use('/login', login),
    server.use('/user', user),
    server.use('/presentation', presentation),
    server.use('/baptism', baptism)
}
export default routes;