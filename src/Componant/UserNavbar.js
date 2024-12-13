import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlinePropertySafety } from "react-icons/ai";

const UserNavbar = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand-info" href="/">
          <AiOutlinePropertySafety />
          Logo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => openModal("explore")}
              >
                <FaLocationDot />
                Explore
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => openModal("aboutUs")}
              >
                About Us
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => openModal("contactUs")}
              >
                Contact Us
              </button>
            </li>
            <button
              className="btn btn-primary"
              onClick={() => openModal("requestCall")}
            >
              <FaPhoneAlt />
              Request Call
            </button>
          </ul>
        </div>
      </nav>

      {/* Modals */}
      {activeModal === "explore" && (
        <Modal title="Explore" onClose={closeModal}>
          <p>
            Discover new destinations, properties, and opportunities that match
            your needs. Explore the best locations with detailed insights, user
            reviews, and recommendations.
          </p>
        </Modal>
      )}
      {activeModal === "aboutUs" && (
        <Modal title="About Us" onClose={closeModal}>
          <p>
            We are a leading platform committed to connecting seekers with
            properties. Our mission is to provide reliable and efficient
            solutions tailored to your requirements. Founded in 2024, our team
            has helped thousands of users find their perfect match.
          </p>
        </Modal>
      )}
      {activeModal === "contactUs" && (
        <Modal title="Contact Us" onClose={closeModal}>
          <p>
            Have questions? Reach out to us! Phone: +1 234 567 890 Email:
            support@example.com Address: 123, Main Street, Your City, Country
            We're here to assist you 24/7!
          </p>
        </Modal>
      )}
      {activeModal === "requestCall" && (
        <Modal title="Request a Call" onClose={closeModal}>
          <p>
            Looking for assistance? Provide your contact details below Click On
            Viw-Detail Button And fill -Submit inquiry Form, and our team will
            get in touch with you shortly. Submit your details to request a
            callback from our experts!
          </p>
        </Modal>
      )}
    </>
  );
};

// Reusable Modal Component
const Modal = ({ title, children, onClose }) => {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>{title}</h2>
        <div>{children}</div>
        <button style={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// Styles for Modal
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  closeButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UserNavbar;
