
import React from "react";

function Benefit(params) {
  return (
    <div className="benefit" data-aos="fade-up">
      <div className="container">
        <div className="row benefit_row">
          <div className="col-lg-3 benefit_col">
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <i className="fa fa-truck" aria-hidden="true"></i>
              </div>
              <div className="benefit_content">
                <h6>Nationwide Delivery</h6>
                <p>We ship to all states across the United States with reliable carriers</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 benefit_col">
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <i className="far fa-money-bill-alt"></i>
              </div>
              <div className="benefit_content">
                <h6>Customer Support</h6>
                <p>Our team is ready to assist you with sizing, orders, and questions</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 benefit_col">
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <i className="fa fa-undo" aria-hidden="true"></i>
              </div>
              <div className="benefit_content">
                <h6>Carefully Selected Designs</h6>
                <p>Each dress is chosen for its quality, fit, and elegance</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 benefit_col">
            <div className="benefit_item d-flex flex-row align-items-center">
              <div className="benefit_icon">
                <i className="far fa-clock"></i>
              </div>
              <div className="benefit_content">
                <h6>Always Open Online</h6>
                <p>Shop anytime, anywhere — our store is open 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefit;
