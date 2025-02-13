import { useEffect, useState } from "react";
import axios from "axios";

export default function Livestock() {
  const [livestock, setLivestock] = useState([]);
  const [newLivestock, setNewLivestock] = useState({
    name: "",
    type: "",
    breed: "",
    birthDate: "",
    gender: "",
  });
  const [editingLivestock, setEditingLivestock] = useState(null);

  useEffect(() => {
    const fetchLivestock = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getlivestock`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLivestock(response.data);
      } catch (error) {
        console.error("Error fetching livestock", error);
      }
    };
    fetchLivestock();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/addLivestock`,
        newLivestock,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLivestock([...livestock, response.data]);
      setNewLivestock({
        name: "",
        type: "",
        breed: "",
        birthDate: "",
        gender: "",
      });
    } catch (error) {
      console.error("Error adding livestock", error);
    }
  };

  const handleInputChange = (e) => {
    setNewLivestock({ ...newLivestock, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditingLivestock({ ...editingLivestock, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/updateLivestock/${editingLivestock._id}`,
        editingLivestock,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLivestock(
        livestock.map((item) =>
          item._id === editingLivestock._id ? editingLivestock : item
        )
      );
      setEditingLivestock(null);
    } catch (error) {
      console.error("Error updating livestock", error);
    }
  };

  const deleteLivestock = async (livestockItem) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deleteLivestock/${livestockItem._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLivestock(livestock.filter((item) => item._id !== livestockItem._id));
    } catch (error) {
      console.error("Error deleting livestock", error);
    }
  };

  return (
    <div className="bg-green-50 min-h-screen p-8">
      <h1 className="text-2xl font-bold text-green-900 mt-2 mb-2">Livestock</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <input
            type="text"
            name="name"
            value={newLivestock.name}
            placeholder="Name"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="breed"
            value={newLivestock.breed}
            placeholder="Breed"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="type"
            value={newLivestock.type}
            placeholder="Animal"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="birthDate"
            value={newLivestock.birthDate}
            placeholder="Birth Date"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="gender"
            value={newLivestock.gender}
            placeholder="Gender"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center mt-4 mb-4">
          <button
            type="submit"
            className="rounded-lg bg-green-700 text-white p-2"
          >
            Add Livestock
          </button>
        </div>
      </form>
      <div>
        <h2 className="text-2xl text-green-700 mb-4 font-bold">Livestock List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {livestock.map((item) => (
            <div
              key={item._id} // Add the unique key here
              className="rounded-lg bg-white shadow-md p-4 border-l-4 border-green-700"
            >
              {editingLivestock && editingLivestock._id === item._id ? (
                <form className="flex flex-col space-y-2" onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingLivestock.name}
                    placeholder="Name"
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    onChange={handleEditInputChange}
                  />
                  <input
                    type="text"
                    name="type"
                    defaultValue={editingLivestock.type}
                    placeholder="Animal"
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    onChange={handleEditInputChange}
                  />
                  <input
                    type="text"
                    name="breed"
                    defaultValue={editingLivestock.breed}
                    placeholder="Breed"
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    onChange={handleEditInputChange}
                  />
                  <input
                    type="date"
                    name="birthDate"
                    defaultValue={editingLivestock.birthDate}
                    placeholder="Birth Date"
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    onChange={handleEditInputChange}
                  />
                  <input
                    type="text"
                    name="gender"
                    defaultValue={editingLivestock.gender}
                    placeholder="Gender"
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    onChange={handleEditInputChange}
                  />
                  <div className="flex justify-center gap-3">
                    <button
                      type="submit"
                      className="border py-2 px-3 bg-green-500 hover:bg-green-600 rounded-lg text-white"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="border py-2 px-3 bg-red-500 hover:bg-red-600 rounded-lg text-white"
                      onClick={() => setEditingLivestock(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-green-700">
                    <strong>Name: </strong> {item.name}
                  </p>
                  <p className="text-green-700">
                    <strong>Type: </strong> {item.type}
                  </p>
                  <p className="text-green-700">
                    <strong>Breed: </strong> {item.breed}
                  </p>
                  <p className="text-green-700">
                    <strong>Birth Date: </strong>{" "}
                    {new Date(item.birthDate).toLocaleDateString()}
                  </p>
                  <p className="text-green-700">
                    <strong>Gender: </strong> {item.gender}
                  </p>
                  <div className="mt-3 flex gap-3">
                    <button
                      className="border py-2 px-3 text-white bg-amber-400 hover:bg-yellow-500 rounded-lg mb-1"
                      onClick={() => setEditingLivestock(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="border py-2 px-3 text-white bg-red-400 hover:bg-red-600 rounded-lg"
                      onClick={() => deleteLivestock(item)}
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
