

import React from "react";
import Banner1 from "../../assets/images/banner_4.jpg";
import Banner2 from "../../assets/images/banner_7.jpg";
import Banner3 from "../../assets/images/banner_6.jpg";
import {Link} from "react-router-dom";

function CategoryBanner(props) {
  return (
    <div className="banner">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div
              className="banner_item align-items-center"
              style={{
                backgroundImage: `url(${Banner1})`
              }}
              data-aos="fade-right"
            >
              <div className="banner_category">
                <a href="categories.html">
                  <Link to={`/shops/accessories`}>
                    Acessories
                  </Link></a>

              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="banner_item align-items-center"
              style={{
                backgroundImage: `url(${Banner2})`
              }}
              data-aos="fade-up"
            >
              <div className="banner_category">
                <a href="categories.html">
                  <Link to={`/shops`}>
                    All Products
                  </Link>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="banner_item align-items-center"
              style={{
                backgroundImage: `url(${Banner3})`
              }}
              data-aos="fade-left"
            >
              <div className="banner_category">
                <a href="categories.html">
                  <Link to={`/shops/dresses`}>
                    Dresses
                  </Link>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryBanner;
