import HomePage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import { Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import "./App.css";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/chats" element={<ChatPage />} />
        </Routes>
      </div>
    </SnackbarProvider>
  );
}

export default App;
