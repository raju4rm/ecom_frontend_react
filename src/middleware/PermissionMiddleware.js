import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PermissionMiddleware = ({ element }) => {
    const isPermission = useSelector(state => state.permission.isPermission);
    return isPermission ? element : <Navigate to="/permission-denied" />;    
}

export default PermissionMiddleware