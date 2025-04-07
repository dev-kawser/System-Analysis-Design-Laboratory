import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";


function App() {

    const isSellerPath = useLocation().pathname.includes('seller');
    const { showUserLogin } = useAppContext();


    return (
        <div>
            {!isSellerPath && (
                <div className="px-6 md:px-16 lg:px-24 xl:px-32">
                    <Navbar />
                </div>
            )}

            {showUserLogin ? <Login/> : null}

            <Toaster/>

            <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
            {/* {!isSellerPath && } */}
        </div>
    )
}

export default App
