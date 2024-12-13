import React, { useEffect } from "react";
import UserNavbar from "./UserNavbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Property.css";
//import image from "./image/5b80e4666fd9c1acebd26ba0752c102b (1).jpg";
import axios from "axios";
function Property() {
  const [unitType, setUnitType] = useState("For Rent");
  const [location, setLocation] = useState("allCities");
  const [propertySize, setPropertySize] = useState("allSizes");
  const [bedrooms, setBedrooms] = useState("any");
  const [maxPrice, setMaxPrice] = useState("any");
  const [data, setData] = useState([]);

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

  const handleSearch = () => {
    alert(`
      Searching properties with the following criteria:
      Unit Type: ${unitType}
      Location: ${location}
      Property Size: ${propertySize}
      Bedrooms: ${bedrooms}
      Max Price: ${maxPrice}
    `);
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
            height: "30vh",
            position: "absolute",
            bottom: "25%",
            right: "10%",
          }}
        >
          <h1>Your Dream Home </h1>
          <h3 style={{ color: "white", textAlign: "center" }}>
            Is One Click Away
          </h3>
          <div className="search-container " style={{ width: "100%" }}>
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
                    <option value="city1">City 1</option>
                    <option value="city2">City 2</option>
                    <option value="city3">City 3</option>
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
                    value={bedrooms}
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
                  style={{ height: "10px" }}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {data.map((e) => {
            return (
              <div className="card " style={{ width: "300px", margin: "40px" }}>
                <Link to={`/PropertyDetails/${e._id}`}>
                  <img
                    className="card-img-top"
                    src={e.Image}
                    alt="Card image cap"
                    style={{ width: "100%" }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{e.title}Card title</h5>
                  <p className="card-text">Some quick exampl</p>
                  <a href="/" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Property;
