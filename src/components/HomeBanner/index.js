

import React from "react";

import BackgroundImage1 from "../../assets/images/slider_5.jpg";
import BackgroundImage2 from "../../assets/images/slider_4.jpg";
import BackgroundImage3 from "../../assets/images/slider_6.jpg";
import { Carousel } from "react-bootstrap";

function HomeBanner(props) {
  return (
    <Carousel>
      <Carousel.Item>
        <div
          className="d-block w-100 main_slider"
          style={{
            backgroundImage: `url(${BackgroundImage1})`,
          }}
        >
          <div className="container fill_height">
            <div className="row align-items-center fill_height">
              <div className="col">
                <div className="main_slider_content" data-aos="fade-right">
                  <h6>Winter / Spring Collection 2026</h6>
                  <h1>Evening & Special Occasion Dresses</h1>
                  <div className="red_button shop_now_button">
                    <a href="#">shop now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className="d-block w-100 main_slider"
          style={{
            backgroundImage: `url(${BackgroundImage2})`,
          }}
        >
          <div className="container fill_height">
            <div className="row align-items-center fill_height">
              <div className="col">
                <div className="main_slider_content" data-aos="fade-right">
                  <h6>Winter / Spring Collection 2026</h6>
                  <h1>Timeless Elegance for Your Special Moments</h1>
                  <div className="red_button shop_now_button">
                    <a href="#">shop now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className="d-block w-100 main_slider"
          style={{
            backgroundImage: `url(${BackgroundImage3})`,
          }}
        >
          <div className="container fill_height">
            <div className="row align-items-center fill_height">
              <div className="col">
                <div className="main_slider_content" data-aos="fade-right">
                  <h6>Winter / Spring Collection 2026</h6>
                  <h1>A curated collection of party dresses for unforgettable moments</h1>
                  <div className="red_button shop_now_button">
                    <a href="#">shop now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeBanner;
