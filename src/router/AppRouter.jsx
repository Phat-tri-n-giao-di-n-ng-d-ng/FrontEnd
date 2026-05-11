import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ProtectedRoute from "../services/ProtectedRoute";

// Pages and Components
import Layout from "../pages/Layout/Layout";
import Content from "../components/Content/Content";
// import Contact from "../components/Contact";
// import About from "../components/About";
// import LoginWave from "../pages/login/LoginWave";
// import Login from "../pages/login/Login";
// import Profile from "../pages/Profile/Profile";
// import Laptop from "../pages/Laptops/Laptops";
// import Desktop from "../pages/Desktops/Desktops";
// import NetWorking from "../pages/Networking_devices/Networking_devices";
// import Printer_Scanner from "../pages/Printer_scanner/Printer_scanner";
// import PC_Part from "../pages/Pc_parts/PC_Part";
import All_Product from "../pages/All_Products/All_Products";
// import Repair from "../pages/Repair/Repair";
// import Our_Deal from "../pages/Our_Deal/Our_Deal";
// import Card from "../pages/Card/Card";
import Catalog from "../pages/Laptops/Catalog";
// import FAQ from "../pages/faq/FAQ";
// import ShoppingCartItem from "../pages/ShoppingCard/ShoppingCardItem";
// import ShoppingCard_CheckOut from "../pages/ShoppingCard/ShoppingCard_CheckOut";
// import ProductDetail from "../components/product/ProductDetail";
// import ProductSpeccs from "../components/product/ProductSpecss";
// import Admin from "../pages/AdminLayout/AdminLayout";
// import ProductAbout from "../components/product/ProductAbout";
// import Product from "../components/product/Product";
import ScrollToTop from "../components/option/ScrollToTop";
// import VIPCalendar from "../pages/Calendar/VIPCalendar";
// import ThankYouPage from "../pages/ShoppingCard/ThankForShopping";
// import ReviewsPage from "../pages/Reviews/ReviewsPage";
// import MessagesPage from "../pages/Messages/MessagesPage";
// import DiscountsPage from "../pages/Discounts/DiscountsPage";
// import PermissionsPage from "../pages/Permissions/PermissionsPage";

// New 2025 Ecommerce Pages
// import Deals from "../pages/Deals/Deals";
// import NewArrivals from "../pages/NewArrivals/NewArrivals";
// import Brands from "../pages/Brands/Brands";
// import TrackOrder from "../pages/TrackOrder/TrackOrder";
// import Blog from "../pages/Blog/Blog";

// Management Pages
// import Appointments from "../pages/Appointments/Appointments";
// import Warranties from "../pages/Warranties/Warranties";
// import CustomerManagement from "../pages/Customers/CustomerManagement";
// import PromotionsManagement from "../pages/Promotions/PromotionsManagement";
// import CategoriesManagement from "../pages/Categories/CategoriesManagement";
// import StaffManagement from "../pages/Staff/StaffManagement";
// import CustomerServiceDashboard from "../pages/CustomerService/CustomerServiceDashboard";
// import ToastDemo from "../pages/ToastDemo/ToastDemo";
// import I18nDemo from "../pages/I18nDemo/I18nDemo";
import { useTranslation } from 'react-i18next';

const AppRouter = () => {
  const { t } = useTranslation();

  const { getUserRole, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
      </div>
    );
  }

  const userRole = getUserRole();
  console.log("Current user role:", userRole);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        {/* <Route path="/login" element={<LoginWave />} /> */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRoles={["manager"]}>
              <Outlet /> 
            </ProtectedRoute>
          }
        >

          {/* Manager routes 
          
          */}
          {/* <Route index element={<Admin />} /> 
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="messages" element={<MessagesPage />} /> 
          <Route path="discounts" element={<DiscountsPage />} />
          <Route path="permissions" element={<PermissionsPage />} />  */}
        
        </Route>
        {/* Customer/public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Content />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} /> 
          {/* <Route path="laptops" element={<Laptop />} />
          <Route path="laptops/catalog" element={<Catalog />} />
          {/* <Route path="faq" element={<FAQ />} />
          <Route path="desktops" element={<Desktop />} />
          <Route path="networking_devices" element={<NetWorking />} />
          <Route path="printer_scanner" element={<Printer_Scanner />} />
          <Route path="pc_parts" element={<PC_Part />} /> */}
          <Route path="all_products" element={<All_Product />} />
          {/* <Route path="repair" element={<Repair />} />
          <Route path="our_deal" element={<Our_Deal />} />
          <Route path="thank_for_shopping" element={<ThankYouPage />} /> */}

          {/* New 2025 Ecommerce Pages */}
          {/* <Route path="deals" element={<Deals />} />
          <Route path="new-arrivals" element={<NewArrivals />} />
          <Route path="brands" element={<Brands />} />
          <Route path="track-order" element={<TrackOrder />} />
          <Route path="blog" element={<Blog />} /> */}

          {/* Management Pages */}
          {/* <Route path="warranties" element={<Warranties />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="promotions" element={<PromotionsManagement />} />
          <Route path="categories" element={<CategoriesManagement />} />
          <Route path="staff" element={<StaffManagement />} /> */}
          {/* <Route path="customer-service" element={<CustomerServiceDashboard />} /> */}

          {/* Protected customer routes */}
          {/* <Route
            path="profile"
            element={
              <ProtectedRoute requiredRoles={["customer"]}>
                <Profile />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="card"
            element={
              <ProtectedRoute requiredRoles={["customer"]}>
                <Card />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="shopping_card_checkout"
            element={
              // <ProtectedRoute requiredRoles={["customer"]}>
              // </ProtectedRoute>
              <ShoppingCard_CheckOut />
            }
          /> */}
          {/* <Route
            path="shopping_card_item"
            element={
              // <ProtectedRoute requiredRoles={["customer"]}>
              <ShoppingCartItem />
              // </ProtectedRoute>
            }
          /> */}
          {/* Product routes */}
          {/* <Route path="/product/:id" element={<Product />}>
            <Route path="productAbout" element={<ProductAbout />} />
            <Route path="productDetail" element={<ProductDetail />} />
            <Route path="productSpeccs" element={<ProductSpeccs />} />
            <Route index element={<ProductAbout />} />
          </Route> */}
          {/* Catalog route */}
          <Route path="/products" element={<Catalog />} />
          
          {/* Toast Demo */}
          {/* <Route path="/toast-demo" element={<ToastDemo />} /> */}
          
          {/* I18n Demo */}
          {/* <Route path="/i18n-demo" element={<I18nDemo />} /> */}
        </Route>

        {/* Redirect based on role */}
        <Route
          path="/dashboard"
          element={
            userRole === "manager" ? (
              <Navigate to="/admin" />
            ) : userRole === "employee" ? (
              <Navigate to="/employee" />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Catch all - 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
