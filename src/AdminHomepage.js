import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import { useParams } from "react-router-dom";
import AdminNavbar from "./Componant/AdminNavbar";
import "./AdminHomepage.css";
function AdminHomepage() {
  //const { id } = useParams();
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
    const fetch = async () => {
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
      <Link to={"/Admin"} style={{ textDecoration: "none" }}>
        <button
          className="mt-1"
          style={{ borderRadius: "10px", marginLeft: "15px" }}
        >
          Add New Property
        </button>
      </Link>
      <div className="container-fluid mt-5">
        <div className="row">
          {data.map((e) => {
            const image = e.Image
              ? e.Image.split(",").map(
                  (fileName) => `http://localhost:8000/uploads/${fileName}`
                )
              : [];

            return (
              <div
                className="card AdminCart "
                style={{ width: "350px", margin: "20px", borderRadius: "20px" }}
                key={e._id}
              >
                <img
                  className="card-img-top"
                  src={image[1]}
                  alt="Card  cap"
                  style={{
                    width: "100%",
                    height: "40vh",
                    borderTopRightRadius: "20px",
                    borderTopLeftRadius: "20px",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{e.title}</h5>
                  <p className="card-text">Some quick exampl</p>
                  <Link
                    to={`/PropertyEditDel/${e._id}`}
                    className="btn btn-primary"
                    style={{ listStyle: "none" }}
                  >
                    Show intrested & Edit
                  </Link>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => handleDelete(e._id)}
                  >
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
