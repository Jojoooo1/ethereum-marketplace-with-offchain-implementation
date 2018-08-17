import React from "react";

import NavBar3 from "../partials/NavBar3";
import SellerCard from "../components/SellerCard";

const Sellers = () => {
  return (
    <div>
      <NavBar3 title={"Our shops"} breadcrumbs={["sellers"]} />
      <section className="product-category section">
        <div className="container">
          <div className="row">
            <SellerCard />
            <SellerCard />
            <SellerCard />
            <SellerCard />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sellers;
