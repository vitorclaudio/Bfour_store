import { connect } from "react-redux";
import NavBar from "./NavBar";

import { getAllCategories } from "../../redux/actions/categoryAction";
import { getDepartments } from "../../redux/actions/DepartmentAction";

/*
  ESCOLHA 1 (mais comum):
  se existir esse arquivo:
  ../../redux/actions/cartAction
*/
import { getCartByUserId } from "../../redux/actions/cartAction";

/*
  ESCOLHA 2 (se no seu projeto estiver diferente):
  comente a linha de cima e descomente esta:
*/
// import { getCartByUserId } from "../../redux/actions/CartAction";

const mapStateToProps = (state) => ({
  // Categorias (dropdown Shop)
  categories: state.categoriesData?.categories || [],
  loadingCategories: state.categoriesData?.loading || false,

  // Departments (se você ainda usa em algum lugar do NavBar)
  departments: state.department?.departments || [],

  // Produtos (SearchModal)
  products: state.product?.products || [],

  // Cart (evita crash no NavBar)
  // alguns projetos guardam como state.cart, outros como state.cart.cart
  cart: state.cart?.cart || state.cart || {}
});

const mapDispatchToProps = (dispatch) => ({
  getAllCategories: () => dispatch(getAllCategories()),
  getDepartments: () => dispatch(getDepartments()),
  getCartByUserId: () => dispatch(getCartByUserId())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
