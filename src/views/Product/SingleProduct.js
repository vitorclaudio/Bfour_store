

import React, { Component } from "react";
import LoginRegister from "../../components/LoginRegisterModal";
import Auth from "../../modules/Auth";

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      size: "",
      pic: "",
      selectedSize: "",
      id: "",
      quantity: 1,
      modalShow: false,
      login: true,
    };
  }
  componentDidMount() {
    this.props.getProduct(this.props.location.pathname.split("/").slice(-1)[0]);
    this.props.getVariantsByProductId(
      this.props.location.pathname.split("/").slice(-1)[0]
    );
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

  handleThumbnailClick = (item) => {
    const nextStockQty = Number(item.stockQty ?? 0);

    this.setState((prev) => ({
      color: item.color,
      size: item.size,
      pic: item.imagePath,
      shippingPrice: item.shippingPrice,
      stockQty: item.stockQty,
      inStock: item.inStock,
      selectedSize: "",
      id: item._id,
      cartItem: null,
      quantity: nextStockQty <= 0 ? 1 : Math.min(prev.quantity, nextStockQty),
    }));
  };


  getCurrentStockQty = () => {
    return Number(this.state.stockQty ?? this.props.product?.stockQty ?? 0);
  };

  onAddClicked = () => {
    const stockQty = this.getCurrentStockQty();

    // Sem estoque: não faz nada
    if (stockQty <= 0) return;

    // Já está no máximo: não deixa aumentar
    if (this.state.quantity >= stockQty) return;

    const nextQty = this.state.quantity + 1;

    this.setState({ quantity: nextQty });

    this.props.postCart(
        this.state.id || this.props.location.pathname.split("/").slice(-1)[0],
        true,
        false
    );
  };

  onRemoveClicked = () => {
    // se já está em 1, não faz nada
    if (this.state.quantity <= 1) return;

    this.props.postCart(
        this.state.id || this.props.location.pathname.split("/").slice(-1)[0],
        false,
        true
    );

    this.setState({ quantity: this.state.quantity - 1 });
  };


  addToBag = () => {
    const stockQty = this.getCurrentStockQty();
    if (stockQty <= 0) return;
    if (this.state.quantity > stockQty) return;
    if (
      Auth.getUserDetails() !== undefined &&
      Auth.getUserDetails() !== null &&
      Auth.getToken() !== undefined
    ) {
      this.props
        .postCart(
          this.state.id || this.props.location.pathname.split("/").slice(-1)[0]
        )
        .then((res) => {
          console.log(res);
        });
    } else {
      this.setState({ modalShow: true });
    }
  };

  productInCart = () => {
    let available = false;
    // let items = this.props.cart.items;
    // if (items !== undefined && items !== null) {
    //   let itemCheck = Object.keys(items).map(
    //     id => items[id].item.title === this.props.product.title
    //   );

    //   if (itemCheck !== undefined && itemCheck !== null) {
    //     this.setState({ cartItem: itemCheck });
    //     available = true;
    //   } else {
    //     available = false;
    //   }
    // }

    return available;
  };


  render() {
    const currentStockQty = Number(this.state.stockQty ?? this.props.product?.stockQty ?? 0);
    const isOutOfStock = currentStockQty <= 0;
    const isMaxQty = !isOutOfStock && this.state.quantity >= currentStockQty;    function formatSize(size) {
      if (!size) return "";

      const s = String(size).trim().toUpperCase();

      const map = {
        XS: "Extra Small (XS)",
        S: "Small (S)",
        M: "Medium (M)",
        L: "Large (L)",
        XL: "Extra Large (XL)",
        XXL: "2X Large (XXL)",
        XXXL: "3X Large (XXXL)",
        ONE: "One Size",
        OS: "One Size",
        "ONE SIZE": "One Size",
      };

      return map[s] || `${size} (${s})`;
    }


    return (
      <div className="container single_product_container">
        {this.props.product && (
          <div>
            <div className="row">
              <div className="col">
                <div className="breadcrumbs d-flex flex-row align-items-center">
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                        {this.props.product.department}
                      </a>
                    </li>
                    <li className="active">
                      <a href={`/shops/${this.props.product.category}`}>
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                        {this.props.product.category}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-7">
                <div className="single_product_pics">
                  <div className="row">
                    <div className="col-lg-3 thumbnails_col order-lg-1 order-2">
                      <div className="single_product_thumbnails">
                        <ul>
                          {this.props.variants &&
                            this.props.variants
                              .slice(0, 4)
                              .map((item, index) => (
                                <li
                                  key={index}
                                  onClick={() =>
                                    this.handleThumbnailClick(item)
                                  }
                                >
                                  <img
                                    src={item.imagePath}
                                    alt=""
                                    className="img-fluid"
                                  />
                                </li>
                              ))}
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-9 image_col order-lg-2 order-1">
                      <div className="single_product_image">
                        <div
                          className="single_product_image_background"
                          style={{
                            backgroundImage: `url(${
                              this.state.pic || this.props.product.imagePath
                            })`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="product_details">
                  <div className="product_details_title">
                    <h2>{this.props.product.title}</h2>
                    <p>{this.props.product.description}</p>
                    <p>Color: {this.state.color || this.props.product.color}</p>
                    <p>Size: {formatSize(this.state.size || this.props.product.size)}</p>

                  </div>
                  <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
                    <span>
                      <i className="fas fa-truck"></i>
                    </span>
                    <span>
  $ {(
                        this.state.shippingPrice ?? this.props.product.shippingPrice ?? 0
                    ).toFixed(2)}
</span>
                  </div>
                  <div
                      className={
                        this.props.product.compareAtPrice != null
                            ? "original_price"
                            : "original_price no_compare"
                      }
                  >
                    {this.props.product.compareAtPrice != null && (
                        <>₹ {Number(this.props.product.compareAtPrice).toFixed(2)}</>
                    )}
                  </div>


                  <div className="product_price">
                    ₹ {this.props.product.price}
                  </div>
                  {/*        <ul className="star_rating">
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o" aria-hidden="true"></i>
                    </li>

                  </ul>
                <div className="product_color">
                    <span>Select Color:</span>
                    <ul>
                      <li style={{ background: "#e54e5d" }}></li>
                      <li style={{ background: "#252525" }}></li>
                      <li style={{ background: "#60b3f3" }}></li>
                    </ul>
                  </div> */}
                  <div className="quantity_available d-flex align-items-center justify-content-center">
                    <p className="mb-0">
                      Products available: {this.state.quantity}
                    </p>
                  </div>

                  <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                    <span>Quantity:</span>

                    <div className="quantity_selector">
                      <span
                          className={
                            this.state.quantity > 1 ? "minus" : "minus disabled"
                          }
                          onClick={() => this.onRemoveClicked()}
                      >
                        <i className="fa fa-minus" aria-hidden="true"></i>
                      </span>
                      <span id="quantity_value">{this.state.quantity}</span>
                      <span
                          className={isMaxQty ? "plus disabled" : "plus"}
                          onClick={() => {
                            if (!isMaxQty) this.onAddClicked();
                          }
                          }
                      >
  <i className="fa fa-plus" aria-hidden="true"></i>
</span>

                    </div>


                    <div
                        className={`red_button product-add_to_cart_button ${isOutOfStock ? "tt-disabled" : ""}`}
                        onClick={(e) => {
                          if (isOutOfStock) {
                            e.preventDefault();
                            return;
                          }
                          this.addToBag();
                        }}
                    >
                      <a
                          href="#"
                          onClick={(e) => {
                            if (isOutOfStock) e.preventDefault();
                          }}
                      >
                        {isOutOfStock ? "Unavailable" : "add to cart"}
                      </a>
                    </div>


                    {/* <div className="red_cart_button product_add_to_cart_icon">
                      <a href="#">
                        <i className="fas fa-cart-arrow-down"></i>
                      </a>
                    </div> */}

                    <div className="product_favorite d-flex flex-column align-items-center justify-content-center">
                      <i className="far fa-heart"></i>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        <LoginRegister
            show={this.state.modalShow}
            login={this.state.login}
            registerClicked={() => this.registerClicked()}
            loginClicked={() => this.loginClicked()}
            onHide={() => this.showHideModal()}
        />
      </div>
    );
  }
}

export default SingleProduct;
