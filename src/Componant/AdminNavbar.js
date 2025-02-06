import React, { useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { AiOutlinePropertySafety } from "react-icons/ai";
import InquiryModal from "./InquiryModel";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
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
        <li
          className="navbar-brand-info"
          style={{ listStyle: "none", fontSize: "2rem" }}
        >
          <AiOutlinePropertySafety />
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
              <button className="nav-link btn btn-link mr-2">
                <Link
                  to="/AdminHomepage"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <FaHome /> Home <span className="sr-only">(current)</span>
                </Link>
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link mr-2"
                onClick={handleModalToggle}
              >
                <strong>Inquiry Notification</strong>
                <MdNotificationsActive />
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={handlelogout}
                style={{ color: "red" }}
              >
                <LuLogOut />
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
