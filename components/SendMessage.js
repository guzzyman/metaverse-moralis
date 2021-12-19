import { useState } from "react";
import { user, useMoralis } from "react-moralis";

function SendMessage({endOfMessagesRef}) {
  const { user, Moralis } = useMoralis();
  const [message, setMessage] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();

    if (!message) return;
    // If the user has a message add the message to moralis
    const Messages = Moralis.Object.extend("Messages");
    const messages = new Messages();

    messages
      .save({
        message: message,
        username: user.getUsername(),
        ethAddress: user.get("ethAddress"),
      })
      .then(
        (message) => {
            // The message was saved successfully
        },
        (error) => {
            // The save failed
            // Error is a Moralis.Error with an error code and messages
            console.log(error.message);
        }
      );
      endOfMessagesRef.current.scrollIntoView({
          behavior: 'smooth'
      });

      // Set message to be empty after send
      setMessage('');
  };
  return (
    <form className="flex fixed bottom-10 bg-black opacity-80 w-11/12 px-6 py-4 max-w-2xl shadow-xl rounded-full border-blue-500 border-4">
      <input
        className="flex-grow outline-none bg-transparent text-white placeholder-gray-500"
        type="text"
        value={message}
        placeholder={`Enter a Message ${user.getUsername()}...`}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} className="font-bold text-pink-500">
        Send
      </button>
    </form>
  );
}

export default SendMessage;
