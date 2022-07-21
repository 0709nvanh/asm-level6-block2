import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";

const Client = () => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "90px" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Client;
