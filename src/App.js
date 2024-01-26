import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import Signup from "./pages/signup";
import LoginForm from "./pages/login";

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed8",
              },
            },
          }}
        ></Toaster>
      </div>
      <Router>
        <Routes>
          
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<LoginForm/>}></Route>
          <Route path="/editor/:roomId" element={<EditorPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
