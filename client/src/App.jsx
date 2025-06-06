import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Order from "./pages/seller/Order";


function App() {

    const isAdminPath = useLocation().pathname.includes('admin');
    const { showUserLogin, isAdmin } = useAppContext();


    return (
        <div className="">
            {!isAdminPath && (
                <div className="px-6 md:px-16 lg:px-24 xl:px-32">
                    <Navbar />
                </div>
            )}

            {showUserLogin ? <Login/> : null}

            <Toaster/>

            <div className={`${isAdminPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<AllProducts />} />
                    <Route path="/products/:category/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/add-address" element={<Address />} />
                    <Route path="/my-orders" element={<MyOrders />} />

                    <Route path="/admin" element={isAdmin ? <SellerLayout/> : <SellerLogin/>}>
                        <Route index element={isAdmin ? <AddProduct/> : null} />
                        <Route path="product-list" element={<ProductList/>} />
                        <Route path="orders" element={<Order/>} />

                    </Route>
                </Routes>
            </div>
        </div>
    )
}

export default App
