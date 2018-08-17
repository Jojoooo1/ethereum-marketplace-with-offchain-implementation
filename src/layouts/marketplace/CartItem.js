import React from "react";
import Empty from "../../img/empty.svg";

const CartItem = props => {
  // const { product } = props;
  return (
    <tr className="">
      <td className="">
        <div className="product-info">
          <img height="100" src={ Empty } alt="" />
          <a href="">Sunglass</a>
        </div>
      </td>
      <td className="">$200.00</td>
      <td className="">
        <a className="product-remove" href="">
          Remove
        </a>
      </td>
    </tr>
  );
};

export default CartItem;
