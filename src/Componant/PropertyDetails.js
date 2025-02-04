import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import "./PropertyDetail.css";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import UserNavbar from "./UserNavbar";
import { FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa";
import { GiHomeGarage } from "react-icons/gi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PropertyDetails() {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [showAllImages, setShowAllImages] = useState(false);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/Property/${id}`
        );
        const data = response.data.data;
        console.log(response.data.data);
        if (Array.isArray(data)) {
          setDetail(data); // If data is already an array
        } else if (typeof data === "object" && data !== null) {
          setDetail([data]); // Wrap single object in an array
        } else {
          console.error("Unexpected data format:", data);
          setDetail([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
        setDetail([]); // Fallback to an empty array
      }
    };

    fetchData();
  }, [id]);

  if (detail.length === 0) {
    return <div>No property details available.</div>;
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    console.log(username, email, contact, message);
    // Post inquiry data to your backend
    const res = await axios.post(
      "http://localhost:8000/api/Admin/AddInquiry",
      {
        username,
        email,
        contact,
        message,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.data) {
      alert("inquiry fom submite done");
      setUsername(" ");
      setEmail(" ");
      setContact(" ");
      setMessage(" ");
    }
  };

  const handleInterest = async () => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      alert("Please log in to express interest!");
      return;
    }

    try {
      // Fetch user details using the token
      const userResponse = await axios.get(
        "http://localhost:8000/api/user/userdetails",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const user = userResponse.data;
      console.log(user);

      // Send interest data to the backend
      const interestedData = {
        userId: user._id,
        username: user.username,
        email: user.email,
        contact: user.contact, // Assuming contact is part of user details
        id,
      };

      await axios.post(
        `http://localhost:8000/api/Property/addInterestedUser/${id}`,
        interestedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Interest sent to Seller!");
    } catch (error) {
      console.error("Error expressing interest:", error);
      alert("Failed to send interest. Please try again.");
    }
  };
  const toggleImages = () => {
    setShowAllImages(!showAllImages); // Toggle image visibility
  };
  const settings = {
    dots: true, // Enable dots
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of cards to show at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <UserNavbar />
      <div className="container-fluid">
        {detail.map((e, index) => {
          // Process images to avoid duplicates
          const images = e.Image
            ? e.Image.split(",").map((fileName) => {
                // Avoid adding 'http://localhost:8000/uploads/' again if it's already included
                const imageUrl = `http://localhost:8000/uploads/${fileName}`;
                return imageUrl.includes("http://localhost:8000/uploads/")
                  ? imageUrl
                  : `http://localhost:8000/uploads/${fileName}`;
              })
            : [];
          console.log("Processed images for property", index + 1, ":", images);
          return (
            <div className="card" style={{ margin: "20px" }} key={e._id}>
              <div>
                <h4> {e.title} </h4>
                <small className="location">
                  <FaLocationDot />
                  {e.city}
                </small>
                <span className="rupay">
                  <FaRupeeSign />
                  {e.budget}
                </span>
              </div>
              <div style={{ display: "flex" }}>
                <button
                  className="btn btn-secondary"
                  style={{ width: "100px", margin: "10px" }}
                >
                  {e.propertyStatus}
                </button>
                <button
                  className="btn btn-warning"
                  style={{ width: "100px", margin: "10px" }}
                >
                  Featured
                </button>
              </div>

              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-8">
                    {/* Displaying images as thumbnails */}
                    <div className="main-image">
                      {images.length > 0 && (
                        <img src={images[1]} alt="Main Property" />
                      )}
                    </div>
                    <div className="image-gallery">
                      {images.slice(1, 5).map((image, idx) => (
                        <div key={idx} className="thumbnail">
                          <img
                            src={image}
                            alt={`Property Thumbnail ${idx + 1}`}
                          />
                        </div>
                      ))}
                      {/* Show More button (arrow) if there are more images */}
                      {images.length > 5 && !showAllImages && (
                        <div className="arrow-right" onClick={toggleImages}>
                          <IoIosArrowDropright />
                        </div>
                      )}
                      {/* Show remaining images if 'showAllImages' is true */}
                      {showAllImages &&
                        images.slice(5).map((image, idx) => (
                          <div
                            key={idx}
                            className="thumbnail"
                            style={{ overflow: "hidden" }}
                          >
                            <img
                              src={image}
                              alt={`Property Thumbnail ${idx + 5}`}
                            />
                          </div>
                        ))}
                      {/* Show a "Hide" arrow if all images are visible */}
                      {showAllImages && (
                        <div className="arrow-left" onClick={toggleImages}>
                          <IoIosArrowDropleft />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <form
                      className="card-form"
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "whitesmoke",
                      }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <h3>Submit an Inquiry</h3>
                      <h5>Property Consultant</h5>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input
                          type="username"
                          className="form-control"
                          id="exampleInputusername1"
                          placeholder="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputtel1">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="exampleInputtel1"
                          placeholder="+91...."
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputtext1">Message</label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputtext1"
                          placeholder="Enter text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <h5 className="card-title">{e.title}</h5>
                <p className="card-text">Some quick example text</p>
                <button className="btn btn-primary" onClick={handleInterest}>
                  Interested
                </button>
              </div>

              <h3 style={{ backgroundColor: "ghostwhite" }}>Overview</h3>
              <table className="responsive-table">
                <tr>
                  <th>Property Type</th>
                  <td>{e.propertyType}</td>

                  <th>Size(m2)</th>
                  <td>{e.propertySize}</td>

                  <th>Bedrooms</th>
                  <td>{e.bedroom}</td>

                  <th>Bathrooms</th>
                  <td>{e.bathroom}</td>

                  <th>Garage</th>
                  <td>{e.garage}</td>
                </tr>
              </table>

              <div>
                <h3 style={{ backgroundColor: "ghostwhite" }}>Address</h3>
                <table className="responsive-table">
                  <tr>
                    <td>
                      <strong>Address</strong>
                    </td>
                    <td>{e.address}</td>
                    <td>
                      <strong>Pin Code</strong>
                    </td>
                    <td>{e.pincode}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>City</strong>
                    </td>
                    <td>{e.city}</td>
                    <td>
                      <strong>location</strong>
                    </td>
                    <td>{e.location}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>State/County</strong>
                    </td>
                    <td>{e.state}</td>
                    <td>
                      <strong>Country</strong>
                    </td>
                    <td>{e.country}</td>
                  </tr>
                </table>
              </div>

              <div>
                <h3 style={{ backgroundColor: "ghostwhite" }}>Description</h3>
                <p>{e.description}</p>
              </div>

              <div>
                <h3 style={{ backgroundColor: "ghostwhite" }}>Details</h3>
                <table className="responsive-table">
                  <tr>
                    <td>
                      <strong>Property Id :</strong>
                    </td>
                    <td>{e._id}</td>
                    <td>
                      <strong>Property Size:</strong>
                    </td>
                    <td>{e.propertySize}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Property Type:</strong>
                    </td>
                    <td>{e.propertyType}</td>
                    <td>
                      <strong>Property Status:</strong>
                    </td>
                    <td>{e.propertyStatus}</td>
                  </tr>
                </table>

                <div className="features-container">
                  <h2>Features</h2>
                  <div className="features-grid">
                    {e.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <span className="feature-icon">✔️</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="container">
          <div className="header text-center" style={{ marginBottom: "30px" }}>
            <h2 style={{ fontWeight: "bold", color: "#333" }}>
              Featured Listings
            </h2>
            <p style={{ color: "#777" }}>
              Browse our wide range of featured properties.
            </p>
          </div>

          <Slider {...settings}>
            {data.map((e) => {
              const images = e.Image
                ? e.Image.split(",").map(
                    (fileName) => `http://localhost:8000/uploads/${fileName}`
                  )
                : [];

              return (
                <div key={e._id}>
                  <div
                    className="card"
                    style={{
                      width: "300px",
                      borderRadius: "10px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      margin: "0 auto", // Center align
                    }}
                  >
                    <Link
                      to={`/PropertyDetails/${e._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="property-image"
                        style={{ position: "relative" }}
                      >
                        <img
                          className="card-img-top"
                          src={
                            images[1] || "https://via.placeholder.com/300x200"
                          }
                          alt="Property"
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                        <span
                          className="property-badge"
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            backgroundColor: "#28a745",
                            color: "#fff",
                            padding: "5px 10px",
                            fontSize: "12px",
                            borderRadius: "3px",
                            fontWeight: "bold",
                          }}
                        >
                          {e.propertyStatus || "FOR SALE"}
                        </span>
                      </div>
                    </Link>

                    <div className="card-body" style={{ padding: "15px" }}>
                      <h5
                        className="card-title"
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                      >
                        {e.title || "Light And Modern House"}
                      </h5>
                      <p
                        className="card-text"
                        style={{ fontSize: "14px", color: "#555" }}
                      >
                        <FaMapMarkerAlt
                          style={{ color: "#007bff", marginRight: "5px" }}
                        />
                        {e.location || "Unknown Location"} - Pin{" "}
                        {e.pincode || "000000"}
                      </p>

                      <div
                        className="property-icons"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "10px",
                          fontSize: "14px",
                          color: "#555",
                        }}
                      >
                        <span>
                          <FaBed
                            style={{ color: "#007bff", marginRight: "5px" }}
                          />
                          {e.bedroom || "3"} Beds
                        </span>
                        <span>
                          <FaBath
                            style={{ color: "#007bff", marginRight: "5px" }}
                          />
                          {e.bathroom || "2"} Baths
                        </span>
                        <span>
                          <GiHomeGarage
                            style={{ color: "#007bff", marginRight: "5px" }}
                          />
                          {e.propertySize || "1950"} m²
                        </span>
                      </div>

                      <Link
                        to={`/PropertyDetails/${e._id}`}
                        className="btn btn-primary"
                        style={{
                          marginTop: "15px",
                          width: "100%",
                          padding: "10px",
                          backgroundColor: "#007bff",
                          borderColor: "#007bff",
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default PropertyDetails;
