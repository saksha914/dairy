import { useState, useEffect } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: "",
    minProducts: ""
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getProducts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/createProduct`,
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setProducts([...products, response.data.product]);
      setNewProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: "",
        minProducts: ""
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/updateProduct/${id}`,
        editingProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedProducts = products.map((product) =>
        product.productID === id ? response.data.product : product
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deleteProduct/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product.productID !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className=" px-5 py-8 bg-green-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-700">Products</h2>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-green-600 flex justify-center">Add New Product</h3>
        <div className="mt  -4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:justify-center mb-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleInputChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="number"
            name="minProducts"
            placeholder="Minimum Stock After which you want reminder"
            value={newProduct.minProducts}
            onChange={handleInputChange}
            className="border p-2 rounded-lg"
            />
          </div>
          <div className="flex justify-center">
          <button
            onClick={handleAddProduct}
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
          >
            Add Product
          </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-green-600 flex justify-center">Product List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {products.map((product) => (
            <div
              key={product.productID}
              className="border p-4 rounded-lg bg-white shadow-lg"
            >
              {editingProduct && editingProduct.productID === product.productID ? (
                <div className="flex flex-col space-y-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                    className="border p-2 rounded-lg"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: e.target.value,
                      })
                    }
                    className="border p-2 rounded-lg"
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: e.target.value,
                      })
                    }
                    className="border p-2 rounded-lg"
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value,
                      })
                    }
                    className="border p-2 rounded-lg"
                  />
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: e.target.value,
                      })
                    }
                    className="border p-2 rounded-lg"
                  />
                  <input
                  type="number"
                  name="minProducts"
                  placeholder="Minimum Stock After which you want reminder"
                  value={editingProduct.minProducts}
                  onChange={(e) => 
                    setEditingProduct({
                        ...editingProduct,
                        minProducts: e.target.value,
                      })
                    }
                    className="border p-2 rounded-lg"
                  />
                  <button
                    onClick={() => handleEditProduct(product.productID)}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h4 className="text-lg font-bold text-green-700">{product.name}</h4>
                  <p className="text-green-600">Product ID: {product.productID}</p>
                  <p className="text-green-600">Price: {product.price}</p>
                  <p className="text-green-600">Description: {product.description}</p>
                  <p className="text-green-600">Category: {product.category}</p>
                  <p className="text-green-600">Stock: {product.stock}</p>
                  <p className="text-green-600">
                    Min Stock Needed: {product.minProducts}
                  </p>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover mt-2 rounded-lg"
                    />
                  )}
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.productID)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
