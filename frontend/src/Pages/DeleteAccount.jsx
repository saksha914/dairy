import axios from "axios"

export default function DeleteAccount (){
    
    const deleteAccount = (() => {
        try{
            const token = localStorage.getItem('token');
            if(!token) {
                console.error("No token found")
                return;
            }
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/deleteFarmer`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }
        catch(error){
            console.log("Trouble deleting Account" + error.message)
        }
        
    })

    return(
        <div className="bg-green-100 h-screen p-4">
            <h1 className="text-xl font-serif font-bold text-red-600 m-2">Delete Account</h1>
            <p className="text-lg m-2">This will permanently delete your admin account.</p>
            <p className="text-lg m-2">This action cannot be undone.</p>
            <button onClick={deleteAccount} className="border p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">Delete Account</button>
        </div>
    )
}