import { useEffect, useState } from "react";
import axios from "axios";

export default function Chatpage() {
  const [chats, setChats] = useState([]);
  async function fetchChats() {
    const data = await axios.get("http://localhost:5000/api/chats");
    setChats(data.data.chats);
  }

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div className="chat-page">
      <h1>Chat Page</h1>
      <div className="chat-list">
        {chats.map((chat) => (
          <div key={chat.id} className="chat-item">
            <h2>{chat.name}</h2>
            <p>{chat.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
