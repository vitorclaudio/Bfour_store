import React, { Component } from "react";
import SingleProduct from "./SingleProduct";
import Heading from "../Heading";
import PropTypes from "prop-types";

class NewArrivals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products || [],
      productsBAK: props.products || [],
      departments: props.departments || [],
      selectedOption: "All"
    };
  }

  componentDidUpdate(prevProps) {
    // Se os produtos chegaram/atualizaram via props (async), sincroniza com o state
    if (prevProps.products !== this.props.products) {
      const list = this.props.products || [];
      this.setState({
        products: list,
        productsBAK: list
      });
    }
  }

  optionClicked(option) {
    const base = this.state.productsBAK || [];

    if (option === "All") {
      this.setState({ products: base, selectedOption: option });
      return;
    }

    const opt = String(option || "").toLowerCase();

    const filtered = base.filter((item) => {
      const dept = String(item.department || "").toLowerCase();
      const category = String(item.category || "").toLowerCase();
      const categoryName = String(item.categoryName || "").toLowerCase();

      return dept === opt || category === opt || categoryName === opt;
    });

    this.setState({
      products: filtered.length > 0 ? filtered : base,
      selectedOption: option
    });
  }

  render() {
    const { products, selectedOption } = this.state;

    return (
        <div className="new_arrivals" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <Heading title="New Arrivals" data-aos="fade-up" />
            </div>

            <div className="row align-items-center" data-aos="fade-up">
              <div className="col text-center">
                <div className="new_arrivals_sorting">
                  <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
                    <li
                        onClick={() => this.optionClicked("All")}
                        className={`grid_sorting_button button d-flex flex-column justify-content-center align-items-center ${
                            selectedOption === "All" ? "active is-checked" : ""
                        }`}
                    >
                      all
                    </li>

                    <li
                        onClick={() => this.optionClicked("Women")}
                        className={`grid_sorting_button button d-flex flex-column justify-content-center align-items-center ${
                            selectedOption === "Women" ? "active is-checked" : ""
                        }`}
                    >
                      women's
                    </li>

                    <li
                        onClick={() => this.optionClicked("Men")}
                        className={`grid_sorting_button button d-flex flex-column justify-content-center align-items-center ${
                            selectedOption === "Men" ? "active is-checked" : ""
                        }`}
                    >
                      men's
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              {products &&
                  products.slice(0, 8).map((item, index) => (
                      <div
                          className="col-lg-3 col-sm-6"
                          key={index}
                          data-aos="zoom-in"
                      >
                        <SingleProduct
                            productItem={item}
                            addToBag={this.props.addToBag}
                        />
                      </div>
                  ))}
            </div>
          </div>
        </div>
    );
  }
}

NewArrivals.propTypes = {
  addToCart: PropTypes.func
};

export default NewArrivals;
