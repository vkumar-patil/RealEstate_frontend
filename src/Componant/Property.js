import React, { useEffect } from "react";
import UserNavbar from "./UserNavbar";
import { FaLocationDot } from "react-icons/fa6";
import oneimg from "./image/penthouse experience with a living room that encapsulates luxury, boasting generous seating.jpeg";
import siximg from "./image/Elevate Your Lifestyle_ Pinnacle of Penthouse Elegance with a View.jpeg";
import threeimg from "./image/download (10).jpeg";
import fourimg from "./image/@lucyamich.jpeg";
import fiveimg from "./image/Interior Sarah Sadeq architects Kuwait.jpeg";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Property.css";
import axios from "axios";
import Footer from "./Footer";
import { useMediaQuery } from "react-responsive";
function Property() {
  const [unitType, setUnitType] = useState("For Rent");
  const [location, setLocation] = useState("any");
  const [propertySize, setPropertySize] = useState("allSizes");
  const [bedroom, setBedrooms] = useState("any");
  const [maxPrice, setMaxPrice] = useState("any");
  const [data, setData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const isDesktop = useMediaQuery({ minWidth: 769 });
  const isTablet = useMediaQuery({ minWidth: 481, maxWidth: 768 });
  const [showmore, setShowmore] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  //const isMobile = useMediaQuery({ maxWidth: 480 });
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

  const togleShowmore = () => {
    setShowmore(!showmore);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
                    <option value="mumbai">mumbai</option>;
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
                style={{ width: "320px", margin: "20px" }}
                key={e._id}
              >
                <Link to={`/PropertyDetails/${e._id}`}>
                  <img
                    className="card-img-top"
                    src={images[1]}
                    alt="image "
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
      <div className="container " style={{ margin: "20px" }}>
        <button
          className="btn btn-primary"
          onClick={togleShowmore}
          style={{ marginLeft: "50%" }}
        >
          {showmore ? "Showless" : "Load more"}
        </button>
        {showmore && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isDesktop
                  ? "repeat(5, 1fr)"
                  : isTablet
                  ? "repeat(2, 1fr)"
                  : "1fr",
                gridTemplateRows: isDesktop ? "repeat(4, 150px)" : "auto",
                gap: "10px",
                margin: "20px",
              }}
            >
              <div
                style={{
                  borderTopLeftRadius: "10%",
                  gridColumn: isDesktop ? "1 / 3" : "1 / 2",
                  gridRow: isDesktop ? "1 / 4" : "1 / 2",
                }}
              >
                <img
                  src={oneimg}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderTopLeftRadius: "10%",
                    borderBottomLeftRadius: "10%",
                  }}
                />
              </div>
              <div
                style={{
                  gridColumn: isDesktop ? "3 / 4" : "1 / 2",
                  gridRow: "1 / 2",
                }}
              >
                <img src={fourimg} style={{ width: "100%", height: "100%" }} />
              </div>
              <div
                style={{
                  gridColumn: isDesktop ? "4 / 6" : "1 / 2",
                  gridRow: "1 / 2",
                }}
              >
                <h2>Wide Selection Of Properties</h2>
                <p>
                  "Find Your Dream Property with a Tap!" "Your Key to Buying,
                  Selling, and Renting Made Easy!" "Turning Listings into Homes,
                  Hassle-Free." "Simplifying Real Estate, One Property at a
                  Time." "Explore. Choose. Own – All in One App!" "Property
                  Deals at Your Fingertips."
                </p>
              </div>
              <div
                style={{
                  gridColumn: isDesktop ? "3 / 5" : "1 / 2",
                  gridRow: isDesktop ? "2 / 4" : "2 / 3",
                }}
              >
                <img src={threeimg} style={{ width: "100%", height: "100%" }} />
              </div>
              <div
                style={{
                  gridColumn: isDesktop ? "5 / 6" : "1 / 2",
                  gridRow: "2 / 3",
                }}
              >
                <img
                  src={fiveimg}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderTopRightRadius: "10%",
                  }}
                />
              </div>
              <div
                style={{
                  gridColumn: isDesktop ? "5 / 6" : "1 / 2",
                  gridRow: "3 / 4",
                }}
              >
                <img
                  src={siximg}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderBottomRightRadius: "10%",
                  }}
                />
              </div>
            </div>
            <div className="homepageDiv">
              <div className="row">
                <div className="col-md-4">
                  <h1>Whay Our service is the Perfect Choice ? </h1>
                  <h2 style={{ marginTop: "50px", color: "white" }}>02</h2>
                  <p style={{ color: "white" }}>
                    Our expert team ensures smooth transactions, saving you time
                    and effort. With transparent pricing and dedicated support,
                    your satisfaction is our priority. Trust us to turn your
                    property into a successful sale!"
                  </p>
                </div>
                <div className="col-md-4">
                  <h2 style={{ color: "white" }}>01</h2>
                  <p style={{ color: "white" }}>
                    Our property selling service is your perfect choice because
                    we offer tailored marketing strategies to maximize
                    visibility and attract buyers.
                  </p>
                  <h2 style={{ color: "white" }}>03</h2>
                  <p style={{ color: "white" }}>
                    "Our service leverages advanced technology and market
                    insights to get the best value for your property.
                  </p>
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
                      <label htmlFor="exampleInputEmail1">Email address</label>
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
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Property;
