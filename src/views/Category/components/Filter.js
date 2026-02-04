import React, {Component} from "react";
import {connect} from "react-redux";
import {getAllCategories} from "../../../redux/actions/categoryAction";

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedCategoryId: null};
    }

    componentDidMount() {
        if (!this.props.categories || this.props.categories.length === 0) {
            this.props.getAllCategories();
        }
    }

    onAllClick = (e) => {
        e.preventDefault();
        this.setState({selectedCategoryId: null});
        this.props.getAllProducts && this.props.getAllProducts();
    };
    onCategoryClick = (e, c) => {
        e.preventDefault();
        this.setState({selectedCategoryId: c.id});
        const value = c.slug || c.name;
        this.props.getProductsByCategory && this.props.getProductsByCategory(value);
    };

    render() {
        const {categories, loadingCategories} = this.props;
        const {selectedCategoryId} = this.state;
        return (<div className="sidebar_section">
            <div className="sidebar_title"><h5>Product Category</h5></div>
            <ul className="sidebar_categories">
                <li className={!selectedCategoryId ? "active" : ""}><a href="#" onClick={this.onAllClick}
                                                                       style={{cursor: "pointer"}}> {!selectedCategoryId && (
                    <span> <i className="fa fa-angle-double-right"></i> </span>)} All Products </a></li>
                {loadingCategories && <li>Loading...</li>} {!loadingCategories && categories && categories.map((c) => {
                const isActive = selectedCategoryId === c.id;
                return (<li key={c.id} className={isActive ? "active" : ""}><a href="#"
                                                                               onClick={(e) => this.onCategoryClick(e, c)}
                                                                               style={{cursor: "pointer"}}> {isActive && (
                    <span> <i className="fa fa-angle-double-right"></i> </span>)} {c.name} </a></li>);
            })} </ul>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    categories: state.categoriesData?.categories,
    loadingCategories: state.categoriesData?.loading
});
export default connect(mapStateToProps, {getAllCategories})(Filter);