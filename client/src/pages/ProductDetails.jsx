import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {

    const { products, navigate, currency, addToCart } = useAppContext();

    const { id } = useParams()

    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const product = products.find((item) => item._id === id);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => product.category === item.category)
            setRelatedProducts(productsCopy.slice(0, 5))
        }
    }, [products])


    useEffect(() => {
        setThumbnail(product?.image[0] ? product.image[0] : null)
    }, [product])



    return product && (
        <div className=" px-6 my-20">
            <p className="text-offwhite">
                <Link to={'/'}>Home</Link> /
                <Link to={'/products'}> Products</Link> /
                <Link to={'/products'}> {product.category}</Link> /
                <span className="text-secondary"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-offwhite rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-offwhite max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium text-offwhite">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                                <img src={i<4 ? assets.star_icon : assets.star_dull_icon} alt=""
                                    className="md:w-4 w-3.5"
                                />
                        ))}
                        <p className="text-base ml-2 text-offwhite">({4})</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-400 line-through">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-medium text-offwhite">MRP: {currency}{product.offerPrice}</p>
                        <span className="text-gray-400">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6 text-offwhite">About Product</p>
                    <ul className="list-disc ml-4 text-gray-400">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base text-offwhite">
                        <button onClick={()=>(addToCart(product._id))} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-blackVariant hover:bg-gray-300 transition" >
                            Add to Cart
                        </button>
                        <button onClick={()=>{addToCart(product._id); navigate('/cart')}} className="w-full py-3.5 cursor-pointer font-medium bg-green-500 text-white hover:bg-green-700 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            {/* related products */}
            <div className="my-20 flex flex-col items-center">
                <div className="flex flex-col items-center w-max">
                    <p className="text-3xl font-medium text-offwhite">Related Products</p>
                    <div className="w-32 h-2 bg-secondary rounded-full mr-2"></div>
                </div>
                <div className="flex items-center justify-center gap-12 my-6">
                    {relatedProducts.filter((product)=>product.inStock).map((product, index)=>(
                        <ProductCard key={index} product={product}/>
                    ))}
                </div>
                <button onClick={()=>{navigate('/products'); scrollTo(0, 0)}} className="px-10 py-2 text-xl font-medium rounded-lg text-offwhite bg-secondary hover:bg-green-600 transition-all">See more</button>
            </div>
        </div>
    );
}

export default ProductDetails
