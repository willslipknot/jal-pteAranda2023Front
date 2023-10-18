import { Navigate, Outlet } from "react-router-dom"
import { useUser} from './context/user.context.jsx'

function ProtectedRoute(){
    const {loading , isAuthenticated } = useUser()
    console.log(loading, isAuthenticated)

    if(loading) return <h1>loading ...</h1>
    if(!loading && !isAuthenticated) return <Navigate to= '/' replace/>
    return(
        <Outlet/>
    )
}

export default ProtectedRoute;