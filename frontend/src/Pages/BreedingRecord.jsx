import axios from "axios";
import { useEffect, useState } from "react";

export default function BreedingRecord() {
  const [breedingRecord, setBreedingRecord] = useState([]);
  const [addBreedingRecord, setAddBreedingRecord] = useState({
    livestock: "",
    breedingDate: "",
    details: "",
    partner: "",
  });
  const [livestock, setLivestock] = useState([]);
  const [selectedLivestock, setSelectedLivestock] = useState({
    id: "",
  });

  useEffect(() => {
    const fetchBreedingRecord = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Login again");
          return;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/getbreedingRecords/${selectedLivestock.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBreedingRecord(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedLivestock.id) {
      fetchBreedingRecord();
    }
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

  const addRecord = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/createBreedingRecord`,
        addBreedingRecord,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBreedingRecord([...breedingRecord, addBreedingRecord]);
      setAddBreedingRecord({
        livestock: "",
        breedingDate: "",
        details: "",
        partner: "",
      });
    } catch (error) {
      console.error("Error adding breeding record", error);
    }
  };

  const handleInputChange = (e) => {
    setAddBreedingRecord({
      ...addBreedingRecord,
      [e.target.name]: e.target.value,
    });
  };

  const deleteRecord = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deleteBreedingRecord/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBreedingRecord(breedingRecord.filter((record) => record._id !== id));
    } catch (error) {
      console.error("Error deleting breeding record", error);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-4">
      <h2 className="font-bold text-green-700 text-2xl mb-4">
        Breeding Records
      </h2>

      <div>
        <h2 className="font-bold text-2xl text-green-600">Add a Record</h2>
        <form onSubmit={addRecord}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <select
              name="livestock"
              value={addBreedingRecord.livestock}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={handleInputChange}
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
              name="breedingDate"
              value={addBreedingRecord.breedingDate}
              placeholder="Breeding Date"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={handleInputChange}
            />
            <select
              name="partner"
              value={addBreedingRecord.partner}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={handleInputChange}
            >
              <option value="">Select Partner</option>
              {livestock.map((livestock) => (
                <option key={livestock._id} value={livestock._id}>
                  {livestock.name}
                </option>
              ))}
            </select>
            <textarea
              name="details"
              value={addBreedingRecord.details}
              placeholder="Details"
              className="border p-5 px-7 py-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="p-2 border bg-green-600 rounded-lg text-white"
            >
              Add Record
            </button>
          </div>
        </form>
      </div>
      <div>
        <h2 className="font-bold text-2xl text-green-600 mb-4">
          Breeding Record List
        </h2>
        <select
          name="id"
          value={selectedLivestock.id}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          onChange={(e) => {
            setSelectedLivestock({
              id: e.target.value,
            });
          }}
        >
          <option value="">Select Livestock</option>
          {livestock.map((livestock) => (
            <option key={livestock._id} value={livestock._id}>
              {livestock.name}
            </option>
          ))}
        </select>
        {selectedLivestock.id ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {breedingRecord.length > 0 ? (
              breedingRecord.map((record, index) => (
                <li
                  key={index}
                  className="rounded-lg bg-white shadow-md p-4 border-l-4 border-green-700"
                >
                  <p className="text-green-700">
                    <strong>Livestock ID:</strong> {record.livestock}
                  </p>
                  <p className="text-green-700">
                    <strong>Breeding Date:</strong>{" "}
                    {new Date(record.breedingDate).toLocaleDateString()}
                  </p>
                  <p className="text-green-700">
                    <strong>Details:</strong> {record.details}
                  </p>
                  <p className="text-green-700">
                    <strong>Partner ID:</strong> {record.partner}
                  </p>
                  <button
                    onClick={() => deleteRecord(record._id)}
                    className="border p-2 bg-green-600 text-white rounded-lg shadow-md mt-1"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p className="text-green-700 font-bold">
                No breeding records available for the selected livestock.
              </p>
            )}
          </ul>
        ) : (
          <p className="text-green-700 mt-6 font-bold">
            Please select a livestock to view breeding records.
          </p>
        )}
      </div>
    </div>
  );
}
