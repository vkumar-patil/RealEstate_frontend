import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useParams } from "react-router-dom";

function PropertyDetails() {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/Property/${id}`
        );
        const data = response.data.data;

        if (typeof data === "object" && data !== null) {
          setDetail([data]); // Wrap single object in an array
        } else {
          console.error("Unexpected data format:", data);
          setDetail([]);
        }
        setError(""); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Failed to fetch property details.");
        setDetail([]); // Fallback to an empty array
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (detail.length === 0) {
    return <div>No property details available.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted with: ", { email, contact, message });
  };

  return (
    <div className="container">
      {detail.map((e) => {
        return (
          <div className="card" style={{ margin: "20px" }} key={e._id}>
            <h2>
              {e.title}{" "}
              <small>
                <FaLocationDot />
                {e.city}
              </small>
            </h2>
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
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  {Array.isArray(e.Image) && e.Image.length > 0 ? (
                    e.Image.map((image, index) => (
                      <div key={index}>
                        <img
                          className="card-img-top"
                          src={image}
                          alt="Property"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </div>
                    ))
                  ) : (
                    <div>No images available.</div>
                  )}
                </div>
                <div className="col-md-4">
                  <form
                    className="card-form"
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "whitesmoke",
                    }}
                    onSubmit={handleSubmit}
                  >
                    <h3>Submit an Inquiry</h3>
                    <h5>Property Consultant</h5>
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="+91...."
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        placeholder="Enter your message"
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
              <a href="/" className="btn btn-primary">
                Interested
              </a>
            </div>
            <h3 style={{ backgroundColor: "ghostwhite" }}>Overview</h3>
            <table>
              <thead>
                <tr>
                  <th>Property Type</th>
                  <th>Size (m²)</th>
                  <th>Bedrooms</th>
                  <th>Bathrooms</th>
                  <th>Garage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{e.propertyType}</td>
                  <td>{e.propertySize}</td>
                  <td>{e.bedroom}</td>
                  <td>0</td>
                  <td>{e.garage}</td>
                </tr>
              </tbody>
            </table>
            <h3 style={{ backgroundColor: "ghostwhite" }}>Features</h3>
            {Array.isArray(e.features) && e.features.length > 0 ? (
              <ul>
                {e.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            ) : (
              <p>No features available.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PropertyDetails;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FaLocationDot } from "react-icons/fa6";

// import { useParams } from "react-router-dom";

// function PropertyDetails() {
//   const { id } = useParams();
//   const [detail, setDetail] = useState([]);
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/Property/${id}`
//         );
//         const data = response.data.data;
//         console.log(response.data.data)
//         if (Array.isArray(data)) {
//           setDetail(data); // If data is already an array
//         } else if (typeof data === "object" && data !== null) {
//           setDetail([data]); // Wrap single object in an array
//         } else {
//           console.error("Unexpected data format:", data);
//           setDetail([]); // Fallback to an empty array
//         }
//         console.log("Fetched Data:", data);
//       } catch (error) {
//         console.error("Error fetching property details:", error);
//         setDetail([]); // Fallback to an empty array
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (detail.length === 0) {
//     return <div>No property details available.</div>;
//   }
//   const handleSubmit = (e) => {
//     axios.post("");
//   };

//   return (
//     <div
//       className="container"
//       //style={{ display: "flex", flexWrap: "wrap" }}
//     >
//       {detail.map((e) => {
//         console.log(e.Image);
//         return (
//           <div className="card" style={{ margin: "20px" }} key={e._id}>
//             <h2>
//               {e.title}{" "}
//               <small>
//                 <FaLocationDot />
//                 {e.city}
//               </small>
//             </h2>
//             <div style={{ display: "flex" }}>
//               <button
//                 className="btn btn-secondary"
//                 style={{ width: "100px", margin: "10px" }}
//               >
//                 {e.propertyStatus}
//               </button>
//               <button
//                 className="btn btn-warning"
//                 style={{ width: "100px", margin: "10px" }}
//               >
//                 Fetured
//               </button>
//             </div>
//             <div className="container">
//               <div className="row">
//                 <div className="col-md-8">
//                   {e.Image.map((image, index) => {
//                     console.log(e.Image);
//                     return (
//                       <div key={index}>
//                         <img
//                           className="card-img-top"
//                           src={image}
//                           alt="Property"
//                           style={{ height: "200px", objectFit: "cover" }}
//                         />
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div className="col-md-4">
//                   <form
//                     className="card-form "
//                     style={{
//                       marginLeft: "10px",
//                       backgroundColor: "whitesmoke",
//                     }}
//                     onSubmit={handleSubmit}
//                   >
//                     <h3>Submit an Inquiry</h3>
//                     <h5>Property Consultant</h5>
//                     <div class="form-group">
//                       <label for="exampleInputEmail1">Email address</label>
//                       <input
//                         type="email"
//                         class="form-control"
//                         id="exampleInputEmail1"
//                         aria-describedby="emailHelp"
//                         placeholder="Enter email"
//                         value={email}
//                         oncheng={(e) => setEmail(e.target.value)}
//                       />
//                     </div>

//                     <div class="form-group">
//                       <label for="exampleInputtel1">Phone</label>
//                       <input
//                         type="tel"
//                         class="form-control"
//                         id="exampleInputtel1"
//                         aria-describedby="emailHelp"
//                         placeholder="+91...."
//                         value={contact}
//                         oncheng={(e) => setContact(e.target.value)}
//                       />
//                     </div>
//                     <div class="form-group">
//                       <label for="exampleInputtext1">Message</label>
//                       <input
//                         type="text"
//                         class="form-control"
//                         id="exampleInputtext1"
//                         aria-describedby="emailHelp"
//                         placeholder="Enter text"
//                         value={message}
//                         oncheng={(e) => setMessage(e.target.value)}
//                       />
//                     </div>
//                     <button class="btn btn-primary">Submit</button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//             <div className="card-body">
//               <h5 className="card-title">{e.title}</h5>
//               <p className="card-text">Some quick example text</p>
//               <a href="/" className="btn btn-primary">
//                 Intressted
//               </a>
//             </div>
//             <h3 style={{ backgroundColor: "ghostwhite" }}>overviw</h3>
//             <table>
//               <tr>
//                 <th>Property Type</th>
//                 <th>Size(m2)</th>
//                 <th>Bedrooms</th>
//                 <th>Bathrooms</th>
//                 <th>Gareg</th>
//               </tr>
//               <tr>
//                 <td>{e.propertyType}</td>
//                 <td>{e.propertySize}</td>
//                 <td>{e.bedroom}</td>
//                 <td>0</td>
//                 <td>{e.garage}</td>
//               </tr>
//             </table>
//             <div>
//               <h3 style={{ backgroundColor: "ghostwhite" }}>Address</h3>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <tr>
//                   <td>
//                     <strong>Address</strong>
//                   </td>
//                   <td>{e.address}</td>
//                   <td>
//                     <strong>Zip/Postal Code</strong>
//                   </td>
//                   <td>78731</td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>City</strong>
//                   </td>
//                   <td>{e.city}</td>
//                   <td>
//                     <strong>Area</strong>
//                   </td>
//                   <td>Knollwood</td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>State/County</strong>
//                   </td>
//                   <td>{e.state}</td>
//                   <td>
//                     <strong>Country</strong>
//                   </td>
//                   <td>{e.country}</td>
//                 </tr>
//               </table>
//             </div>
//             <div>
//               <h3 style={{ backgroundColor: "ghostwhite" }}>Discription</h3>
//               <p>{e.description}</p>
//             </div>
//             <div>
//               <h3 style={{ backgroundColor: "ghostwhite" }}>Details</h3>
//               <table>
//                 <tr>
//                   <td>
//                     <strong>Property Id :</strong>
//                   </td>
//                   <td>{e._id}</td>
//                   <td>
//                     <strong>Property Size:</strong>
//                   </td>
//                   <td>{e.propertySize}</td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>Property Type:</strong>
//                   </td>
//                   <td>{e.propertyType}</td>
//                   <td>
//                     <strong>Property Status:</strong>
//                   </td>
//                   <td>{e.propertyStatus}</td>
//                 </tr>
//               </table>
//               <div className="features-container">
//                 <h2>Features</h2>
//                 <div className="features-grid">
//                   {e.features.map((feature, index) => (
//                     <div key={index} className="feature-item">
//                       <span className="feature-icon">✔️</span>
//                       {feature}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default PropertyDetails;
