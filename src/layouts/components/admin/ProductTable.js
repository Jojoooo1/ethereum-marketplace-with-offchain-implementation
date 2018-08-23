import React from "react";
import store from "../../../store";
const ProductTable = props => {
  const { products } = props;
  const web3 = store.getState().web3;
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">name</th>
          <th scope="col">category</th>
          <th scope="col">quantity</th>
          <th scope="col">price (ETH)</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i}</th>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{web3.web3 ? web3.web3.utils.fromWei(product.price.toString(), "ether") : product.price}</td>
              <td>
                <button className="btn btn-sm btn-danger m-1" onClick={() => handleOnClickRemoveProduct(product.id)}>
                  Remove
                </button>
                <button
                  className="btn btn-sm btn-warning m-1"
                  data-toggle="modal"
                  data-target="#modalUpdateProduct"
                  onClick={e => handleOnClickUpdateProduct(e, product)}
                >
                  update
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
  function handleOnClickRemoveProduct(productId) {
    props.callbackRemoveProduct(productId);
  }
  function handleOnClickUpdateProduct(e, product) {
    props.callbackUpdateProduct(e, product);
  }
};

export default ProductTable;
