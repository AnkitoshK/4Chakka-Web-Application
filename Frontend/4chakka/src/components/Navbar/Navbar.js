import React from 'react';
import { FaTruckFront } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <>
      <header className="navbar">
        <div className="navbar-left">
          <div className="logo">
            <span className="logo-left">4</span>
            <FaTruckFront />
            <span className="logo-right">Chakka</span>
          </div>
          <div className="contact-info">
            <IoCall />
            <span className="lc"><a href="tel:+916265607500">+91 6265607500</a></span>
          </div>
          <Menu>
            <MenuButton className="menu-button">
              ☰
            </MenuButton>
            <MenuList className="menu-list">
              <MenuItem>
                <Link to="/">Home Page</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/services">Services</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/about-us">About Us</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/contactUs">Contact Us</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/feedback">Feedback</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/admin">Admin</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="marquee-container">
          <div className="marquee">
            Welcome to the Era of Transportation. The Synonym for Transportation is "4Chakka".
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
