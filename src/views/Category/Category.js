import React, { Component } from "react";
import SingleProduct from "../../components/Products/SingleProduct";
import Auth from "../../modules/Auth";
import LoginRegister from "../../components/LoginRegisterModal";
import Filter from "./components/Filter";
import "../../styles/Category.css";

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            login: true,
            searchText: "",
            sortBy: "default" // "default" | "price" | "name"
        };
        this.addToBag = this.addToBag.bind(this);
    }

    componentDidMount() {
        const category = this.props.match?.params?.category;
        if (category) {
            this.props.getProductsByCategory && this.props.getProductsByCategory(category);
        } else {
            this.props.getAllProducts && this.props.getAllProducts();
        }
    }

    componentDidUpdate(prevProps) {
        const prevCategory = prevProps.match?.params?.category;
        const currentCategory = this.props.match?.params?.category;

        if (prevCategory !== currentCategory) {
            this.setState({ searchText: "" });

            if (currentCategory) {
                this.props.getProductsByCategory && this.props.getProductsByCategory(currentCategory);
            } else {
                this.props.getAllProducts && this.props.getAllProducts();
            }
        }
    }

    showHideModal = () => {
        this.setState({ modalShow: false });
    };

    loginClicked = () => {
        this.setState({ modalShow: true, login: true });
    };

    registerClicked = () => {
        this.setState({ modalShow: true, login: false });
    };

    addToBag(params) {
        if (
            Auth.getUserDetails() !== undefined &&
            Auth.getUserDetails() !== null &&
            Auth.getToken() !== undefined
        ) {
            const cart = this.props.postCart && this.props.postCart(params);
            if (cart && cart.then) cart.then((res) => console.log(res));
        } else {
            this.setState({ modalShow: true });
        }
    }

    handleSearchChange = (e) => {
        this.setState({ searchText: e.target.value });
    };

    setSort = (sortBy) => {
        this.setState({ sortBy });
    };

    // tenta achar um campo de preço nos seus produtos
    getPriceNumber = (p) => {
        const raw =
            p.price ??
            p.unitPrice ??
            p.salePrice ??
            p.value ??
            p.amount ??
            p.VLRUNTBRTVND ??
            p.VLRUNTLIQVND ??
            0;

        // se vier string tipo "R$ 199,90" ou "199.90"
        if (typeof raw === "string") {
            const normalized = raw
                .replace(/\s/g, "")
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(",", ".");
            const n = Number(normalized);
            return Number.isFinite(n) ? n : 0;
        }

        const n = Number(raw);
        return Number.isFinite(n) ? n : 0;
    };

    getNameText = (p) => {
        return String(p.productName || p.name || p.title || "").trim().toLowerCase();
    };

    getFilteredProducts = () => {
        const products = this.props.products || [];
        const q = String(this.state.searchText || "").trim().toLowerCase();
        if (!q) return products;

        return products.filter((p) => {
            const title = String(p.title || "").toLowerCase();
            const name = String(p.productName || p.name || "").toLowerCase();
            const desc = String(p.description || "").toLowerCase();
            return title.includes(q) || name.includes(q) || desc.includes(q);
        });
    };

    getSortedProducts = (list) => {
        const { sortBy } = this.state;
        const arr = [...(list || [])];

        if (sortBy === "price") {
            // menor preço primeiro (se quiser maior->menor, inverte no compare)
            arr.sort((a, b) => this.getPriceNumber(a) - this.getPriceNumber(b));
            return arr;
        }

        if (sortBy === "name") {
            arr.sort((a, b) => this.getNameText(a).localeCompare(this.getNameText(b)));
            return arr;
        }

        // default: mantém ordem original (não faz sort)
        return arr;
    };

    getSortingLabel = () => {
        const { sortBy } = this.state;
        if (sortBy === "price") return "Price";
        if (sortBy === "name") return "Product Name";
        return "Default Sorting";
    };

    render() {
        const filtered = this.getFilteredProducts();
        const productsFiltered = this.getSortedProducts(filtered);

        return (
            <div className="container product_section_container">
                <div className="row">
                    <div className="col product_section clearfix">
                        <div className="breadcrumbs d-flex flex-row align-items-center">
                            <ul>
                                <li>
                                    <a href="/">Home</a>
                                </li>

                                <li className="active">
                                    <a href="#" onClick={(e) => e.preventDefault()}>
                                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                                        {this.props.match?.params?.category || "All Products"}
                                    </a>
                                </li>

                                <li className="active">
                                    <a href="#" onClick={(e) => e.preventDefault()}>
                                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                                        {this.props.location?.pathname?.split("/")[3]}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="main_content">
                            <div className="products_iso">
                                <div className="row">
                                    <div className="col">
                                        <div className="product_sorting_container product_sorting_container_top">
                                            {/* SORTING + SEARCH */}
                                            <div className="category-toolbar">
                                                <ul className="product_sorting category-sorting">
                                                    <li>
                                                        <span className="type_sorting_text">{this.getSortingLabel()}</span>
                                                        <i className="fa fa-angle-down"></i>

                                                        <ul className="sorting_type">
                                                            <li
                                                                className="type_sorting_btn"
                                                                onClick={() => this.setSort("default")}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <span>Default Sorting</span>
                                                            </li>

                                                            <li
                                                                className="type_sorting_btn"
                                                                onClick={() => this.setSort("price")}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <span>Price</span>
                                                            </li>

                                                            <li
                                                                className="type_sorting_btn"
                                                                onClick={() => this.setSort("name")}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <span>Product Name</span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>

                                                <div className="category-search-wrapper">
                                                    <input
                                                        type="text"
                                                        className="category-search-input"
                                                        value={this.state.searchText}
                                                        onChange={this.handleSearchChange}
                                                        placeholder="Search product..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* PRODUCTS */}
                                <div className="row">
                                    {productsFiltered.slice(0, 8).map((item, index) => (
                                        <div className="col-lg-3 col-sm-6" key={index} data-aos="zoom-in">
                                            <SingleProduct productItem={item} addToBag={this.addToBag} />
                                        </div>
                                    ))}
                                </div>

                                <div className="product_sorting_container product_sorting_container_bottom clearfix">
                  <span className="showing_results">
                    Showing 1–{Math.min(8, productsFiltered.length)} of {productsFiltered.length} results
                  </span>

                                    <div className="pages d-flex flex-row align-items-center category-pagination">
                                        <div className="page_current">
                                            <span>1</span>
                                            <ul className="page_selection">
                                                <li>
                                                    <a href="#" onClick={(e) => e.preventDefault()}>
                                                        1
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" onClick={(e) => e.preventDefault()}>
                                                        2
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" onClick={(e) => e.preventDefault()}>
                                                        3
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="page_total">
                                            <span>of</span> 3
                                        </div>

                                        <div className="page_next">
                                            <a href="#" onClick={(e) => e.preventDefault()}>
                                                <i className="fas fa-long-arrow-alt-right" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <LoginRegister
                    show={this.state.modalShow}
                    login={this.state.login}
                    registerClicked={this.registerClicked}
                    loginClicked={this.loginClicked}
                    onHide={this.showHideModal}
                />
            </div>
        );
    }
}

export default Category;
