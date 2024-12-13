import "./App.css";
import Admin from "./Componant/Admin";
import { Routes, Route } from "react-router-dom";
import Login from "./Login ";
import Property from "./Componant/Property";
import PropertyDetails from "./Componant/PropertyDetails";
function App() {
  return (
    <>
      <Routes>
        <Route path="/Admin" element={<Admin />} />
        <Route path="/" element={<Login />} />
        <Route path="/Property" element={<Property />}></Route>
        <Route
          path="/PropertyDetails/:id"
          element={<PropertyDetails />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
