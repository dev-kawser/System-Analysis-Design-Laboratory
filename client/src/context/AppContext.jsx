import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})


    //fetch admin status
    const fetchAdmin = async () => {
        try {
            const { data } = await axios.get('/api/admin/is-auth');

            if (data.success) {
                setIsAdmin(true);
            } else{
                setIsAdmin(false);
            }
        } catch (error) {
            setIsAdmin(false);
            console.log(error);
        }
    }

    //fetch user auth status, user data and cart details
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth');

            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems);
            }
        } catch (error) {
            setUser(null);
            console.log(error);
        }
    }


    //fetching all products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list');

            if (data.success) {
                setProducts(data.products)
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //adding product to cart
    // const addToCart = (itemId) => {
    //     let cartData = structuredClone(cartItems);

    //     if (cartData[itemId]) {
    //         cartData[itemId] += 1;
    //     }
    //     else{
    //         cartData[itemId] = 1;
    //     }
    //     setCartItems(cartData);
    //     toast.success("Added to Cart");
    // }
    const addToCart = (itemId) => {
        setCartItems(prevItems => {
            const newItems = { ...prevItems }; // Create a copy
            newItems[itemId] = (newItems[itemId] || 0) + 1; // Safely increment
            return newItems;
        });
        toast.success("Added to Cart");
    };

    //update cart items
    const updateCartItems = (itemId, quantity) =>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Updated");
    }

    //removing item from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Removed from Cart.");
        setCartItems(cartData);
    }

    // get cart item count
    const getCartCount = () => {
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    // get cart total amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect( ()=> {
        fetchProducts();
        fetchAdmin();
        fetchUser();
    },[]);

    //update cart items in database
    // useEffect( ()=>{
    //     const updateCart = async () => {
    //         try {
    //             const { data } = await axios.post('/api/cart/update', {cartItems})

    //             if (!data.success) {
    //                 toast.error(data.message)
    //             }
    //         } catch (error) {
    //             toast.error(error.message)
    //         }
    //     }

    //     if (user) {
    //         updateCart()
    //     }
    // }, [cartItems])
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', {
                    cartItems,
                    userId: user._id // Include userId in the request
                });

                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to update cart");
            }
        };

        if (user?._id) { // Only run if user exists and has _id
            updateCart();
        }
    }, [cartItems, user]); // Add user to dependency array

    const value ={
        navigate,
        user,
        setUser,
        isAdmin,
        setIsAdmin,
        showUserLogin,
        setShowUserLogin,
        products,
        setProducts,
        fetchProducts,
        currency,
        cartItems,
        setCartItems,
        addToCart,
        updateCartItems,
        removeFromCart,
        searchQuery,
        setSearchQuery,
        getCartAmount,
        getCartCount,
        axios,
        fetchUser,

    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
