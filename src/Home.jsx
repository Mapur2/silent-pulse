import React, { useState } from 'react';// If you're using React Router
import { useNavigate } from 'react-router-dom';
import databases from './appwrite';
import { ID } from 'appwrite';

const Home = () => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const nav=useNavigate();
    const handleCreateMessage = async () => {
        if (name.trim() === '') {
            alert('Please enter your name.');
            return;
        }
        const data = await databases.createDocument(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_COLLECTION_ID,
            ID.unique(),
            {
                name,
                messages: []
            }
        )
        nav("/messages/"+data.$id)
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Anonymous Messenger</h1>
                <p className="text-gray-600 mb-6">Share your thoughts anonymously with the world.</p>

                {/* Input Field */}
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Create Button */}
                <button
                    onClick={handleCreateMessage}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-purple-700 transition-all"
                >
                    Create your link
                </button>
            </div>
        </div>
    );
};

export default Home;
