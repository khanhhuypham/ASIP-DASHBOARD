import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { LoginPage } from "./features/auth/page/login-page";
import NotFoundPage from "./features/not-found/not-found-page";
import { dashboardRouter } from "./routers/app-router";

import { ProtectedRoutes } from "./routers/protected-router";
import CookieUtils from "./utils/cookie-utils";
import { ROUTE_LINK } from "./routers/module-router";
import { ForgotPasswordPage } from "./features/auth/page/forget-password-page";

const App: React.FC = () => {
    const token = CookieUtils.getCurrentUser().access_token ?? "";

    return (
        <Router>
            <Routes>
                <Route
                    index
                    path={ROUTE_LINK.LOGIN}
                    element={token !== "" ? <Navigate replace to={ROUTE_LINK.DASHBOARD} /> : <LoginPage />}
                />
                <Route
                    path={ROUTE_LINK.FORGOT_PASSWORD}
                    element={<ForgotPasswordPage />}
                />

                <Route element={<Layout />}>
                    <Route element={<ProtectedRoutes />}>
                        {dashboardRouter.map((route, index) => (
                            <Route key={index} path={route.path} element={route.component} />
                        ))}
                    </Route>
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
