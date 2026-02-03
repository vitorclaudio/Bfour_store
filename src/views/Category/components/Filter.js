import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllCategories } from "../../../redux/actions/categoryAction";

class Filter extends Component {
    componentDidMount() {
        if (!this.props.categories || this.props.categories.length === 0) {
            this.props.getAllCategories();
        }
    }

    onCategoryClick = (e, c) => {
        e.preventDefault();

        console.log("clicked category:", c);
        console.log("getProductsByCategory prop:", this.props.getProductsByCategory);

        const value = c.name;
        console.log("filter value:", value);

        if (this.props.getProductsByCategory) {
            this.props.getProductsByCategory(value);
        }
    };


    render() {
        const { categories, loadingCategories } = this.props;

        return (
            <div className="sidebar_section">
                <div className="sidebar_title">
                    <h5>Product Category</h5>
                </div>

                <ul className="sidebar_categories">
                    {loadingCategories && <li>Loading...</li>}

                    <li>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            this.props.getAllProducts && this.props.getAllProducts();
                        }}>
                            All Products
                        </a>
                    </li>

                    {!loadingCategories && (!categories || categories.length === 0) && (
                        <li>No categories found</li>
                    )}

                    {!loadingCategories &&
                        categories &&
                        categories.map((c) => (
                            <li key={c.id}>
                                <a href="#" onClick={(e) => this.onCategoryClick(e, c)}>
                                    {c.name}
                                </a>
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.categoriesData?.categories,
    loadingCategories: state.categoriesData?.loading
});

export default connect(mapStateToProps, {
    getAllCategories
})(Filter);
