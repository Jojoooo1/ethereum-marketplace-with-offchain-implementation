import React from "react";

const ProductTable = props => {
  const { products } = props;
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">name</th>
          <th scope="col">category</th>
          <th scope="col">quantity</th>
          <th scope="col">imageLink</th>
          <th scope="col">descriptionLink</th>
          <th scope="col">price</th>
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
              <td>{product.imageLink}</td>
              <td>{product.descriptionLink}</td>
              <td>{product.price}</td>
              <td>
                <button className="btn btn-sm btn-danger m-1" onClick={() => handleOnClickRemoveProduct(product.id)}>
                  Remove
                </button>
                <button className="btn btn-sm btn-warning m-1" onClick={() => handleOnClickUpdateProduct(product)}>
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
  function handleOnClickUpdateProduct(product) {
    props.callbackUpdateProduct(product);
  }
};

export default ProductTable;
