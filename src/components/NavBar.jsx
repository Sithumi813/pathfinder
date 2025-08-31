// src/components/NavBar.jsx
import React from "react";
import Logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from "./NavbarElements";

export default function NavBar() {
  const nav = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      nav("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Nav>
      <NavLink to="/dashboard">
        <img src={Logo} alt="logo" />
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/recommendations">Recommendations</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink as="button" onClick={logout}>
          Logout
        </NavBtnLink>
      </NavBtn>
    </Nav>    
  );
}
