import { useEffect, useState } from "react"
import { assets } from "../assets/assets"
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
    <input
        className="w-full px-2 py-2.5 border border-gray-300 rounded outline-none text-offwhite focus:border-secondary transition-all"
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={address[name]}
        required
    />
)

const Address = () => {

    const { axios, user, navigate } = useAppContext();
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            // Validate required fields
            // if (!address.lastName) {
            //     return toast.error("Last name is required");
            // }
            const { data } = await axios.post('/api/address/add', { address,  userId: user._id });

            if (data.success) {
                toast.success(data.message)
                navigate('/cart')
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect( ()=> {
        if (!user) {
            navigate('/cart');
        }
    }, [])

    return (
        <div className="my-20 p-6">
            <div>
                <p className="text-2xl md:text-3xl text-offwhite font-semibold">Add Shipping
                    <span className="text-secondary"> Address</span>
                </p>
                <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
                    <div className="flex-1 max-w-md">
                        <form onSubmit={onSubmitHandler} className="skew-y-3 mt-6 text-sm">

                            <div className="grid grid-cols-2 gap-4">
                                <InputField handleChange={handleChange} address={address} name='firstName' type="text" placeholder="First Name" />
                                <InputField handleChange={handleChange} address={address} name='lastName' type="text" placeholder="Last Name" />
                            </div>

                            <InputField handleChange={handleChange} address={address} name='email' type="email" placeholder="Email Address" />
                            <InputField handleChange={handleChange} address={address} name='street' type="text" placeholder="Street" />

                            <div className="grid grid-cols-2 gap-4">
                                <InputField handleChange={handleChange} address={address} name='city' type="text" placeholder="City" />
                                <InputField handleChange={handleChange} address={address} name='state' type="text" placeholder="State" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <InputField handleChange={handleChange} address={address} name='zipcode' type="Number" placeholder="Zipcode" />
                                <InputField handleChange={handleChange} address={address} name='country' type="text" placeholder="Country" />
                            </div>

                            <InputField handleChange={handleChange} address={address} name='phone' type="text" placeholder="Phone" />

                            <button className="w-full px-16 py-2 rounded-full bg-secondary hover:bg-green-600">
                                Save Address
                            </button>

                        </form>
                    </div>
                    <img src={assets.add_address_iamge} alt="" className="md:mr-16 mb-16 md:mt-0" />
                </div>
            </div>
        </div>
    )
}

export default Address
