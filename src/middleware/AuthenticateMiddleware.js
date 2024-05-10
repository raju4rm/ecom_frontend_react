import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthenticateMiddleware = ({ element }) => {
    const isAuthenticated = useSelector(state => state.login.isAuthenticated);
    return isAuthenticated ? element : <Navigate to="/login" />;    
}

export default AuthenticateMiddleware