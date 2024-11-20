import axios from "axios";
import { useEffect, useState } from "react";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({
    productID: "",
    quantity: "",
    customer: "",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  const fetchSales = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getSales`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSales(response.data);
    } catch (error) {
      console.error("Error fetching sales", error);
    }
  };

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
    setNewSale({ ...newSale, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(newSale);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/createSales`,
        newSale,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSales([...sales, response.data.sale]);
      setNewSale({ productID: "", quantity: "", customer: "" });
      fetchSales();
    } catch (error) {
      console.error("Error adding sale", error);
    }
  };

  return (
    <div className="bg-green-50 mx-auto px-5 py-4">
      <h2 className="text-2xl font-bold text-green-700">Sales</h2>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-green-700 mb-2">Add New Sale</h3>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <select
            name="productID"
            value={newSale.productID}
            onChange={handleInputChange}
            className="border p-2 rounded-lg"
            required
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newSale.quantity}
            onChange={handleInputChange}
            className="border p-2 rounded-lg"
            required
          />
          <input
            type="text"
            name="customer"
            placeholder="Customer"
            value={newSale.customer}
            onChange={handleInputChange}
            className="border p-2 rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
          >
            Add Sale
          </button>
        </form>
      </div>
      <div className="mt-8">
        <h3 className="text-xl py-5 font-semibold text-green-700">Sales List</h3>
        <ul className="grid md:grid-cols-3 gap-3">
  {sales.map((sale) => {
    // Check if sale.product exists and has an _id before searching in products
    const product = sale.product && products.find((product) => product._id === sale.product._id);

    return (
      <li key={sale._id} className="border p-4 rounded bg-green-200 hover:bg-green-300">
        <p className="font-semibold">
          Product Name: {product ? product.name : "Product not found"}
        </p>
        <p>Quantity: {sale.quantity}</p>
        <p>Customer: {sale.customer}</p>
        <p>Total Price: {sale.totalPrice}</p>
        <p>Sale Date: {new Date(sale.saleDate).toLocaleDateString()}</p>
      </li>
    );
  })}
</ul>


      </div>
    </div>
  );
}
