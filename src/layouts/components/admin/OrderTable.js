import React from "react";
import store from "../../../store";
import axios from "axios";
const END_POINT = "http://localhost:4005/api";
let products = [];

const OrderTable = props => {
  const { orders } = props;
  const web3 = store.getState().web3;

  if (orders.length > 0) {
    orders.map((order, i) => {
      getProductById(order.productId).then(product => {
        products.push(product);
        return;
      });
    });
  }

  function getProductById(id) {
    return axios
      .get(`${END_POINT}/products/${id}`)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  console.log(orders);
  return (
    <table className="table table-hover">
      <thead className="text-center">
        <tr>
          <th scope="col">order n°</th>
          <th scope="col">Product</th>
          <th scope="col">Quantity</th>
          <th scope="col">Status</th>
          <th scope="col">Price (ETH)</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {products.length > 0 &&
          web3.web3 &&
          orders.map((order, i) => {
            console.log(order);
            let priceEther = order.quantity * web3.web3.utils.fromWei(products[i].price.toString(), "ether");
            return (
              <tr key={i}>
                <th scope="row">{order.id}</th>
                <td>{products[i].name}</td>
                <td>{order.quantity}</td>
                <td>{order.status}</td>
                <td>{priceEther}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning m-1"
                    data-toggle="modal"
                    data-target="#modalUpdateProduct"
                    onClick={e => handleOnClickUpdateProduct(e, order)}
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
  function handleOnClickUpdateProduct(e, product) {
    props.callbackUpdateProduct(e, product);
  }
};

export default OrderTable;
