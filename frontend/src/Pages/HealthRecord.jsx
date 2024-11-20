import axios from "axios";
import { useState, useEffect } from "react";

export default function HealthRecord() {
  const [healthRecord, setHealthRecord] = useState([]);
  const [addHealthRecord, setAddHealthRecord] = useState({
    livestock: "",
    checkupDate: "",
    details: "",
    veterinarian: "",
    nextCheckupDate: ""
  });
  const [livestock, setLivestock] = useState([]);
  const [selectedLivestock, setSelectedLivestock] = useState({
    id: "",
  });
  const [editHealthRecord, setEditHealthRecord] = useState(null);

  useEffect(() => {
    const fetchHealthRecord = async () => {
      if (!selectedLivestock.id) return;
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          return;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/getHealthRecords/${selectedLivestock.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setHealthRecord(response.data);
      } catch (error) {
        console.error("Error fetching health records", error);
      }
    };
    fetchHealthRecord();
  }, [selectedLivestock]);

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

  const handleInputChange = (e) => {
    setAddHealthRecord({ ...addHealthRecord, [e.target.name]: e.target.value });
  };

  const deleteHealthRecord = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/deleteHealthRecord/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHealthRecord(healthRecord.filter((record) => record._id !== id));
      alert("Health record deleted");
    } catch (err) {
      console.error("Error deleting Health Record", err);
    }
  };

  const addRecord = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/createHealthRecord`,
        addHealthRecord,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setHealthRecord([...healthRecord, addHealthRecord]);
      setAddHealthRecord({
        livestock: "",
        checkupDate: "",
        details: "",
        veterinarian: "",
        nextCheckupDate: ""
      });
      alert("Health record added");
    } catch (error) {
      console.error("Error adding health record", error);
    }
  };
  const getLivestockName = (id) => {
    const animal = livestock.find((item) => item._id === id);
    return animal ? animal.name : "Unknown Livestock";
  };

  const handleEditChange = (e) => {
    setEditHealthRecord({
      ...editHealthRecord,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/updateHealthRecord/${editHealthRecord._id}`,
      editHealthRecord,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setHealthRecord(
      healthRecord.map((item) =>
        item._id === editHealthRecord._id ? editHealthRecord : item
      )
    );
    setEditHealthRecord({});
  };

  return (
    <div className="min-h-screen bg-green-50 p-4">
      <h1 className="font-bold text-green-700 text-2xl mb-4">Health Record</h1>

      <div>
        <form onSubmit={addRecord}>
          <h2 className="font-bold text-2xl text-green-600 mb-4">
            Add Health Record
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <select
              name="livestock"
              value={addHealthRecord.livestock}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={handleInputChange}
              required
            >
              <option value="">Select Livestock</option>
              {livestock.map((livestock) => (
                <option key={livestock._id} value={livestock._id}>
                  {livestock.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="checkupDate"
              value={addHealthRecord.checkupDate}
              placeholder="Checkup Date"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="veterinarian"
              value={addHealthRecord.veterinarian}
              placeholder="Veterinarian"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="nextCheckupDate"
              value={addHealthRecord.nextCheckupDate}
              placeholder="Next Checkup Date"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={handleInputChange}
              required
              />
            <textarea
              name="details"
              value={addHealthRecord.details}
              placeholder="Details"
              className="border h-max p-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex justify-center m-2">
            <button
              type="submit"
              className="p-2 border bg-green-600 rounded-lg text-white"
            >
              Add Record
            </button>
          </div>
        </form>
        <h2 className="mt-2 font-bold text-2xl text-green-600 mb-4">
          Health Record List
        </h2>

        <select
          name="id"
          value={selectedLivestock.id}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
          onChange={(e) => {
            setSelectedLivestock({
              id: e.target.value,
            });
          }}
        >
          <option value="">Select Livestock</option>
          {livestock.map((animal) => (
            <option key={animal._id} value={animal._id}>
              {animal.name}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {selectedLivestock.id ? (
          healthRecord.map((record) => (
            <div
              key={record._id}
              className="rounded-lg bg-white shadow-md p-4 border-l-4 border-green-700 mb-4"
            >
              {editHealthRecord && editHealthRecord._id == record._id ? (
                <div>
                  <form className="flex flex-col space-y-2" onSubmit={handleEditSubmit}>
                    <input
                      type="date"
                      name="checkupDate"
                      value={editHealthRecord.checkupDate.split('T')[0]}
                      placeholder="Date"
                      className="border p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      onChange={handleEditChange}
                      required
                    />
                    <input
                      type="text"
                      name="veterinarian"
                      value={editHealthRecord.veterinarian}
                      placeholder="Veterinarian"
                      className="border p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      onChange={handleEditChange}
                      required
                    />
                    <input
                      type="date"
                      name="nextCheckupDate"
                      value={editHealthRecord.nextCheckupDate.split('T')[0]}
                      placeholder="Next Checkup Date"
                      className="border p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      onChange={handleEditChange}
                      required
                      />
                    <textarea
                      type="text"
                      name="details"
                      value={editHealthRecord.details}
                      placeholder="Details"
                      className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      onChange={handleEditChange}
                      required
                    />
                    <div className="flex justify-center">
                      <button
                      type="submit"
                        className="border bg-amber-500 p-2 px-4 rounded-lg shadow-md m-2 text-white mr-2"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div >
                  <p className="text-green-700">
                    <strong>Livestock: </strong>{" "}
                    {getLivestockName(record.livestock)}
                  </p>
                  <p className="text-green-700">
                    <strong>Date:</strong>
                    {new Date(record.checkupDate).toLocaleDateString()}
                  </p>
                  
                  <p className="text-green-700">
                    <strong>Veterinarian:</strong> {record.veterinarian}
                  </p>
                  <p className="text-green-700">
                    <strong>Next Checkup Date:</strong>{" "}
                    {new Date(record.nextCheckupDate).toLocaleDateString()}
                  </p>
                  <p className="text-green-700">
                    <strong>Details:</strong> {record.details}
                  </p>
                  <button
                    className="border bg-red-600 hover:bg-red-700 p-2 rounded-lg shadow-md text-white mr-2"
                    onClick={() => deleteHealthRecord(record._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="border p-2 bg-yellow-500 px-5 hover:bg-amber-500 text-white rounded-lg shadow-md mt-1"
                    onClick={() => setEditHealthRecord(record)}
                  >
                    Edit
                  </button>
                </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-green-700 font-bold">
            Please select a livestock to view its health records.
          </p>
        )}
        </div>
        
      </div>
    </div>
  );
}
