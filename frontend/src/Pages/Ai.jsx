import { useState } from 'react';
import axios from 'axios';


export default function Ai() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/farming-tips`, { prompt });
            setResponse(res.data.text); 
        } catch (err) {
            console.error('Error:', err);   
            setError('Error fetching farming tips. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100 bg-cover bg-center bg-[url('/src/assets/bg-farming.jpg')]">
            <div className="bg-opacity-80 bg-green-800 p-8 rounded-lg shadow-lg w-full max-w-lg mx-4 sm:mx-6 lg:max-w-xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Get Farming Tips</h2>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div>
                        <label className="block text-white text-lg py-3">Enter your query:</label>
                        <textarea
                            rows="4"
                            className="w-full px-3 py-2 border rounded border-gray-300 bg-white text-gray-800"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                    >
                        Get Tips
                    </button>
                </form>
                {loading && <p className="text-yellow-300 text-center mt-4">Loading...</p>}
                {error && <p className="text-red-300 text-center mt-4">{error}</p>}
                {response && (
                    <div className="mt-4 p-4 border rounded-lg border-gray-300 bg-gray-50">
                        <h3 className="text-xl   font-semibold text-gray-800">AI :</h3>
                        <p className="text-gray-700 text-md">{response}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
