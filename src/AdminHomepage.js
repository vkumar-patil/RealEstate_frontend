import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminNavbar from "./Componant/AdminNavbar";

function AdminHomepage() {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?",
      id
    );

    if (!confirmed) return;

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/Property/deleteProperty/${id}`
      );

      if (response.status === 200) {
        // Remove the deleted property from the state
        setData(data.filter((item) => item.id !== id));
        alert("Property deleted successfully!");
      } else {
        alert("Failed to delete the property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("An error occurred while deleting the property.");
    }
  };
  useEffect(() => {
    fetch = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/Property/getProperty"
      );
      if (response.data.data) {
        setData(response.data.data);
        console.log(response.data.data);
      } else if (!response.data) {
        console.log("data not found");
      }
    };
    fetch();
  }, []);

  return (
    <>
      <AdminNavbar />
      <Link to={"/Admin"}>
        <button style={{ borderRadius: "10px" }}>Add New Property</button>
      </Link>
      <div className="container">
        <div className="row">
          {data.map((e) => {
            const image = e.Image
              ? e.Image.split(",").map(
                  (fileName) => `http://localhost:8000/uploads/${fileName}`
                )
              : [];

            return (
              <div className="card " style={{ width: "300px", margin: "40px" }}>
                <Link to={`/PropertyEditDel/${e._id}`}>
                  <img
                    className="card-img-top"
                    src={image[1]}
                    alt="Card image cap"
                    style={{ width: "100%", height: "40vh" }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{e.title}Card title</h5>
                  <p className="card-text">Some quick exampl</p>
                  <Link
                    to={`/PropertyEditDel/${e._id}`}
                    className="btn btn-primary"
                  >
                    Show intrested & Edit
                  </Link>
                  <button
                    className="btn btn-danger ml-1"
                    onClick={() => handleDelete(e._id)}
                  >
                    {" "}
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminHomepage;
