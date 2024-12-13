import React, { useEffect } from "react";
import UserNavbar from "./UserNavbar";
import { FaLocationDot } from "react-icons/fa6";

import { useState } from "react";
import { Link } from "react-router-dom";
import "./Property.css";
import axios from "axios";
import Footer from "./Footer";
function Property() {
  const [unitType, setUnitType] = useState("For Rent");
  const [location, setLocation] = useState("any");
  const [propertySize, setPropertySize] = useState("allSizes");
  const [bedroom, setBedrooms] = useState("any");
  const [maxPrice, setMaxPrice] = useState("any");
  const [data, setData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/Property/getProperty"
      );
      if (response.data.data) {
        setData(response.data.data);
        setDefaultData(response.data.data);
        console.log(response.data.data);
      } else if (!response.data) {
        console.log("data not found");
      }
    };
    fetch();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent page reload
    const filteredData = defaultData.filter((property) => {
      return (
        (unitType === "For Rent" || property.unitType === unitType) &&
        (location === "any" ||
          (property.city &&
            property.city.toLowerCase() === location.toLowerCase())) &&
        (propertySize === "allSizes" || property.size === propertySize) &&
        (bedroom === "any" || property.bedroom === parseInt(bedroom)) &&
        (maxPrice === "any" || parseInt(property.price) <= parseInt(maxPrice))
      );
    });
    setData(filteredData); // Update data with filtered results
  };

  const resetFilters = (event) => {
    event.preventDefault();
    setData(defaultData); // Reset data
    setUnitType("For Rent");
    setLocation("any");
    setPropertySize("allSizes");
    setBedrooms("any");
    setMaxPrice("any");
  };

  return (
    <>
      <UserNavbar />
      <div
        className="container-fluid hero"
        style={{ width: "100%", height: "90vh", position: "relative" }}
      >
        <div
          className="container sub"
          style={{
            width: "80%",
            height: "40vh",
            position: "absolute",
            bottom: "32%",
            right: "10%",
          }}
        >
          <h1>Your Dream Home </h1>
          <h3 style={{ color: "white", textAlign: "center" }}>
            Is One Click Away
          </h3>
          <div className="search-container" style={{ width: "100%" }}>
            <form>
              <div className="row" style={{ marginLeft: "30px" }}>
                <div className="filters">
                  <div className="radio-buttons">
                    <input
                      type="radio"
                      id="forRent"
                      name="unitType"
                      value="For Rent"
                      checked={unitType === "For Rent"}
                      onChange={() => setUnitType("For Rent")}
                    />
                    <label htmlFor="forRent">For Rent</label>
                    <input
                      type="radio"
                      id="forSale"
                      name="unitType"
                      value="For Sale"
                      checked={unitType === "For Sale"}
                      onChange={() => setUnitType("For Sale")}
                    />
                    <label htmlFor="forSale">For Sale</label>
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginLeft: "30px" }}>
                <div className="filters">
                  <label>LOCATION</label>
                  <select
                    id="location"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="allCities">All Cities</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="latur">Latur</option>
                    <option value="delhi">Delhi</option>
                    <option value="pune">Pune</option>
                    <option value="avarangabad">Avarangabad</option>
                  </select>
                </div>

                <div className="filters" style={{ marginLeft: "20px" }}>
                  <label>PROPERTY SIZE</label>
                  <select
                    id="propertySize"
                    name="propertySize"
                    value={propertySize}
                    onChange={(e) => setPropertySize(e.target.value)}
                  >
                    <option value="allSizes">All Sizes</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div className="filters" style={{ marginLeft: "50px" }}>
                  <label>BEDROOMS</label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    value={bedroom}
                    onChange={(e) => setBedrooms(e.target.value)}
                  >
                    <option value="any">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div className="filters" style={{ marginLeft: "30px" }}>
                  <label>BUDGET</label>
                  <select
                    id="maxPrice"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  >
                    <option value="any">Max. Price</option>
                    <option value="100000">100,000</option>
                    <option value="200000">200,000</option>
                    <option value="500000">500,000</option>
                  </select>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={handleSearch}
                  style={{ height: "6vh", marginTop: "5vh", marginLeft: "1vh" }}
                >
                  Search
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={resetFilters}
                  style={{ height: "6vh", marginTop: "5vh", marginLeft: "1vh" }}
                >
                  Reset Filters
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {data.map((e) => {
            const images = e.Image
              ? e.Image.split(",").map(
                  (fileName) => `http://localhost:8000/uploads/${fileName}`
                )
              : [];
            console.log(images);
            return (
              <div
                className="card "
                style={{ width: "300px", margin: "40px" }}
                key={e._id}
              >
                <Link to={`/PropertyDetails/${e._id}`}>
                  <img
                    className="card-img-top"
                    src={images[1]}
                    alt="Card image cap"
                    style={{
                      width: "100%",
                      height: "50vh",
                      position: "relative",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      padding: "5px",
                      borderRadius: "3px",
                      fontSize: "14px",
                    }}
                  >
                    {e.propertyStatus}
                  </span>
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{e.title}</h5>
                  <p className="card-text">
                    <FaLocationDot />
                    {e.location}:Pin-{e.pincode}:{e.city}
                  </p>

                  <Link
                    to={`/PropertyDetails/${e._id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Property;
