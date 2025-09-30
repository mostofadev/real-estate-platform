import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Menu />
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
