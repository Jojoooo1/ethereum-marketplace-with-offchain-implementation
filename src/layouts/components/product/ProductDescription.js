import React from "react";

const ProductDescription = props => {
  const { product } = props;
  return (
    <div className="single-product d-flex flex-column d-flex justify-content-between" style={{ height: "100%" }}>
      <h2>{product.title}</h2>
      <p className="product-price">$ {product.price}</p>

      <p className="product-description">{product.description}</p>

      <div className="product-quantity">
        <form>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label font-weight-bold">Quantity</label>
            <div className="col-sm-10">
              <select className="form-control" id="select-quantity" style={{ width: "100px" }}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div className="product-category">
        <ul className="list-inline d-flex">
          <li className="list-inline-item">
            <span className="font-weight-bold mr-2">Categories:</span>
          </li>
          <li className="list-inline-item">
            <span className="badge badge-secondary mr-2">Lorem</span>
          </li>
          <li className="list-inline-item">
            <span className="badge badge-secondary mr-2">Lorem</span>
          </li>
          <li className="list-inline-item">
            <span className="badge badge-secondary mr-2">Lorem</span>
          </li>
        </ul>
      </div>
      <div>
        <a href="cart.html" className="btn btn-outline-warning mt-5">
          Add To Cart
        </a>
      </div>
    </div>
  );
};

export default ProductDescription;
