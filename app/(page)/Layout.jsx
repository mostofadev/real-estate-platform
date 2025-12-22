import React from "react";
import Menu from "../components/layout/Menu";
import Footer from "../components/layout/Footer";


function Layout({ children }) {
  return (
    <>
      {/* <Menu /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
