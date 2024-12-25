import { useContext } from "react"
import { AuthContext } from "../../providers/Authprovider"

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}


export default useAuth;