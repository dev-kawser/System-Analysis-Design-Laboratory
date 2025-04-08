import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { categories } from "../assets/assets";
import { FiFilter, FiX, FiCheck } from "react-icons/fi"; // Import icons from react-icons

const AllProducts = () => {
    const { products, searchQuery } = useAppContext();
    const [filterProducts, setFilterProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]); // Now supports multiple selection
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    useEffect(() => {
        let filtered = products;

        // Apply search filter
        if (searchQuery.length > 0) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply category filter if any are selected
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product =>
                selectedCategories.includes(product.category.toLowerCase())
            );
        }

        setFilterProducts(filtered);
    }, [products, searchQuery, selectedCategories]);

    const toggleCategory = (categoryPath) => {
        const lowerPath = categoryPath.toLowerCase();
        setSelectedCategories(prev =>
            prev.includes(lowerPath)
                ? prev.filter(c => c !== lowerPath)
                : [...prev, lowerPath]
        );
    };

    return (
        <div className="my-20 p-6">
            {/* Mobile Filter Button */}
            <div className="md:hidden flex justify-end mb-4">
                <button
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                    <FiFilter size={18} />
                    {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Category Filter Sidebar - Modern Design */}
                <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block w-full md:w-72 flex-shrink-0`}>
                    <div className="bg-white rounded-xl shadow-md p-6 sticky top-20 border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-xl flex items-center gap-2">
                                <FiFilter size={20} className="text-indigo-600" />
                                Filters
                            </h3>
                            {selectedCategories.length > 0 && (
                                <button
                                    onClick={() => setSelectedCategories([])}
                                    className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                                >
                                    <FiX size={16} />
                                    Clear all
                                </button>
                            )}
                        </div>

                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Categories</h4>
                            <ul className="space-y-2">
                                {categories.map((category) => {
                                    const isSelected = selectedCategories.includes(category.path.toLowerCase());
                                    return (
                                        <li key={category.path}>
                                            <button
                                                onClick={() => toggleCategory(category.path)}
                                                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-all ${isSelected ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-gray-50'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}
                                                    >
                                                        {isSelected && <FiCheck className="text-white" size={14} />}
                                                    </div>
                                                    <span className={isSelected ? 'font-medium text-indigo-700' : 'text-gray-700'}>{category.text}</span>
                                                </div>
                                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                    {products.filter(p => p.category.toLowerCase() === category.path.toLowerCase()).length}
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                    <div className="flex flex-col">
                        <div className="flex flex-col items-end w-max">
                            <p className="head text-offwhite uppercase">All Products</p>
                            <div className="w-32 h-2 bg-secondary rounded-full mr-2"></div>
                        </div>

                        {/* Selected Filters Indicator */}
                        {selectedCategories.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {selectedCategories.map(category => {
                                    const categoryData = categories.find(c => c.path.toLowerCase() === category);
                                    return (
                                        <span
                                            key={category}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                                        >
                                            {categoryData?.text || category}
                                            <button
                                                onClick={() => toggleCategory(category)}
                                                className="ml-2 rounded-full hover:bg-indigo-200 p-0.5"
                                            >
                                                <FiX size={14} />
                                            </button>
                                        </span>
                                    );
                                })}
                            </div>
                        )}

                        <div className="grid grid-cols-4 gap-8 my-6">
                            {filterProducts.filter((product) => product.inStock).map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;


// import { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import ProductCard from "../components/ProductCard";

// const AllProducts = () => {

//     const { products, searchQuery } = useAppContext();

//     const [filterProducts, setFilterProducts] = useState([]);

//     useEffect(()=>{
//         if (searchQuery.length > 0) {
//                 setFilterProducts(products.filter(
//                     product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
//                 ))}
//                 else{
//                     setFilterProducts(products)
//                 }
//     }, [products, searchQuery])


//     return (
//         <div className="my-20 p-6">
//             <div className="flex flex-col">
//                     <div  className="flex flex-col items-end w-max">
//                         <p className="head text-offwhite uppercase">All Products</p>
//                         <div className="w-32 h-2 bg-secondary rounded-full mr-2"></div>
//                     </div>

//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
//                         {filterProducts.filter((product)=>product.inStock).map( (product, index) => (
//                             <ProductCard key={index} product={product}/>
//                         ))}
//                     </div>
//             </div>
//         </div>
//     )
// }

// export default AllProducts
