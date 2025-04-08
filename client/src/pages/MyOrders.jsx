import { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext";
import { assets, dummyOrders } from "../assets/assets";

const MyOrders = () => {

    const [myOrders, setMyOrders] = useState([]);
    const { currency } = useAppContext();

    const fetchMyOrders = async () => {
        setMyOrders(dummyOrders);

    }


    useEffect(() => {
        fetchMyOrders()
    }, [])


    return (
        <div className="my-20 p-6">
            <div className="">
                <div className="flex flex-col items-end w-max mb-8">
                    <p className="head text-offwhite">My orders</p>
                    <div className="w-32 h-2 bg-secondary rounded-full mr-2"></div>
                </div>

                {
                    myOrders.map((order, index) => (
                        <div key={index} className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl">
                            <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
                                <span>OrderId: {order._id}</span>
                                <span>Payment: {order.paymentType}</span>
                                <span>Total Amount: {currency}{order.amount}</span>
                            </p>
                            {
                                order.items.map((item, index)=>(
                                    <div key={index} className={`relative bg-white text-gray-600 ${order.items.length !== index + 1 && "border-b"} border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>
                                            <div className="flex items-center mb-4 md:mb-0">
                                                <div className="bg-gray-600 p-4 rounded-lg">
                                                    <img src={item.product.image[0]} alt="" className="w-16 h-16" />
                                                </div>

                                                <div className="ml-4">
                                                    <h2 className="text-xl font-medium text-offwhite">{item.product.name}</h2>
                                                    <p>Category: {item.product.category}</p>
                                                </div>
                                            </div>

                                            <div className="text-offwhite text-lg font-medium">
                                                <p>Quantity: {item.quantity || '1'}</p>
                                                <p>Status: {item.status}</p>
                                                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <p className="text-offwhite text-lg font-medium">
                                                Amount: {currency}{item.product.offerPrice * item.quantity}
                                            </p>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyOrders
