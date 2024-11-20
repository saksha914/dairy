import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found");
                    return;
                }

                const productResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getProducts`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const products = productResponse.data;
                const productNotifications = products
                    .filter(product => product.stock < product.minProducts)
                    .map(product => ({
                        message: `Low stock alert for product ${product.name}. Current stock: ${product.stock}, Minimum required: ${product.minProducts}`,
                        productId: product._id
                    }));

                const healthRecordResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/fetchallrecords`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const healthRecords = healthRecordResponse.data;
                const today = new Date();
                today.setHours(0, 0, 0, 0); 
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1); 

                const healthNotifications = healthRecords
                    .filter(record => new Date(record.nextCheckupDate) >= today && new Date(record.nextCheckupDate) < tomorrow)
                    .map(record => ({
                        message: `Health checkup due today for livestock ${record.livestock}. Details: ${record.details}`,
                        recordId: record._id
                    }));

                setNotifications([...productNotifications, ...healthNotifications]);

            } catch (error) {
                console.error('Error fetching notifications:', error.response ? error.response.data : error.message);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="bg-green-50 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-green-700 mb-6">Notifications</h1>
            {notifications.length > 0 ? (
                <ul className="space-y-4">
                    {notifications.map((notif, index) => (
                        <li key={index} className="p-4 bg-white rounded-lg shadow-md border border-gray-300">
                            <div className="flex items-center">
                                <p className="text-red-700">{notif.message}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600 font-bold font-serif text-4xl">No notifications 😀</p>
            )}
        </div>
    );
}
