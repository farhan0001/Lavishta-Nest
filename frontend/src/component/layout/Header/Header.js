import React from 'react';
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/Lavishta.png";
import {MdAccountCircle, MdSearch, MdAddShoppingCart } from "react-icons/md";

const options = {
  burgerColor: "#5a946b",
  burgerColorHover: "#3d705b",
  logo,
  logoWidth: "20vmax",
  navColor1: "#adf0d4",
  logoHoverSize: "10px",
  logoHoverColor: "#6f8281",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "About",
  link4Text: "Contact",
  link1Url: "/home",
  link2Url: "/products",
  link3Url: "/about",
  link4Url: "/contact",
  link1Size: "1.4vmax",
  link1Color: "#2e3628",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  link1ColorHover: "#5e3011",
  link1Margin: "2vmax",
  link2Margin: "2vmax 0 2vmax 2vmax",
  link3Margin: "2vmax 2vmax 2vmax 0",
  link4Margin: "2vmax",
  profileIcon: true,
  searchIcon: true,
  cartIcon: true,
  ProfileIconElement: MdAccountCircle,
  SearchIconElement: MdSearch,
  CartIconElement: MdAddShoppingCart,
  profileIconColor: "#2e3628",
  searchIconColor: "#2e3628",
  cartIconColor: "#2e3628",
  profileIconColorHover: "#5e3011",
  searchIconColorHover: "#5e3011",
  cartIconColorHover: "#5e3011",
  profileIconMargin: "1.3vmax",
  searchIconMargin: "1.3vmax",
  cartIconMargin: "1.3vmax"
}

const Header = () => {
  return (
    <ReactNavbar {...options} />
  )
}

export default Header

