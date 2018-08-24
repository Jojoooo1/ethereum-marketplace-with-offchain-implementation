import React from "react";

import ProductDescription from "./ProductDescription";

const BuyProductModal = props => {
  let { product } = props;
  return (
    <div className="modal fade" id="modalBuyProduct" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-bold" id="modalLabel">
              Buy Product
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{product.id && <ProductDescription product={product} />}</div>
        </div>
      </div>
    </div>
  );
};

export default BuyProductModal;
