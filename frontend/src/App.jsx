import HomePage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
