import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext"
import toast from "react-hot-toast";

const SellerLogin = () => {

    const { isAdmin, setIsAdmin, navigate, axios } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (event) => {
            try {
                event.preventDefault();
                const { data } = await axios.post('/api/admin/login', { email, password })

                if (data.success) {
                    setIsAdmin(true)
                    navigate('/admin')
                } else{
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
    }


    useEffect(() => {
        if(isAdmin){
            navigate('/admin')
        }
    }, [isAdmin])


    return !isAdmin &&(
        <div className="my-20 p-6">
            <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center text-sm text-offwhite">
                    <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-[88] rounded-lg shadow-xl border border-gray-200">
                        <p className="text-2xl font-medium m-auto head text-offwhite ">
                            <span className="text-secondary">Seller </span>
                            login
                        </p>

                        <div className="w-full ">
                                <p>Email</p>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-green-400 rounded w-full p-2 mt-1 outline-green-500 text-black" type="email" required />
                        </div>

                        <div className="w-full ">
                                <p>Password</p>
                                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-green-400 rounded w-full p-2 mt-1 outline-green-500 text-black" type="password" required />
                        </div>
                        <button className="bg-green-500 hover:bg-green-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                                Login
                        </button>
                    </div>
            </form>
        </div>
    )
}

export default SellerLogin
