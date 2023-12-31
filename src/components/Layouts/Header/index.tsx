import React from "react";
import { Link } from "react-router-dom";
import BharatPayImageHeader from "./BharatPayImageHeader";

const Header = () => {
  const showBBPS = localStorage.getItem("showBBPS") === "true";
  return (
    <>
      <header id="header">
        <div className="container">
          <div className="header-row">
            <div className="header-column justify-content-start">
              <div className="logo me-2 me-lg-3">
                {" "}
                <Link to="/" className="d-flex" title="Pinki Tours & Travels">
                  <img
                    src="assets/images/pinki-logo.jpg"
                    alt="Pinki Tours & Travels"
                    style={{ width: "15%" }}
                  />
                </Link>{" "}
              </div>
            </div>
            <div className="header-column justify-content-end">
              <nav className="primary-menu navbar navbar-expand-lg">
                <div id="header-nav" className="collapse navbar-collapse">
                  <ul className="navbar-nav">
                    <li>
                      <a className="dropdown-item" href="/">
                        Home
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
              {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#header-nav">
                            <span></span> <span></span> <span></span> </button>
                        <div className="vr mx-2 h-25 my-auto"></div>
                        <nav className="login-signup navbar navbar-expand">
                            <ul className="navbar-nav">
                                <li className="profile"><a className="pe-0" data-bs-toggle="modal" data-bs-target="#login-modal" href="#"
                                    title="Login / Sign up"><span className="d-none d-sm-inline-block">Login / Sign up</span> <span
                                        className="user-icon ms-sm-2"><i className="fas fa-user"></i></span></a></li>
                            </ul>
                        </nav> */}
            </div>
          </div>
        </div>
      </header>
      {!showBBPS && (
        <div className="container">
          <BharatPayImageHeader
            imageUrl="assets/images/bharat-pay/logo.png"
            altText="Header Image"
          />
          {/* Other content */}
        </div>
      )}
    </>
  );
};
export default Header;
