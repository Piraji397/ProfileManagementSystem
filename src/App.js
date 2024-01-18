import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Dashboard from "./components/Pages/Dashboard";
import Login from "./components/Pages/Login";
import MyProfile from "./components/Pages/MyProfile";
import PrivateRoute from "./components/Pages/PrivateRoute";
import Signup from "./components/Pages/Signup";

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
