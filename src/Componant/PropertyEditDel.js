import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./PropertyEditDel.css";
import { useParams, useNavigate } from "react-router-dom";

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
          `http://localhost:8000/api/Property/${id}`
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
        `http://localhost:8000/api/Property/updateProperty/${id}`,
        formData
      );
      console.log("Property updated successfully:", response.data);
      navigate(`/propertyDetails/${id}`); // Navigate to the updated property page
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  if (detail.length === 0) {
    return <div>No property details available.</div>;
  }

  return (
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
                {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{element.username}</td>
                      <td>{element.email}</td>
                      <td>{element.contact}</td>
                    </tr>
                  );
                }
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
  );
}

export default EditProperty;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FaLocationDot } from "react-icons/fa6";
// import { FaEdit } from "react-icons/fa";
// import "./PropertyEditDel.css";
// import { Link, useParams } from "react-router-dom";

// function PropertyEditDel() {
//   const { id } = useParams();
//   const [detail, setDetail] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/Property/${id}`
//         );
//         const data = response.data.data;
//         console.log(response.data.data);
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

//   return (
//     <div
//       className="container"
//       //style={{ display: "flex", flexWrap: "wrap" }}
//     >
//       <Link className="btn btn-warning" to={"/EditProperty"}>
//         <FaEdit />
//         Edit Property
//       </Link>

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
//             </div>
//             <div className="container">
//               <div className="row">
//                 <div className="col-md-4">
//                   <img
//                     className="card-img-top"
//                     src={e.Image}
//                     alt="Property"
//                     style={{ height: "200px", objectFit: "cover" }}
//                   />
{
  /* {e.Image.map((image, index) => {
                    console.log(e.Image);
                    return (
                      <div key={index}>
                        <img
                          className="card-img-top"
                          src={image}
                          alt="Property"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </div>
                    );
                  })} */
}
//     </div>
//     <div className="col-md-8" style={{ textAlign: "center" }}>
//       <h2
//         style={{
//           fontFamily: "fantasy",
//           marginTop: "0",
//           paddingTop: "0",
//         }}
//       >
//         Intrested Customers
//       </h2>
//       <table className="table table-hover table-bordered">
//         <thead>
//           <tr>
//             <th scope="col">sr.no</th>
//             <th scope="col">Name</th>
//             <th scope="col">Email</th>
//             <th scope="col">Contact</th>
//           </tr>
//         </thead>
//         {e.interestedUsers.map((element, index) => {
//           {
//             return (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{element.username}</td>
//                 <td>{element.email}</td>
//                 <td>{element.contact}</td>
//               </tr>
//             );
//           }
//         })}
//       </table>
//     </div>
//   </div>
// </div>
// <div className="card-body">
//   <h5 className="card-title">{e.title}</h5>
//   <p className="card-text">Some quick example text</p>
// </div>
{
  /* <h3 style={{ backgroundColor: "ghostwhite" }}>overviw</h3>
            <table>
              <tr>
                <th>Property Type</th>
                <th>Size(m2)</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Gareg</th>
              </tr>
              <tr>
                <td>{e.propertyType}</td>
                <td>{e.propertySize}</td>
                <td>{e.bedroom}</td>
                <td>0</td>
                <td>{e.garage}</td>
              </tr>
            </table>
            <div>
              <h3 style={{ backgroundColor: "ghostwhite" }}>Address</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tr>
                  <td>
                    <strong>Address</strong>
                  </td>
                  <td>{e.address}</td>
                  <td>
                    <strong>Zip/Postal Code</strong>
                  </td>
                  <td>78731</td>
                </tr>
                <tr>
                  <td>
                    <strong>City</strong>
                  </td>
                  <td>{e.city}</td>
                  <td>
                    <strong>Area</strong>
                  </td>
                  <td>Knollwood</td>
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
              <h3 style={{ backgroundColor: "ghostwhite" }}>Discription</h3>
              <p>{e.description}</p>
            </div>
            <div>
              <h3 style={{ backgroundColor: "ghostwhite" }}>Details</h3>
              <table>
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
            </div> */
}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default PropertyEditDel;
