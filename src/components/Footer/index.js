
import React from "react";

function Footer(props) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center">
              <ul className="footer_nav">
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">FAQs</a>
                </li>
                <li>
                  <a href="contact.html">Contact us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="footer_social d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
              <ul>
                {/*  <li>
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                  <li>
                  <a href="#">
                    <i className="fab fa-twitter"></i>{" "}
                  </a>
                </li> */}
                <li>
                  <a
                      href="https://www.instagram.com/ateliebfour/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Ateliê Bfour"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>


                {/*  <li>
                  <a href="#">
                    <i className="fab fa-pinterest-p"></i>{" "}
                  </a>
                </li>*/}
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="footer_nav_container">
              <div className="cr">
              ©2026 All Rights Reserverd.{" "}
                <i className="fa fa-heart-o" aria-hidden="true"></i> by{" "}
                <a href="" target="_blank">
                  BFour
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
