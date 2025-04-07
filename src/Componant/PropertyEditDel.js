import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./PropertyEditDel.css";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate(); // For navigating after the update
  const [detail, setDetail] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    propertyStatus: "",
    address: "",
    description: "",
    propertyType: "",
    propertySize: "",
    bedroom: "",
    garage: "",
    image: "", // Add an image field
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://realestate-back-x6dl.onrender.com/api/Property/${id}`
        );
        const data = response.data.data;
        if (Array.isArray(data)) {
          setDetail(data); // If data is an array
        } else if (typeof data === "object" && data !== null) {
          setDetail([data]); // Wrap single object in an array
        }
        setFormData({
          title: data.title,
          city: data.city,
          propertyStatus: data.propertyStatus,
          address: data.address,
          description: data.description,
          propertyType: data.propertyType,
          propertySize: data.propertySize,
          bedroom: data.bedroom,
          garage: data.garage,
          image: data.Image,
        });
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://realestate-back-x6dl.onrender.com/api/Property/updateProperty/${id}`,
        formData
      );
      console.log("Property updated successfully:", response.data);
      navigate(`/AdminHomepage`); // Navigate to the updated property page
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  if (detail.length === 0) {
    return <div>No property details available.</div>;
  }

  return (
    <>
      <AdminNavbar />
      <div className="container">
        {detail.map((e) => (
          <>
            <div className="col-md-12" style={{ textAlign: "center" }}>
              <h2
                style={{
                  fontFamily: "fantasy",
                  marginTop: "0",
                  paddingTop: "0",
                  textAlign: "center",
                }}
              >
                Intrested Customers
              </h2>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col">sr.no</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                  </tr>
                </thead>
                {e.interestedUsers.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{element.username}</td>
                      <td>{element.email}</td>
                      <td>{element.contact}</td>
                    </tr>
                  );
                })}
              </table>
            </div>

            <div key={e._id} className="card" style={{ margin: "20px" }}>
              <button className="btn btn-warning">
                <FaEdit />
                Edit Property
              </button>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Property Status</label>
                  <input
                    type="text"
                    name="propertyStatus"
                    value={formData.propertyStatus}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Property Type</label>
                  <input
                    type="text"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Property Size (m²)</label>
                  <input
                    type="number"
                    name="propertySize"
                    value={formData.propertySize}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Bedrooms</label>
                  <input
                    type="number"
                    name="bedroom"
                    value={formData.bedroom}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Garage</label>
                  <input
                    type="number"
                    name="garage"
                    value={formData.garage}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <button className="btn btn-primary">Update Property</button>
              </form>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default EditProperty;
