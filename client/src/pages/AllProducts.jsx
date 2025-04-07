import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {

    const { products, searchQuery } = useAppContext();

    const [filterProducts, setFilterProducts] = useState([]);

    useEffect(()=>{
        if (searchQuery.length > 0) {
                setFilterProducts(products.filter(
                    product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
                ))}
                else{
                    setFilterProducts(products)
                }
    }, [products, searchQuery])


    return (
        <div className="my-20 p-6">
            <div className="flex flex-col">
                    <div  className="flex flex-col items-end w-max">
                        <p className="head text-offwhite uppercase">All Products</p>
                        <div className="w-32 h-2 bg-secondary rounded-full mr-2"></div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
                        {filterProducts.filter((product)=>product.inStock).map( (product, index) => (
                            <ProductCard key={index} product={product}/>
                        ))}
                    </div>
            </div>
        </div>
    )
}

export default AllProducts
