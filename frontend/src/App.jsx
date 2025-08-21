import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Main/Home/Home";
import Login from "./Components/Login/Login";
import SignIn from "./Components/SignIn/SignIn";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/" replace />
            ) : (
              <SignIn />
            )
          }
        />
        <Route
          path="/login"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
