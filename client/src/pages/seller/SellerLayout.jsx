import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {

    const { axios, navigate } = useAppContext();


    const sidebarLinks = [
        { name: "Add Product", path: "/admin", icon: assets.add_icon },
        { name: "Product List", path: "/admin/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/admin/orders", icon: assets.order_icon },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.post('/api/admin/logout');

            if (data.success) {
                toast.success(data.message)
                navigate('/')
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div className="my-20 p-6">
                <div className="flex items-center justify-between px-4 md:px-8 border border-gray-300 py-3  transition-all duration-300 rounded-full">
                <Link to='/'>
                    <div className="flex items-center justify-center gap-2 ">
                        <img className="h-9" src="/fav-icon.svg" alt="logo" />
                        <p className="font-semibold text-white text-2xl">farmnet</p>
                    </div>
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={ logout } className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>

            <div className="flex">
                    <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                        {sidebarLinks.map((item) => (
                            <NavLink to={item.path} key={item.name} end={item.path === "/admin"}
                                className={({isActive})=>`flex items-center py-3 px-4 gap-3
                                    ${isActive ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                        : "hover:bg-gray-100/90 border-white text-gray-700"
                                    }`
                                }
                            >
                                <img src={item.icon} alt="" className="w-7 h-7" />
                                <p className="md:block hidden text-center">{item.name}</p>
                            </NavLink>
                        ))}
                    </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default SellerLayout
