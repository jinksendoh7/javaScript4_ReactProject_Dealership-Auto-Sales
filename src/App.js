import {Routes, Route} from 'react-router-dom';

/*Pages */
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import PublicPage from './pages/PublicPage/PublicPage';
import InventoryPage from './pages/AdminPage/InventoryPage/InventoryPage'
import DashboardPage from "./pages/AdminPage/DashboardPage/DashboardPage";
import AdminPage from './pages/AdminPage/AdminPage';
/*Constants */
import { RoutesConst } from "./constants/AppConstants";

import './App.scss';

export default function App () {
 

  return (
    <>
      <main className="page">
        <Routes>
          <Route index element={<PublicPage />} />
          <Route path={RoutesConst.SIGNUP_ROUTE} element={<SignUpPage />} />
          <Route path={RoutesConst.LOGIN_ROUTE} element={<LoginPage />} />
          <Route path={RoutesConst.ADMIN_ROUTE} element={<AdminPage />}>
          <Route path={''} element={<DashboardPage />}/>
              <Route path={RoutesConst.ADMIN_DASHBOARD_ROUTE} element={<DashboardPage />}/>
              <Route path={RoutesConst.ADMIN_INVENTORY_ROUTE} element={<InventoryPage />}/>
          </Route>
         <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </main>
    </>
  );
}


