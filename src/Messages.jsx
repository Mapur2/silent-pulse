import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';  // To get params from URL
import databases from './appwrite';

const ViewMessages = () => {
    // Get the ID from the URL parameters
    const { id } = useParams();
    const [copy, setCopy] = useState("Copy Link");
    // State to hold the messages data
    const [messages, setMessages] = useState([]);
    const [link, setLink] = useState(window.location.host + `/secret/${id}`);

    // Fetch the messages using the ID
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await databases.getDocument(
                    import.meta.env.VITE_DATABASE_ID,
                    import.meta.env.VITE_COLLECTION_ID,
                    id
                );

                setMessages(response.messages);
            } catch (err) {
                console.log(err);
                setMessages([]);
            }
        };

        fetchMessages();
    }, [id]);

    return (
        <div className="pt-32 min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-xl p-6 max-w-3xl w-full text-center">
                <h1 className="text-4xl font-bold text-black">View Messages</h1>
                <p className="mt-4 text-black text-sm">
                    Share this url to your friends and family.
                </p>
                {/* Link Section moved upwards */}
                {link && (
                    <div className="bg-gradient-to-br from-purple-500 via-pink-400 to-red-400 p-6 rounded-xl shadow-lg text-white text-center mb-6">
                        <h2 className="text-lg font-semibold mb-4">Your Message Link</h2>
                        <Link
                            to={"/secret/" + id}
                            className="text-white text-base font-medium underline break-words hover:text-yellow-300 transition-all"
                            rel="noopener noreferrer"
                        >
                            {link}
                        </Link>

                        {/* Copy Link Button */}
                        <br />
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                setCopy("Copied Link!");
                                setTimeout(() => {
                                    setCopy("Copy Link");
                                }, 2000);
                            }}
                            className="mt-4 bg-white text-purple-600 py-2 px-4 rounded-lg font-semibold shadow hover:bg-purple-100 transition-all"
                        >
                            {copy}
                        </button>

                        {/* Note to Save URL */}
                        <p className="mt-4 text-white text-sm">
                            <strong>Note:</strong> Save this URL, as it's the only way to view or share these messages.
                        </p>
                    </div>
                )}
                <button
                    onClick={() => {
                       window.location.reload()
                    }}
                    className="mt-4 bg-black text-white py-2 px-4 rounded-lg font-semibold shadow hover:bg-purple-800 transition-all"
                >Refresh</button>
                {/* Messages Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Messages for ID: {id}</h2>

                    {messages.length > 0 ? (
                        <ul className="space-y-4">
                            {messages.map((message, index) => (
                                <li key={index} className="flex items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 rounded-xl shadow-lg hover:scale-105 transform transition-all ease-in-out">
                                    <img src="https://avatar.iran.liara.run/public/boy?username=Ash" alt="User Avatar" className="w-10 h-10 rounded-full mr-4" />
                                    <p className="text-lg font-semibold text-white">{message}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No messages found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewMessages;
