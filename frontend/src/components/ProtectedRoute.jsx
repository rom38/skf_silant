import {
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate,
} from 'react-router-dom';
import { selectAuthAccessToken } from "../slicers/authSlice";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const accessToken = useSelector(selectAuthAccessToken);


    if (!accessToken) {
        return <Navigate to="/main" replace />;
    }

    return children;
};

export default ProtectedRoute;