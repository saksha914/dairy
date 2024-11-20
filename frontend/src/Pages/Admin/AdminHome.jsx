import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { FarmerContext} from './FarmerContext';

export default function AdminHome() {
  const { setFarmerId } = useContext(FarmerContext);
  const [farmers, setFarmers] = useState([]);
  const [editFarmer, setEditFarmer] = useState(null);
  const [editedFarmerData, setEditedFarmerData] = useState(null);
  const [newFarmerData, setNewFarmerData] = useState({
    farmerName: "",
    address: "",
    password: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/fetchfarmers`);
        setFarmers(res.data.farmer);
      } catch (error) {
        console.error("Error fetching farmers", error);
      }
    };

    fetchFarmers();
  }, []);

  const handleAction = (action, farmerId) => {
    switch (action) {
      case "edit":
        setEditFarmer(farmerId);
        setEditedFarmerData(farmers.find((farmer) => farmer._id === farmerId));
        break;
      case "delete":
        handleDeleteFarmer(farmerId);
        break;
      case "editProducts":
        setFarmerId(farmerId); 
        navigate("/admin/products");
        break;
      case "editLivestock":
        setFarmerId(farmerId); 
        navigate("/admin/livestock");
        break;
      default:
        break;
    }
  };

  const handleDeleteFarmer = async (farmerId) => {
    const confirmed = window.confirm("Are you sure you want to delete this farmer?");
    if (!confirmed) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/deletefarmer/${farmerId}`);
      setFarmers((prevFarmers) => prevFarmers.filter((farmer) => farmer._id !== farmerId));
    } catch (error) {
      console.error("Error deleting farmer", error);
    }
  };

  const handleEditFarmer = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/updatefarmer/${editFarmer}`, editedFarmerData);
      setFarmers((prevFarmers) =>
        prevFarmers.map((farmer) =>
          farmer._id === editFarmer ? editedFarmerData : farmer
        )
      );
      setEditFarmer(null);
      setEditedFarmerData(null);
    } catch (error) {
      console.error("Error updating farmer", error);
    }
  };

  const handleInputChange = (e) => {
    setEditedFarmerData({
      ...editedFarmerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewFarmerChange = (e) => {
    setNewFarmerData({
      ...newFarmerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddFarmer = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/addfarmers`, newFarmerData);
      setFarmers([...farmers, newFarmerData]);
      setNewFarmerData({
        farmerName: "",
        address: "",
        password: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error("Error adding farmer", error);
    }
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl mb-3 font-bold text-green-800">Admin Dashboard</h1>
      <h3 className="text-2xl font-semibold text-green-600 mt-5">Add New Farmer</h3>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="farmerName"
            placeholder="Farmer Name"
            value={newFarmerData.farmerName}
            onChange={handleNewFarmerChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={newFarmerData.phone}
            onChange={handleNewFarmerChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newFarmerData.address}
            onChange={handleNewFarmerChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newFarmerData.email}
            onChange={handleNewFarmerChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newFarmerData.password}
            onChange={handleNewFarmerChange}
            className="border p-2 rounded-lg"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleAddFarmer}
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
          >
            Add Farmer
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Farmers</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer) => (
                <tr key={farmer._id}>
                  {editFarmer === farmer._id ? (
                    <>
                      <td className="py-2 border-b">
                        <input
                          type="text"
                          name="farmerName"
                          value={editedFarmerData.farmerName}
                          onChange={handleInputChange}
                          className="bg-gray-100 p-2 rounded-md w-full"
                        />
                      </td>
                      <td className="py-2 border-b">
                        <input
                          type="email"
                          name="email"
                          value={editedFarmerData.email}
                          onChange={handleInputChange}
                          className="bg-gray-100 p-2 rounded-md w-full"
                        />
                      </td>
                      <td className="py-2 border-b">
                        <input
                          type="text"
                          name="phone"
                          value={editedFarmerData.phone}
                          onChange={handleInputChange}
                          className="bg-gray-100 p-2 rounded-md w-full"
                        />
                      </td>
                      <td className="py-2 border-b">
                        <input
                          type="text"
                          name="address"
                          value={editedFarmerData.address}
                          onChange={handleInputChange}
                          className="bg-gray-100 py-2 rounded-md w-full"
                        />
                      </td>
                      <td className="py-2 border-b">
                        <button
                          onClick={handleEditFarmer}
                          className="bg-green-500 text-white py-2 px-1 rounded-md"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditFarmer(null)}
                          className="ml-2 bg-gray-500 text-white py-2 px-1 rounded-md"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-4 border-b">{farmer.farmerName}</td>
                      <td className="py-2 px-4 border-b">{farmer.email}</td>
                      <td className="py-2 px-4 border-b">{farmer.phone}</td>
                      <td className="py-2 px-4 border-b">{farmer.address}</td>
                      <td className="py-2 px-4 border-b">
                        <select
                          className="bg-gray-100 py-2 px-4 rounded-md w-full"
                          onChange={(e) => handleAction(e.target.value, farmer._id)}
                        >
                          <option value="">Select Action</option>
                          <option value="edit">Edit Farmer</option>
                          <option value="delete">Delete</option>
                          <option value="editProducts">Products</option>
                          <option value="editLivestock">Livestock</option>
                        </select>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
}


