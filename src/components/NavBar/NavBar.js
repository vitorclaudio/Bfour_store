import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeCartView from "../HomeCartView";
import MobileMenu from "../MobileMenu";
import device from "../../modules/mediaQuery";
import MediaQuery from "react-responsive";
import "../../styles/NavBar.css";
import ContactModal from "../ContactModal";
import SearchModal from "../SearchModal/SearchModal";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      activeclass: false,
      contactModalShow: false,
      searchModalShow: false
    };
  }



  componentDidMount() {
    this.props.getAllCategories && this.props.getAllCategories();

    if (!this.props.cart || Object.keys(this.props.cart).length < 1) {
      this.props.getCartByUserId && this.props.getCartByUserId();
    }
  }


  showHideModal = () => {
    this.setState({ modalShow: !this.state.modalShow });
  };

  handleMenuClicked = () => {
    this.setState({ activeclass: !this.state.activeclass });
  };

  openContactModal = (e) => {
    if (e) e.preventDefault();
    this.setState({ contactModalShow: true });
  };

  closeContactModal = () => {
    this.setState({ contactModalShow: false });
  };

  openSearchModal = (e) => {
    if (e) e.preventDefault();
    this.setState({ searchModalShow: true });
  };

  closeSearchModal = () => {
    this.setState({ searchModalShow: false });
  };

  onSearch = (q) => {
    // opção 1: só fechar modal por enquanto
    // this.closeSearchModal();

    // opção 2 (recomendada): navegar para /search?q=...
    this.closeSearchModal();
    if (this.props.history && this.props.history.push) {
      this.props.history.push(`/search?q=${encodeURIComponent(q)}`);
    } else {
      window.location.href = `/search?q=${encodeURIComponent(q)}`;
    }
  };
  onSelectProduct = (p) => {
    this.closeSearchModal();

    // Pegue o ID correto do seu produto
    const id = p.id || p.productId || p._id || p.ProductID;

    if (id !== undefined && id !== null) {
      window.location.href = `/Bfour_store/single-product/${id}`;
      return;
    }

    // fallback: manda pra search com o nome
    const name = p.productName || p.name || "";
    window.location.href = `/Bfour_store/search?q=${encodeURIComponent(name)}`;
  };



  render() {
    const { departments } = this.props;
    const cart = this.props.cart || {};

    return (
        <div className="main_nav_container">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-right">
                <div className="logo_container">
                  <Link to="" className="topbar-title">
                    BFOUR
                  </Link>
                </div>

                <nav className="navbar">
                  <ul className="navbar_menu">
                    <li>
                      <Link to="/home">home</Link>
                    </li>

                    <li className="dropdown">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        Shop
                        <i className="fa fa-angle-down"></i>
                      </a>

                      <ul className="dropdown-menu">
                        {/* All Products – sempre no topo */}
                        <li>
                          <Link to="/shops">
                            All Products
                          </Link>
                        </li>

                        {this.props.loadingCategories && (
                            <li>
                              <a href="#" onClick={(e) => e.preventDefault()}>
                                Loading...
                              </a>
                            </li>
                        )}

                        {!this.props.loadingCategories &&
                            (this.props.categories || []).map((c) => (
                                <li key={c.id}>
                                  <Link to={`/shops/${encodeURIComponent(c.slug || c.name)}`}>
                                    {c.name}
                                  </Link>
                                </li>
                            ))}
                      </ul>
                    </li>


                    <li>
                      <a href="#" onClick={this.openContactModal}>
                        contact
                      </a>
                    </li>
                  </ul>

                  <ul className="navbar_user">
                    <li>
                      <a href="#" onClick={this.openSearchModal}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fa fa-user" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="checkout">
                      <a href="#" onClick={(e) => {
                        e.preventDefault();
                        this.showHideModal();
                      }}>
                      <i className="fas fa-shopping-bag"></i>
                        {cart.totalQty !== undefined && (
                            <span id="checkout_items" className="checkout_items">
                          {cart.totalQty}
                        </span>
                        )}
                      </a>
                    </li>
                  </ul>

                  <div
                      className="hamburger_container"
                      onClick={() => this.handleMenuClicked()}
                  >
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </div>
                </nav>
              </div>
            </div>
          </div>

          <MediaQuery query={device.max.tabletL}>
            <MobileMenu
                activeClass={this.state.activeclass}
                onClose={() => this.handleMenuClicked()}
            />
          </MediaQuery>

          {this.state.modalShow ? (
              <HomeCartView
                  cart={cart}
                  show={this.state.modalShow}
                  onHide={() => this.showHideModal()}
              />
          ) : null}

          <ContactModal
              show={this.state.contactModalShow}
              onClose={this.closeContactModal}
              email="support@bfour.com"
          />

          <SearchModal
            show={this.state.searchModalShow}
            onClose={this.closeSearchModal}
            products={this.props.products || []}
            onSearch={this.onSearch}
            onSelectProduct={this.onSelectProduct}
        />
        </div>

    );


  }

}


export default NavBar;
