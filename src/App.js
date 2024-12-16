import "./App.css";
import Admin from "./Componant/Admin";
import { Routes, Route } from "react-router-dom";
import Login from "./Login ";
import Property from "./Componant/Property";
import PropertyDetails from "./Componant/PropertyDetails";
import AdminHomepage from "./AdminHomepage";
import PropertyEditDel from "./Componant/PropertyEditDel";
import ProtectedRoute from "./Protectroute";
import Register from "./Register";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/PropertyEditDel/:id"
          element={
            <ProtectedRoute requiredRole={true}>
              <PropertyEditDel />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/AdminHomepage"
          element={
            <ProtectedRoute requiredRole={true}>
              <AdminHomepage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/Admin"
          element={
            <ProtectedRoute requiredRole={true}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route
          path="/Property"
          element={
            <ProtectedRoute>
              <Property />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/Register" element={<Register />}></Route>

        <Route
          path="/PropertyDetails/:id"
          element={
            <ProtectedRoute>
              <PropertyDetails />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
