import { useState, useEffect } from "react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL; 

export default function AllProducts({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [farmers, setFarmers] = useState({});

  useEffect(() => {
    fetchProducts();
    fetchFarmers();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backend}/fetchproducts`); // Use backend variable
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchFarmers = async () => {
    try {
      const response = await axios.get(`${backend}/admin/fetchfarmers`); // Use backend variable
      const farmersData = response.data.farmer.reduce((acc, farmer) => {
        acc[farmer._id] = farmer.farmerName;
        return acc;
      }, {});
      setFarmers(farmersData);
    } catch (error) {
      console.error("Error fetching farmers:", error);
    }
  };

  return (
    <div className="px-5 py-8 bg-green-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.productID} className="border p-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
            <h4 className="text-lg font-bold text-green-700">{product.name}</h4>
            <p className="text-green-600">Price: ${product.price.toFixed(2)}</p>
            <p className="text-green-600">Description: {product.description}</p>
            <p className="text-green-600">Category: {product.category.join(", ")}</p>
            <p className="text-green-600">Stock: {product.stock}</p>
            <p className="text-green-600 font-bold">By Farmer: {farmers[product.farmer] || "Loading..."}</p>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mt-2 rounded-lg"
              />
            )}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
