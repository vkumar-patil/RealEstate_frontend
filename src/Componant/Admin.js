import axios from "axios";
import React, { useState } from "react";

function Admin() {
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [propertySize, setPropertySize] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [garage, setGarage] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [buildyear, setBuildYear] = useState("");
  const [pincode, setPincode] = useState("");
  const [Image, setImages] = useState([]);

  const handleInputChange = (setter) => (e) => setter(e.target.value);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleCheckboxChange = (feature) => {
    setFeatures((prevFeatures) =>
      prevFeatures.includes(feature)
        ? prevFeatures.filter((f) => f !== feature)
        : [...prevFeatures, feature]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("budget", budget);
    formData.append("propertyStatus", propertyStatus);
    formData.append("bedroom", bedroom);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("features", JSON.stringify(features)); // Convert array to string
    formData.append("propertySize", propertySize);
    formData.append("propertyType", propertyType);
    formData.append("garage", garage);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("location", location);
    formData.append("pincode", pincode);
    formData.append("bathroom", bathroom);
    formData.append("buildyear", buildyear);
    Image.forEach((Image, index) => {
      formData.append("Image", Image);
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/Admin/Addproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer token", // Replace 'token' with your actual token
          },
        }
      );
      console.log("Data submitted successfully:", response.data.data, response);
      alert("Data submitted successfully");
    } catch (error) {
      console.error(
        "Error submitting data:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="inputTitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="inputTitle"
              placeholder="Title"
              value={title}
              onChange={handleInputChange(setTitle)}
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputBudget">Budget</label>
            <input
              type="text"
              className="form-control"
              id="inputBudget"
              placeholder="Budget"
              value={budget}
              onChange={handleInputChange(setBudget)}
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputPincode">Pincode</label>
            <input
              type="text"
              className="form-control"
              id="inputPincode"
              placeholder="Pincode"
              value={pincode}
              onChange={handleInputChange(setPincode)}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">Property Status</label>
            <select
              id="inputState"
              className="form-control"
              value={propertyStatus}
              onChange={handleInputChange(setPropertyStatus)}
            >
              <option value="">Choose...</option>
              <option value="For Rent">For Rent</option>
              <option value="For Sale">For Sale</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputAddress">Address</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
              value={address}
              onChange={handleInputChange(setAddress)}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputDescription">Description</label>
            <input
              type="text"
              className="form-control"
              id="inputDescription"
              placeholder="Apartment, studio, or floor"
              value={description}
              onChange={handleInputChange(setDescription)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-2">
            <label htmlFor="inputBedroom">Bedroom</label>
            <select
              id="inputBedroom"
              className="form-control"
              value={bedroom}
              onChange={handleInputChange(setBedroom)}
            >
              <option value="">Choose...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputBathroom">Bathroom</label>
            <select
              id="inputBathroom"
              className="form-control"
              value={bathroom}
              onChange={handleInputChange(setBathroom)}
            >
              <option value="">Choose...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputPropertySize">Property Size</label>
            <input
              type="text"
              className="form-control"
              id="inputPropertySize"
              value={propertySize}
              onChange={handleInputChange(setPropertySize)}
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputPropertySize">BuildYear</label>
            <input
              type="text"
              className="form-control"
              id="inputBuildYear"
              value={buildyear}
              onChange={handleInputChange(setBuildYear)}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputPropertyType">Property Type</label>
            <select
              id="inputPropertyType"
              className="form-control"
              value={propertyType}
              onChange={handleInputChange(setPropertyType)}
            >
              <option value="">Choose...</option>
              <option value="Shared House">Shared House</option>
              <option value="Villa">Villa</option>
            </select>
          </div>
          <div className="row">
            <div className="form-group col-md-2">
              <label htmlFor="inputGarage">Garage</label>
              <select
                id="inputGarage"
                className="form-control"
                value={garage}
                onChange={handleInputChange(setGarage)}
              >
                <option value="">Choose...</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>

            <div className="form-group col-md-2">
              <label htmlFor="inputCity">City</label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
                value={city}
                onChange={handleInputChange(setCity)}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputState">State</label>
              <select
                id="inputState"
                className="form-control"
                value={state}
                onChange={handleInputChange(setState)}
              >
                <option value="">Choose...</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="UP">UP</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputImages">Images</label>
              <input
                type="file"
                className="form-control"
                id="inputImages"
                name="Image"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputCountry">Country</label>
              <input
                type="text"
                className="form-control"
                id="inputCountry"
                value={country}
                onChange={handleInputChange(setCountry)}
              />
            </div>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="inputCountry">location</label>
            <input
              type="text"
              className="form-control"
              id="inputlocation"
              value={location}
              onChange={handleInputChange(setLocation)}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Features</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="featureAC"
                checked={features.includes("AC")}
                onChange={() => handleCheckboxChange("AC")}
              />
              <label className="form-check-label" htmlFor="featureAC">
                AC
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="featureGarden"
                checked={features.includes("Garden")}
                onChange={() => handleCheckboxChange("Garden")}
              />
              <label className="form-check-label" htmlFor="featureGarden">
                Garden
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="featureGYM"
                checked={features.includes("GYM")}
                onChange={() => handleCheckboxChange("GYM")}
              />
              <label className="form-check-label" htmlFor="featureGYM">
                GYM
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="featureClubHouse"
                checked={features.includes("ClubHouse")}
                onChange={() => handleCheckboxChange("ClubHouse")}
              />
              <label className="form-check-label" htmlFor="featureClubHouse">
                Club House
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="featureFreezer"
                checked={features.includes("Freezer")}
                onChange={() => handleCheckboxChange("Freezer")}
              />
              <label className="form-check-label" htmlFor="featureFreezer">
                Freezer
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="featureSofa"
                checked={features.includes("Sofa")}
                onChange={() => handleCheckboxChange("Sofa")}
              />
              <label className="form-check-label" htmlFor="featureSofa">
                Sofa
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="featureFurnished"
                checked={features.includes("Furnished")}
                onChange={() => handleCheckboxChange("Furnished")}
              />
              <label className="form-check-label" htmlFor="featureFurnished">
                Furnished
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Admin;
