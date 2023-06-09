import { Routes, Route } from 'react-router-dom';

/*Pages */
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import PublicPage from './pages/PublicPage/PublicPage';
import ResetPage from './pages/ResetPage/ResetPage';

/* Admin Pages */
import InventoryPage from './pages/AdminPage/InventoryPage/InventoryPage'
import AdminPage from './pages/AdminPage/AdminPage';
import ShopPage from './pages/PublicPage/ShopPage/ShopPage'
import ViewDetailPage from './pages/PublicPage/ShopPage/ViewDetailPage';
import CustomerPage from './pages/AdminPage/CustomersPage/CustomersPage'
import ViewDealsPage from './pages/AdminPage/DealsPage/ViewDealsPage';
import UsersPage from './pages/AdminPage/UsersPage/UsersPage';
import MyAccountPage from './pages/AdminPage/MyAccountPage/MyAccountPage';

/*Constants */
import { RoutesConst } from "./constants/AppConstants";
import './App.scss';

export default function App() {

  return (
    <>
        <Routes>
          <Route path={RoutesConst.HOME_ROUTE} element={<PublicPage />}>
              <Route path={''} element={<ShopPage />}/>
              <Route exact path={RoutesConst.VIEW_DETAIL_PAGE_ROUTE} element={<ViewDetailPage />}/>
              <Route path={RoutesConst.RESET_ROUTE} element={<ResetPage />} />
          </Route>
          <Route path={RoutesConst.SIGNUP_ROUTE} element={<SignUpPage />} />
          <Route path={RoutesConst.LOGIN_ROUTE} element={<LoginPage />} />
          <Route path={RoutesConst.ADMIN_ROUTE} element={<AdminPage />}>
              <Route path={''} element={<InventoryPage />}/>
              <Route path={RoutesConst.ADMIN_INVENTORY_ROUTE} element={<InventoryPage />}/>
              <Route path={RoutesConst.ADMIN_CUSTOMERS_ROUTE} element={<CustomerPage />}/>
              <Route exact path={RoutesConst.ADMIN_VIEW_DEALS_ROUTE} element={<ViewDealsPage />}/>
              <Route path={RoutesConst.ADMIN_USERS_ROUTE} element={<UsersPage />}/>
              <Route path={RoutesConst.ADMIN_MY_ACCOUNT_ROUTE} element={<MyAccountPage />}/>
          </Route>
         <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    </>
  );
}