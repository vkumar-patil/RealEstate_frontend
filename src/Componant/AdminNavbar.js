import React, { useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { AiOutlinePropertySafety } from "react-icons/ai";
import InquiryModal from "./InquiryModel";
import { useNavigate } from "react-router-dom";
function AdminNavbar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <li className="navbar-brand-info" style={{ listStyle: "none" }}>
          <AiOutlinePropertySafety />
          Logo
        </li>
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
              <button className="btn mr-2">
                Home <span className="sr-only">(current)</span>
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-worn nav-link"
                onClick={handleModalToggle}
              >
                <strong>Inquiry Notification</strong>
                <MdNotificationsActive />
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger ml-2" onClick={handlelogout}>
                LogOut
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Render the modal */}
      {showModal && <InquiryModal onClose={handleModalToggle} />}
    </>
  );
}

export default AdminNavbar;
