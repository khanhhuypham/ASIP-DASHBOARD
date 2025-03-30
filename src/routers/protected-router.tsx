import { Navigate, Outlet } from 'react-router-dom';

import CookieUtils from '../utils/cookie-utils';
import { ROUTE_LINK } from './module-router';

export const ProtectedRoutes = () => {
    const token = CookieUtils.getCurrentUser().access_token ?? "";
    if (token === "") {
        return <Navigate to={ROUTE_LINK.LOGIN} replace />;
    }

    return <Outlet />;
};
