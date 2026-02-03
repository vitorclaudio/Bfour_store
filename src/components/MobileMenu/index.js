import React, { Component } from "react";
import PropTypes from "prop-types";
import ContactModal from "../ContactModal";

class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactModalShow: false
    };
  }

  openContactModal = (e) => {
    if (e) e.preventDefault();
    this.setState({ contactModalShow: true });
  };

  closeContactModal = () => {
    this.setState({ contactModalShow: false });
  };

  render() {
    return (
        <>
          <div
              className={
                this.props.activeClass ? "hamburger_menu active" : "hamburger_menu"
              }
          >
            <div className="hamburger_close" onClick={this.props.onClose}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </div>

            <div className="hamburger_menu_content text-right">
              <ul className="menu_top_nav">
                <li className="menu_item has-children">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    English
                    <i className="fa fa-angle-down"></i>
                  </a>
                  <ul className="menu_selection">
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        Portuguese
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="menu_item has-children">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    My Account
                    <i className="fa fa-angle-down"></i>
                  </a>
                  <ul className="menu_selection">
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fa fa-sign-in" aria-hidden="true"></i>Sign In
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fa fa-user-plus" aria-hidden="true"></i>
                        Register
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="menu_item">
                  <a href="#" onClick={(e) => e.preventDefault()}>home</a>
                </li>
                <li className="menu_item">
                  <a href="#" onClick={(e) => e.preventDefault()}>shop</a>
                </li>
                <li className="menu_item">
                  <a href="#" onClick={(e) => e.preventDefault()}>promotion</a>
                </li>
                <li className="menu_item">
                  <a href="#" onClick={(e) => e.preventDefault()}>pages</a>
                </li>
                <li className="menu_item">
                  <a href="#" onClick={(e) => e.preventDefault()}>blog</a>
                </li>

                <li className="menu_item">
                  <a href="#" onClick={this.openContactModal}>contact</a>
                </li>
              </ul>
            </div>
          </div>

          <ContactModal
              show={this.state.contactModalShow}
              onClose={this.closeContactModal}
              email="support@bfour.com"
          />
        </>
    );
  }
}

MobileMenu.propTypes = {
  activeClass: PropTypes.bool,
  onClose: PropTypes.func,
};

export default MobileMenu;
