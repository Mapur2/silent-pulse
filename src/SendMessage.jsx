import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import databases from './appwrite';

const SendMessagePage = () => {
  const { id } = useParams(); 
  const [message, setMessage] = useState(''); 
  const [name,setName]=useState("");
  const [isSending, setIsSending] = useState(false); 
  const [error, setError] = useState(''); 
  const [isMessageSent, setIsMessageSent] = useState(false); 
  const navigate = useNavigate(); 
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError('Message cannot be empty');
      return;
    }

    setIsSending(true); 
    setError('');

    try {
      // Fetch the document by id
      const document = await databases.getDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID, 
        id 
      );
        console.log(document)
      setName(document.name)
      const updatedMessages = [...document.messages, message]; // Add new message to the existing array

      // Update the document with the new messages array
      await databases.updateDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        id,
        {
          messages: updatedMessages, // Update the messages field with the new array
        }
      );

      // Set the state to show that the message has been sent
      setMessage('');
      setIsSending(false);
      setIsMessageSent(true); // Mark as message sent

    } catch (err) {
      setError('Failed to send message');
      setIsSending(false); 
      setIsMessageSent(false);
    }
  };

  const handleRedirectToHome = () => {
    navigate('/'); // Redirect to the home page
  };

  useEffect(() => {
    const fetchMessages = async () => {
        try {
            const response = await databases.getDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID,
                id
            );

            setName(response.name);
        } catch (err) {
            console.log(err);
            setName("your friend");
        }
    };

    fetchMessages();
}, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Send a Message</h1>
        <p className=" mb-6">Share your thoughts about <strong>{name}</strong> anonymously.</p>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Show the message input form if the message is not sent yet */}
        {!isMessageSent ? (
          <form onSubmit={handleSendMessage}>
            <div className="mb-4">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Type your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className={`w-full py-3 px-4 rounded-lg shadow-lg ${isSending ? 'bg-gray-400' : 'bg-purple-600'} text-white transition-all`}
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        ) : (
          // If the message is sent, show the success message and link to home page
          <div className="mt-6 text-gray-600">
            <p className="text-lg font-semibold">Your message was sent successfully!</p>
            <button
              onClick={handleRedirectToHome}
              className="mt-4 w-full bg-purple-600 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-purple-700 transition-all"
            >
              Create Your Own Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendMessagePage;
