import React from 'react';
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/Lavishta.png";
import {MdAccountCircle, MdSearch, MdAddShoppingCart } from "react-icons/md";

const options = {
  burgerColor: "#a6a446",
  burgerColorHover: "#e6e367",
  logo,
  logoWidth: "18vmax",
  navColor1: "#2a5663",
  logoHoverSize: "10px",
  logoHoverColor: "#688eab",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "About",
  link4Text: "Contact",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/about",
  link4Url: "/contact",
  link1Size: "1.4vmax",
  link1Color: "#ffffff",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  link1ColorHover: "#77acbd",
  link1Margin: "2vmax",
  link2Margin: "2vmax 0 2vmax 2vmax",
  link3Margin: "2vmax 2vmax 2vmax 0",
  link4Margin: "2vmax",
  profileIcon: true,
  searchIcon: true,
  cartIcon: true,
  profileIconUrl: "/login",
  ProfileIconElement: MdAccountCircle,
  SearchIconElement: MdSearch,
  CartIconElement: MdAddShoppingCart,
  profileIconColor: "#ffffff",
  searchIconColor: "#ffffff",
  cartIconColor: "#ffffff",
  profileIconColorHover: "#77acbd",
  searchIconColorHover: "#77acbd",
  cartIconColorHover: "#77acbd",
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

