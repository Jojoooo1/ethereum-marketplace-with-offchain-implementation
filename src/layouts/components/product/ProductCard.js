import React from "react";
import { Link } from "react-router";
import store from "../../../store";
import Product1 from "../../../img/product-1.jpg";

const ProductCard = props => {
  const { product } = props;
  let web3 = store.getState().web3.web3;
  return (
    <div className="col-md-4">
      <div className="product-item">
        <div className="product-thumb">
          <img className="img-responsive" src={Product1} alt="product-img" />
          <div className="preview-meta">
            <ul>
              <li>
                <Link to={`products/${product.productId}`}>
                  <i className="fa fa-eye" />
                </Link>
              </li>
              <li>
                {/*<a href="" style={{ margin: "2px" }}>*/}
                <a href="#">
                  <i className="fa fa-shopping-cart" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="product-content">
          <h4>
            <a href="product-single.html">{product.name}</a>
          </h4>
          <p className="price">{web3.utils.fromWei(product.price.toString(), "ether")} eth</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// <div className="modal product-modal fade" id="product-modal">
//                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                   <i className="tf-ion-close" />
//                 </button>
//                 <div className="modal-dialog " role="document">
//                   <div className="modal-content">
//                     <div className="modal-body">
//                       <div className="row">
//                         <div className="col-md-8 col-sm-6 col-xs-12">
//                           <div className="modal-image">
//                             <img className="img-responsive" src="images/shop/products/modal-product.jpg" alt="product-img" />
//                           </div>
//                         </div>
//                         <div className="col-md-4 col-sm-6 col-xs-12">
//                           <div className="product-short-details">
//                             <h2 className="product-title">GM Pendant, Basalt Grey</h2>
//                             <p className="product-price">$200</p>
//                             <p className="product-short-description">
//                               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem iusto nihil cum. Illo laborum numquam rem aut officia dicta cumque.
//                             </p>
//                             <a href="cart.html" className="btn btn-main">
//                               Add To Cart
//                             </a>
//                             <a href="product-single.html" className="btn btn-transparent">
//                               View Product Details
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
