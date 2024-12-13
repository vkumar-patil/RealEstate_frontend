import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlinePropertySafety } from "react-icons/ai";

function UserNavbar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand-info" href="/">
          <AiOutlinePropertySafety />
          Logo
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">
                <FaLocationDot />
                Explore
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/">
                About Us
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">
                Contact Us
              </a>
            </li>
            <button className="btn btn-primary">
              <FaPhoneAlt />
              Requast Call
            </button>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default UserNavbar;
