import React, { useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { AiOutlinePropertySafety } from "react-icons/ai";
import InquiryModal from "./InquiryModel";

function AdminNavbar() {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand-info" href="">
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
                className="btn btn-link nav-link"
                onClick={handleModalToggle}
              >
                <MdNotificationsActive />
                Inquiry Notification
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
