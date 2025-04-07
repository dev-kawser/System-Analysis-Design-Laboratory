import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import { assets } from "../assets/assets"

const Navbar = () => {

    const [open, setOpen] = useState(false)

    const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery} = useAppContext();

    const logout = async () => {
        setUser(null);
        navigate('/');
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products")
        }
    }, [searchQuery])



    return (
        <nav className="flex items-center justify-between py-4 border border-gray-300 relative transition-all text-white rounded-full mt-2 px-2">

            <NavLink to='/' onClick={()=>setOpen(false)}>
                <div className="flex items-center justify-center gap-2">
                    <img className="h-9" src="/fav-icon.svg" alt="logo" />
                    <p className="font-semibold text-white text-2xl">farmnet</p>
                </div>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>Products</NavLink>
                <NavLink to='/contact'>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border hover:border-2  px-3 rounded-full">
                    <input onChange={(e)=>setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt="search" className="w-4 h-4" />
                </div>

                <div onClick={()=>navigate('/cart')} className="relative cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-green-500 w-[18px] h-[18px] rounded-full">3</button>
                </div>

                {!user ?(
                    <button onClick={()=>setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full">
                    Login
                    </button>
                    )
                    :
                    (
                        <div className="relative group">
                            <img src={assets.profile_icon} alt="profile" className="w-10" />
                            <ul className="hidden group-hover:block absolute top-10 right-0 bg-silver shadow border border-gray-200 px-2.5 py-1.5 w-32 rounded-md text-sm z-40">
                                <li onClick={()=>navigate('/my-orders')} className="p-1.5 pl-3 hover:bg-blackVariant cursor-pointer">
                                    My Orders
                                </li>
                                <li onClick={logout} className="p-1.5 pl-3 hover:bg-blackVariant cursor-pointer">
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#fff" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#fff" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#fff" />
                </svg>
            </button>

            {/* Mobile Menu */}
            { open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>

                <NavLink to='/' onClick={ ()=>setOpen(false)}>Home</NavLink>
                <NavLink to='/products' onClick={ ()=>setOpen(false)}>Products</NavLink>
                {user &&
                    <NavLink to='/products' onClick={ ()=>setOpen(false)}>My Orders</NavLink>
                }
                <NavLink to='/contact' onClick={ ()=>setOpen(false)}>Contact</NavLink>


                {!user ? (
                        <button onClick={ ()=>{
                            setOpen(false); setShowUserLogin(true)
                        }} className="cursor-pointer px-6 py-2 mt-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full text-sm">
                            Login
                        </button>
                ) : (
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full text-sm">
                        Logout
                    </button>
                )}
                </div>
            )}

        </nav>
    )
}

export default Navbar
